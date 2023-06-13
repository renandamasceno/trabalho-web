import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

// Create a Prisma Client instance
const prisma = new PrismaClient();

export class UserController {
  // Create a new user
  static async create(req: Request, res: Response) {
    // Get parameters from request body
    const { name, profile_url, email, password } = req.body;

    // Check if all parameters were informed
    if (!name || !profile_url || !email || !password) {
      return res.status(400).json({
        message:
          'Missing parameters: name, profile_url, email and password are required',
      });
    }

    // Create a new user
    const createdUser = await prisma.user.create({
      data: {
        name,
        profile_url,
        email,
        password,
      },
    });

    return res.status(201).json(createdUser);
  }

  // Authenticate a user
  static async authenticate(req: Request, res: Response) {
    // Get parameters from request body
    const { email, password } = req.body;

    // Check if all parameters were informed
    if (!email || !password) {
      return res.status(400).json({
        message: 'Missing parameters: email and password are required',
      });
    }

    // Find the user on database
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Check if user was found
    if (!foundUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // Check if password is correct
    if (foundUser.password !== password) {
      return res.status(401).json({
        message: 'Incorrect email or password',
      });
    }

    return res.status(200).json(foundUser);
  }
}
