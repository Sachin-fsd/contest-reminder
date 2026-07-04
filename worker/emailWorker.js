const { getChannel, QUEUE_NAME } = require("../lib/rabbitmq");
const { sendContestReminder } = require("../lib/mail");
const MAX_RETRIES = 3;
async function start() {
  const ch = await getChannel();
  console.log(`Worker listening on ${QUEUE_NAME}`);
  ch.consume(
    QUEUE_NAME,
    async (msg) => {
      if (!msg) return;
      const retries = Number(msg.properties.headers?.retries || 0);
      try {
        await sendContestReminder(JSON.parse(msg.content.toString()));
        ch.ack(msg);
      } catch (error) {
        console.error("Email failed", error);
        ch.ack(msg);
        if (retries < MAX_RETRIES)
          ch.sendToQueue(QUEUE_NAME, msg.content, {
            persistent: true,
            headers: { retries: retries + 1 },
          });
      }
    },
    { noAck: false },
  );
}
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
