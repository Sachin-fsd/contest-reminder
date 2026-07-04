import { NextResponse } from "next/server";
import { fetchAllContests } from "@/services";

export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            contests: await fetchAllContests(),
        });
    } catch {
        return NextResponse.json(
            { success: false, message: "Unable to fetch contests" },
            { status: 502 },
        );
    }
}
