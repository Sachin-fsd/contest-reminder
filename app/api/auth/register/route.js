import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";
import { sanitizeString, validateEmail } from "@/utils/auth";

export async function POST(req) {
    try {
        const body = await req.json();
        const name = sanitizeString(body.name);
        const email = sanitizeString(body.email).toLowerCase();
        const password = String(body.password || "");

        if (!name || !validateEmail(email) || password.length < 8) {
            return NextResponse.json(
                { message: "Invalid name, email, or password" },
                { status: 400 },
            );
        }

        await connectDB();

        if (await User.exists({ email })) {
            return NextResponse.json(
                { message: "Email already registered" },
                { status: 409 },
            );
        }

        const user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 12),
        });

        const res = NextResponse.json({ success: true });
        res.cookies.set(
            "token",
            signToken({
                id: user._id.toString(),
                email: user.email,
                name: user.name,
            }),
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            },
        );

        return res;
    } catch {
        return NextResponse.json(
            { message: "Registration failed" },
            { status: 500 },
        );
    }
}
