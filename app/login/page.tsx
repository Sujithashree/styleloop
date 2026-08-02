import Link from "next/link";
import AuthForm from "@/app/components/AuthForm";
export default function Login() { return <main className="min-h-screen flex flex-col items-center justify-center p-6"><AuthForm mode="login" /><p className="mt-5 text-sm">New here? <Link href="/register" className="text-pink-400">Create an account</Link></p></main>; }
