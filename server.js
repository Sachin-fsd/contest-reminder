import express from "express";
import axios from "axios";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

router.get("/check-contests", async (req, res) => {

    try {

        const contests = [];

        // ---------------- LeetCode ----------------

        const lc = await axios.post(
            "https://leetcode.com/graphql",
            {
                query: `
                {
                  allContests {
                    title
                    titleSlug
                    startTime
                    duration
                  }
                }
                `
            }
        );

        lc.data.data.allContests.forEach(c => {

            contests.push({
                platform: "LeetCode",
                name: c.title,
                start: new Date(c.startTime * 1000),
                duration: c.duration
            });

        });


        // ---------------- Codeforces ----------------

        const cf = await axios.get(
            "https://codeforces.com/api/contest.list"
        );

        cf.data.result
            .filter(c => c.phase === "BEFORE")
            .forEach(c => {

                contests.push({
                    platform: "Codeforces",
                    name: c.name,
                    start: new Date(c.startTimeSeconds * 1000),
                    duration: c.durationSeconds
                });

            });


        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const tomorrowDate = tomorrow.toDateString();

        const contestsTomorrow = contests.filter(
            c => c.start.toDateString() === tomorrowDate
        );


        if (contestsTomorrow.length) {

            let text = "";

            contestsTomorrow.forEach(c => {

                text += `
Platform : ${c.platform}
Contest  : ${c.name}
Starts   : ${c.start.toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata"
                })}

`;

            });

            await transporter.sendMail({
                from: process.env.EMAIL,
                to: "yourmail@gmail.com",
                subject: "Contest Tomorrow 🚀",
                text
            });

        }

        res.json({
            success: true,
            contestsTomorrow
        });

    }
    catch (err) {

        console.error(err);

        res.status(500).json({
            success: false
        });

    }

});

export default router;