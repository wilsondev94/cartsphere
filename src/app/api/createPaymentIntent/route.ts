import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;

    return acc + itemTotal;
  }, 0);

  // // for stripe not to reject payment
  // if (totalPrice < 50) {
  //   return 50;
  // }

  return totalPrice;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;

  const total = calculateOrderAmount(items) * 100;

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    const currentIntent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: total,
        }
      );

      // Update order
      const [existingOrder, updateOrder] = await Promise.all([
        prisma.order.findFirst({
          where: {
            paymentIntentId: payment_intent_id,
          },
        }),

        prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);

      if (!existingOrder) {
        return NextResponse.error();
      }

      return NextResponse.json({
        paymentIntent: updatedIntent,
      });
    }
  } else {
    // Create the intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    //  Create the order
    orderData.paymentIntentId = paymentIntent.id;

    await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json({
      paymentIntent,
    });
  }

  return NextResponse.error();
}
