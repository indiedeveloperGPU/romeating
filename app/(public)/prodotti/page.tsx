import { createClient } from "@/lib/supabase/server";
import ProductsClient, { Product } from "@/components/public/ProductsClient";

export const revalidate = 0; // Disabilita cache per vedere subito i nuovi prodotti (o usa 60 per 1 minuto)

export default async function ProdottiPage() {
  const supabase = await createClient();

  // Fetch dati dal DB
  const { data: rawProducts, error } = await supabase
    .from("prodotti")
    .select("*")
    .order("data_creazione", { ascending: false });

  if (error) {
    console.error("Errore fetch prodotti:", error);
    return <div className="p-10 text-center">Errore caricamento prodotti.</div>;
  }

  // Mappatura Dati: Database (snake_case) -> Frontend (camelCase)
  const products: Product[] = (rawProducts || []).map((p) => ({
    id: p.id,
    name: p.nome,
    description: p.descrizione,
    price: p.prezzo,
    originalPrice: p.prezzo_originale,
    image: p.immagine_url || "/placeholder-food.jpg", // Fallback immagine
    partner: p.partner,
    badge: p.badge,
    link: p.link_affiliazione,
    category: p.categoria, // 'lista_amazon' o 'scontati'
  }));

  return <ProductsClient products={products} />;
}
