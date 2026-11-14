import "server-only";

console.log(
  "SUPABASE URL CHARGÉE :",
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)
);

console.log(
  "CLÉ SECRÈTE CHARGÉE :",
  Boolean(process.env.SUPABASE_SECRET_KEY)
);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY?.trim() || "";

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseSecretKey
);