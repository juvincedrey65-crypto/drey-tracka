import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase-admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const numero = searchParams.get("numero")?.trim();

  if (!numero) {
    return NextResponse.json(
      { error: "Veuillez entrer un numéro de suivi." },
      { status: 400 }
    );
  }

  const { data: colis, error } = await supabaseAdmin
    .from("colis")
    .select(
      "numero_suivi, statut, origine, destination, derniere_mise_a_jour"
    )
    .eq("numero_suivi", numero)
    .maybeSingle();

  if (error) {
    console.error("Erreur Supabase :", error.message);

    return NextResponse.json(
      { error: "Une erreur est survenue. Réessayez plus tard." },
      { status: 500 }
    );
  }

  if (!colis) {
    return NextResponse.json(
      { error: "Aucun colis trouvé avec ce numéro." },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { colis },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}