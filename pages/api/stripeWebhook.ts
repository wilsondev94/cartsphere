import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";

import prisma from "@/lib/prismaDb";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buff = await buffer(req);

  const sig = req.headers["stripe-signature"];

  if (!sig) return res.status(400).send("Missing the stripe signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buff,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send(`Webhook error  ${err}`);
  }

  // Handle the event
  switch (event.type) {
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge;

      if (charge.payment_intent && typeof charge.payment_intent === "string") {
        await prisma.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: { status: "complete", address: charge.shipping?.address },
        });
      } else {
        console.log("DATABASE NOT UPDATED::::");
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}
