import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { enqueueEmailJob } from "@/lib/rabbitmq";
import { fetchAllContests } from "@/services";
import { withinNext24Hours } from "@/utils/contestUtils";

export async function POST(req) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    await connectDB();
    const contests = (await fetchAllContests()).filter(withinNext24Hours);
    const users = await User.find({}, "email name preferredPlatforms").lean();
    let emailsQueued = 0;

    await Promise.all(
      users.flatMap((user) =>
        contests
          .filter((c) => user.preferredPlatforms?.includes(c.platform))
          .map(async (contest) => {
            await enqueueEmailJob({
              userEmail: user.email,
              userName: user.name,
              contest,
            });
            emailsQueued++;
          }),
      ),
    );

    return NextResponse.json({
      success: true,
      emailsQueued,
      contestsFound: contests.length,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to queue reminders" },
      { status: 500 },
    );
  }
}
