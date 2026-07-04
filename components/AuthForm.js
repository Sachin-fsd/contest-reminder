"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AuthForm({ mode }) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    async function submit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const res = await fetch(`/api/auth/${mode}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (res.ok) router.push("/dashboard");
        else setError((await res.json()).message || "Something went wrong");
        setLoading(false);
    }
    return (
        <form
            onSubmit={submit}
            className="glass mx-auto mt-20 max-w-md space-y-5 rounded-3xl p-8"
        >
            <h1 className="text-3xl font-bold">
                {mode === "login" ? "Welcome back" : "Create account"}
            </h1>
            {mode === "register" && (
                <input
                    name="name"
                    placeholder="Name"
                    className="w-full rounded-xl bg-slate-900 p-3"
                    required
                />
            )}
            <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-xl bg-slate-900 p-3"
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                minLength={8}
                className="w-full rounded-xl bg-slate-900 p-3"
                required
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 p-3 font-semibold hover:bg-blue-500"
            >
                {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
            </button>
        </form>
    );
}
