
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "node:crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: "Mot de passe administrateur non configuré." },
        { status: 500 }
      );
    }

    if (body.password !== adminPassword) {
      return NextResponse.json(
        { error: "Mot de passe incorrect." },
        { status: 401 }
      );
    }

    const token = createHmac("sha256", adminPassword)
      .update("drey-admin-session")
      .digest("hex");

    const response = NextResponse.json({
      message: "Connexion réussie."
    });

    response.cookies.set("drey_admin_auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la connexion." },
      { status: 500 }
    );
  }
}
