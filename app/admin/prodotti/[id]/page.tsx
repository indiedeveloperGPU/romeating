import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{ id: string }>; // In Next.js 15 params è una Promise
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  // Attendi i parametri
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  const supabase = await createClient();

  // Recupera il prodotto singolo dal DB
  const { data: product, error } = await supabase
    .from("prodotti")
    .select("*")
    .eq("id", productId)
    .single();

  if (error || !product) {
    console.error("Errore fetch o prodotto non trovato:", error);
    return notFound(); // Mostra pagina 404 standard di Next.js
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/prodotti"
          className="rounded-full p-2 text-stone-500 hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Modifica Prodotto</h1>
          <p className="text-sm text-stone-500">
            Modifica i dettagli di <strong>{product.nome}</strong>
          </p>
        </div>
      </div>

      {/* Passiamo i dati al form che si autoconfigurerà in modalità EDIT */}
      <ProductForm initialData={product} />
    </div>
  );
}
