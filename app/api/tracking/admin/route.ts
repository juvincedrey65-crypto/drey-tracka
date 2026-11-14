
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const tracking = body.tracking?.trim();
    const client = body.client?.trim();
    const status = body.status;

    if (!tracking || !client || !status) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs." },
        { status: 400 }
      );
    }

    const statutsAutorises = [
      "Colis reçu en Chine",
      "Colis en préparation",
      "Expédié de Chine",
      "En transit",
      "Arrivé en RDC",
      "Disponible pour le retrait à Lubumbashi",
      "Livré au client",
    ];

    if (!statutsAutorises.includes(status)) {
      return NextResponse.json(
        { error: "Statut invalide." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("colis")
      .insert({
        numero_suivi: tracking,
        nom_client: client,
        statut: status,
      })
      .select()
      .single();

    if (error) {
      console.error(error.message);
      return NextResponse.json(
        { error: "Impossible d'enregistrer ce colis." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Colis enregistré !", colis: data });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement." },
      { status: 500 }
    );
  }
}
