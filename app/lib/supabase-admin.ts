
import "server-only";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY?.trim() || "";

console.log("SUPABASE URL CHARGÉE :", Boolean(supabaseUrl));
console.log("CLÉ SECRÈTE CHARGÉE :", Boolean(supabaseSecretKey));

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseSecretKey
);

console.log("CLIENT SUPABASE ADMIN CRÉÉ");
