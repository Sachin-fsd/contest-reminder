const { NextResponse } = require('next/server');
exports.POST = async function POST() { const res = NextResponse.json({ success:true }); res.cookies.set('token', '', { httpOnly:true, path:'/', maxAge:0 }); return res; };
