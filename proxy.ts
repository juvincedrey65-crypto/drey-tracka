
import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get("drey_admin_auth")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || !cookie) {
    return refuse(request);
  }

  const expectedToken = createHmac("sha256", adminPassword)
    .update("drey-admin-session")
    .digest("hex");

  const valid =
    cookie.length === expectedToken.length &&
    timingSafeEqual(
      Buffer.from(cookie),
      Buffer.from(expectedToken)
    );

  if (!valid) {
    return refuse(request);
  }

  return NextResponse.next();
}

function refuse(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Accès non autorisé." },
      { status: 401 }
    );
  }

  return NextResponse.redirect(
    new URL("/connexion", request.url)
  );
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
