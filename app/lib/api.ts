import { NextResponse } from "next/server";
export const badRequest = (message: string, status = 400) => NextResponse.json({ error: message }, { status });
export const serverError = () => NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
