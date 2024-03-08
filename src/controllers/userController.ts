import User from '../models/user.model';
import { Request, Response } from 'express';
import { validateUser } from '../utils/validationUtils';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import logger from '../utils/logger';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'buyer',
    });

    await newUser.save();
    res.status(201).json({ username, email, role: newUser.role });
  } catch (error) {
    logger.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid email or password');
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    logger.error('Error logging in user:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    throw createHttpError(403, 'User not authenticated');
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    res.json({ id: user._id, username: user.username, email: user.email });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Error fetching user profile:', message);
    res.status(500).send('Internal Server Error');
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    throw createHttpError(403, 'User not authenticated');
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;

    const updatedUser = await user.save();
    res.json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Error updating user profile:', message);
    res.status(500).send('Internal Server Error');
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).send('Unauthorized');
  }

  const userId = req.params.id;

  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    await User.findByIdAndDelete(userId);
    res.send('User deleted');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error deleting user ID ${userId}:`, message);
    res.status(500).send('Internal Server Error');
  }
};
