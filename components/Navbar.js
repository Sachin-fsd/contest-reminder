'use client';
import { useRouter } from 'next/navigation';
export default function Navbar({ user }) { const router=useRouter(); async function logout(){ await fetch('/api/auth/logout',{method:'POST'}); router.push('/login'); } return <header className="flex items-center justify-between p-6"><div><p className="text-sm text-slate-400">Contest Reminder</p><h1 className="text-2xl font-bold">Hi, {user?.name}</h1></div><button onClick={logout} className="rounded-xl border border-slate-700 px-4 py-2 hover:bg-slate-800">Logout</button></header> }
