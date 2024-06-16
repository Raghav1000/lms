import { prisma } from "@/app/prisma/prisma.config";
import { stripe } from "@/app/utils/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: params?.courseId,
        isPublished: true,
      },
    });

    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: "user_2h0u4EfLPKGf3ybrZTmATtxEGZr",
          courseId: params?.courseId,
        },
      },
    });

    if (purchase) {
      throw new Error("Already purchased");
    }

    const line_items: any[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course?.title,
            description: course?.description,
          },
          unit_amount: Math.round(course?.price! * 100),
        },
      },
    ];

    let stripeCustomer = await prisma.stripeCustomer.findFirst({
      where: {
        userId: "user_2h0u4EfLPKGf3ybrZTmATtxEGZr",
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: "201601214@daiict.ac.in",
      });

      stripeCustomer = await prisma.stripeCustomer.create({
        data: {
          userId: "user_2h0u4EfLPKGf3ybrZTmATtxEGZr",
          stripeCustomerId: customer?.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer?.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course?.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course?.id}?cancelled=1`,
      metadata: {
        courseId: course?.id ?? "",
        userId: "user_2h0u4EfLPKGf3ybrZTmATtxEGZr",
      },
    });

    return NextResponse.json({ url: session?.url });
  } catch (error) {
    console.log("CHAPTERS", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
