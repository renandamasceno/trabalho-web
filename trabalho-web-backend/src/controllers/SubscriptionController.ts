import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SubscriptionController {
  static async subscribe(req: Request, res: Response) {
    const { user_id, service_id } = req.params;

    const foundUser = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!foundUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const foundService = await prisma.service.findUnique({
      where: {
        id: service_id,
      },
    });

    if (!foundService) {
      return res.status(404).json({ message: "Service not found" });
    }

    const createdSubscription = await prisma.subscription.create({
      data: {
        user_id,
        service_id,
        active: true,
      },
    });

    return res.status(201).json(createdSubscription);
  }

  static async getDashboardInformation(req: Request, res: Response) {
    const { user_id } = req.params;

    const foundUser = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userSubscriptions = await prisma.subscription.findMany({
      where: {
        user_id,
      },

      include: {
        service: true,
      },
    });

    const activeSubscriptions = userSubscriptions.filter(
      ({ active }) => active
    );

    let highestSubscriptionPrice = null;
    let lowestSubscriptionPrice = null;
    for (const activeSubscription of activeSubscriptions) {
      const activeSubscriptionPrice = activeSubscription.service.price;
      if (!highestSubscriptionPrice) {
        highestSubscriptionPrice = activeSubscriptionPrice;
      }
      if (!lowestSubscriptionPrice) {
        lowestSubscriptionPrice = activeSubscriptionPrice;
      }

      highestSubscriptionPrice =
        activeSubscriptionPrice > highestSubscriptionPrice
          ? activeSubscriptionPrice
          : highestSubscriptionPrice;

      lowestSubscriptionPrice =
        activeSubscriptionPrice < lowestSubscriptionPrice
          ? activeSubscriptionPrice
          : lowestSubscriptionPrice;
    }

    return res.status(200).json({
      totalActiveSubscriptions: activeSubscriptions.length,
      highestSubscriptionPrice,
      lowestSubscriptionPrice,
    });
  }
}
