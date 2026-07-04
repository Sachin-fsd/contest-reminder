import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/utils/auth';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import DashboardClient from '@/components/DashboardClient';
export default async function DashboardPage(){ const user=await getCurrentUser(); if(!user) redirect('/login'); return <main><Navbar user={user}/><div className="flex gap-6 px-6 pb-10"><Sidebar/><section className="flex-1"><div className="mb-6 rounded-3xl bg-gradient-to-r from-blue-600/40 to-fuchsia-600/30 p-8"><h2 className="text-4xl font-black">Upcoming coding contests</h2><p className="mt-2 text-slate-300">Track LeetCode, Codeforces, CodeChef and AtCoder from one beautiful dashboard.</p></div><DashboardClient/></section></div></main> }
