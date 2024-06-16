import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import stripe from "stripe";
import { prisma } from "@/app/prisma/prisma.config";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;

    if (event.type === "checkout.session.completed") {
      if (!userId || !courseId) {
        return new NextResponse(`Webhook error : Missing metadata`, {
          status: 400,
        });
      }
    }

    await prisma.purchase.create({
      data: {
        courseId: courseId as string,
        userId: userId as string,
      },
    });

    return new NextResponse(null, { status: 200 });
  } catch (err: any) {
    return new NextResponse(`Webhook error: ${err?.message}`, { status: 400 });
  }
}
