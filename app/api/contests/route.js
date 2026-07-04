const { NextResponse } = require('next/server');
const { fetchAllContests } = require('@/services');
exports.GET = async function GET() { try { return NextResponse.json({ success: true, contests: await fetchAllContests() }); } catch (error) { return NextResponse.json({ success: false, message: 'Unable to fetch contests' }, { status: 502 }); } };
