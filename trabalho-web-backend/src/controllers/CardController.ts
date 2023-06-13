import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

// Create a Prisma Client instance
const prisma = new PrismaClient();

export class CardControler {
  // Get all cards from a user
  static async index(req: Request, res: Response) {
    // Get user_id from request params
    const { user_id } = req.params;

    // Check if user exists
    const foundUser = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get all cards from a user
    const cards = await prisma.card.findMany({
      where: {
        user_id,
      },
    });

    return res.status(200).json(cards);
  }

  // Create a new card
  static async create(req: Request, res: Response) {
    // Get user_id from request params
    const { user_id } = req.params;

    // Check if user exists
    const foundUser = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get card data from request body
    const { number, card_verification_value, cardholder_name, valid_thru } =
      req.body;

    // Check if card data was provided
    if (
      !number ||
      !card_verification_value ||
      !cardholder_name ||
      !valid_thru
    ) {
      return res.status(400).json({
        error:
          'Missing card data: number, card_verification_value, cardholder_name and valid_thru are required',
      });
    }

    // Check if card already exists
    const foundCard = await prisma.card.findFirst({
      where: {
        number,
      },
    });

    if (foundCard) {
      return res.status(409).json({ error: 'Card already exists' });
    }

    // Create a new card
    const createdCard = await prisma.card.create({
      data: {
        number,
        card_verification_value,
        cardholder_name,
        valid_thru,
        user_id,
      },
    });

    return res.status(201).json(createdCard);
  }

  // Delete a card
  static async destroy(req: Request, res: Response) {
    // Get user_id and id from request params
    const { user_id, id } = req.params;

    // Check if user exists
    const foundUser = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if card exists
    const foundCard = await prisma.card.findUnique({
      where: {
        id,
      },
    });

    if (!foundCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Delete card
    await prisma.card.delete({
      where: {
        id,
      },
    });

    return res.status(204).send();
  }
}
