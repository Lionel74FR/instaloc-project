import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { email, password, firstName, lastName } = await req.json();

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Existe déjà" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 12);
  await db.user.create({ data: { email, password: hashed, firstName, lastName } });

  return NextResponse.json({ ok: true });
}