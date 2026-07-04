const amqp = require('amqplib');
const QUEUE_NAME = 'contest-reminders';
let connection; let channel;
async function getChannel() { if (channel) return channel; if (!process.env.RABBITMQ_URL) throw new Error('RABBITMQ_URL missing'); connection ||= await amqp.connect(process.env.RABBITMQ_URL); channel = await connection.createChannel(); await channel.assertQueue(QUEUE_NAME, { durable: true }); channel.prefetch(1); return channel; }
async function enqueueEmailJob(job) { const ch = await getChannel(); return ch.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(job)), { persistent: true }); }
module.exports = { QUEUE_NAME, getChannel, enqueueEmailJob };
