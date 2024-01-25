import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const POST = async (req: Request) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Missing Clerk webhook secret");
    }

    //Headers
    const headersPayload = headers();
    const svixId = headersPayload.get("svix-id");
    const svixTimestamp = headersPayload.get("svix-timestamp");
    const svixSignature = headersPayload.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
        throw new Response("Missing svix headers", { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const webhook = new Webhook(WEBHOOK_SECRET);
    let event: WebhookEvent;

    try {
        event = webhook.verify(body, {
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature,
        }) as WebhookEvent;
    } catch (error) {
        throw new Response("Invalid webhook signature", { status: 400 });
    }

    const { id } = event.data;
    const eventType = event.type;

    if (eventType === "user.created") {
        const email = payload.data.email_addresses.find(
            (email: {id: string}) => email.id === payload.data.primary_email_address_id
        ).email_address;
        console.log(email);

        await db.user.create({
            data: {
                name: payload.data.username,
                email: email,
                imageUrl: payload.data.profile_image_url,
                externalUserId: payload.data.id,
            },
        });
    }

    if (eventType === "user.updated") {
        const email = payload.data.email_addresses.find(
            (email: {id: string}) => email.id === payload.data.primary_email_address_id
        ).email_address;
        console.log(email);

        await db.user.update({
            where: {
                externalUserId: payload.data.id,
            },
            data: {
                name: payload.data.username,
                email: email,
                imageUrl: payload.data.profile_image_url,
            },
        });
    }

    if (eventType === "user.deleted") {
        await db.user.delete({
            where: {
                externalUserId: payload.data.id,
            },
        });
    }

    return new Response("", { status: 200 });
};
