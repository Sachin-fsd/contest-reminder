import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";
import { sanitizeString, validateEmail } from "@/utils/auth";

export async function POST(req) {
    try {
        const { email: rawEmail, password: rawPassword } = await req.json();
        const email = sanitizeString(rawEmail).toLowerCase();
        const password = String(rawPassword || "");

        if (!validateEmail(email) || !password) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 400 },
            );
        }

        await connectDB();
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 },
            );
        }

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
        return NextResponse.json({ message: "Login failed" }, { status: 500 });
    }
}
