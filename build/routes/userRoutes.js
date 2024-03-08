"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authenticateToken_1 = require("../middleware/authenticateToken");
const userRouter = express_1.default.Router();
userRouter.post('/register', userController_1.registerUser);
userRouter.post('/login', userController_1.loginUser);
userRouter.get('/profile', (0, authenticateToken_1.authenticateToken)(), userController_1.getUserProfile);
userRouter.put('/profile', (0, authenticateToken_1.authenticateToken)(), userController_1.updateUserProfile);
userRouter.delete('/:id', (0, authenticateToken_1.authenticateToken)(), userController_1.deleteUser);
exports.default = userRouter;
