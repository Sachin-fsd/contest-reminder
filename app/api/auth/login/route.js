const { NextResponse } = require('next/server');
const bcrypt = require('bcryptjs');
const connectDB = require('@/lib/mongodb');
const User = require('@/models/User');
const { signToken } = require('@/lib/jwt');
const { sanitizeString, validateEmail } = require('@/utils/auth');
exports.POST = async function POST(req) { try { const { email: rawEmail, password: rawPassword } = await req.json(); const email = sanitizeString(rawEmail).toLowerCase(); const password = String(rawPassword || ''); if (!validateEmail(email) || !password) return NextResponse.json({ message:'Invalid credentials' }, { status:400 }); await connectDB(); const user = await User.findOne({ email }); if (!user || !(await bcrypt.compare(password, user.password))) return NextResponse.json({ message:'Invalid credentials' }, { status:401 }); const res = NextResponse.json({ success:true }); res.cookies.set('token', signToken({ id:user._id.toString(), email:user.email, name:user.name }), { httpOnly:true, secure:process.env.NODE_ENV === 'production', sameSite:'lax', path:'/', maxAge:60*60*24*7 }); return res; } catch { return NextResponse.json({ message:'Login failed' }, { status:500 }); } };
