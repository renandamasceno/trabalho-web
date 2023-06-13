import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

// Create a Prisma Client instance
const prisma = new PrismaClient();

export class ServiceController {
  // List all services
  static async index(req: Request, res: Response) {
    // Get services from database
    const services = await prisma.service.findMany();

    return res.status(200).json(services);
  }
}
