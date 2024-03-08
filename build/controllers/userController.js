"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserProfile = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const validationUtils_1 = require("../utils/validationUtils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const logger_1 = __importDefault(require("../utils/logger"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, validationUtils_1.validateUser)(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const { username, email, password, role } = req.body;
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already in use');
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new user_model_1.default({
            username,
            email,
            password: hashedPassword,
            role: role || 'buyer',
        });
        yield newUser.save();
        res.status(201).json({ username, email, role: newUser.role });
    }
    catch (error) {
        logger_1.default.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            return res.status(401).send('Invalid email or password');
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        logger_1.default.error('Error logging in user:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.loginUser = loginUser;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw (0, http_errors_1.default)(403, 'User not authenticated');
    }
    try {
        const user = yield user_model_1.default.findById(req.user._id);
        if (!user) {
            throw (0, http_errors_1.default)(404, 'User not found');
        }
        res.json({ id: user._id, username: user.username, email: user.email });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger_1.default.error('Error fetching user profile:', message);
        res.status(500).send('Internal Server Error');
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw (0, http_errors_1.default)(403, 'User not authenticated');
    }
    try {
        const user = yield user_model_1.default.findById(req.user._id);
        if (!user) {
            throw (0, http_errors_1.default)(404, 'User not found');
        }
        if (req.body.username)
            user.username = req.body.username;
        if (req.body.email)
            user.email = req.body.email;
        const updatedUser = yield user.save();
        res.json({
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger_1.default.error('Error updating user profile:', message);
        res.status(500).send('Internal Server Error');
    }
});
exports.updateUserProfile = updateUserProfile;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Unauthorized');
    }
    const userId = req.params.id;
    try {
        const userId = req.params.id;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        yield user_model_1.default.findByIdAndDelete(userId);
        res.send('User deleted');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger_1.default.error(`Error deleting user ID ${userId}:`, message);
        res.status(500).send('Internal Server Error');
    }
});
exports.deleteUser = deleteUser;
