import Link from "next/link";
import AuthForm from "@/app/components/AuthForm";
export default function Register() { return <main className="min-h-screen flex flex-col items-center justify-center p-6"><AuthForm mode="register" /><p className="mt-5 text-sm">Already have an account? <Link href="/login" className="text-pink-400">Login</Link></p></main>; }
