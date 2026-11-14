
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Déconnexion réussie."
  });

  response.cookies.set("drey_admin_auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0
  });

  return response;
}
