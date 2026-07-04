const nodemailer = require("nodemailer");

function getTransporter() {
    if (!process.env.EMAIL_USER) throw new Error("EMAIL_USER missing");
    if (!process.env.EMAIL_PASS) throw new Error("EMAIL_PASS missing");

    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
}

function getSender() {
    return `"${process.env.SENDER_NAME || "Contest Reminder"}" <${process.env.EMAIL_USER}>`;
}

function renderContestEmail({ userName, contest }) {
    const date = new Date(contest.startTime);

    return `<!doctype html>
<html>
<body style="margin:0;background:#0f172a;font-family:Arial;color:#e2e8f0">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:32px">
        <table width="600" style="max-width:100%;background:#111827;border-radius:24px;overflow:hidden;border:1px solid #334155">
          <tr>
            <td style="padding:32px">
              <h1 style="color:#fff;margin:0 0 8px">
                Contest starts soon 🚀
              </h1>

              <p>
                Hi ${userName}, don't miss <b>${contest.title}</b>.
              </p>

              <div style="background:#020617;border-radius:18px;padding:20px;margin:22px 0">
                <p><b>Platform:</b> ${contest.platform}</p>
                <p><b>Date:</b> ${date.toLocaleDateString()}</p>
                <p><b>Time:</b> ${date.toLocaleTimeString()}</p>
                <p><b>Countdown:</b> within 24 hours</p>
              </div>

              <a
                href="${contest.url}"
                style="display:inline-block;background:#2563eb;color:white;text-decoration:none;padding:14px 22px;border-radius:12px;font-weight:bold"
              >
                Register / Open Contest
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendContestReminder(job) {
    const transporter = getTransporter();

    await transporter.sendMail({
        from: getSender(),
        to: job.userEmail,
        subject: `${job.contest.title} starts soon`,
        html: renderContestEmail(job),
    });
}

module.exports = {
    sendContestReminder,
    renderContestEmail,
};