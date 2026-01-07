import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteProductButton from "@/components/admin/DeleteProductButton"; 
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic"; // Importante: evita che la pagina venga cacheata staticamente

export default async function AdminProductsPage() {
  const supabase = await createClient();

  // 1. Fetch Prodotti dal DB
  const { data: prodotti, error } = await supabase
    .from("prodotti")
    .select("*")
    .order("data_creazione", { ascending: false });

  if (error) {
    return <div className="text-red-600">Errore caricamento: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Header con Tasto Nuovo */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestione Prodotti</h1>
          <p className="text-sm text-stone-500">
            {prodotti?.length || 0} prodotti nel catalogo
          </p>
        </div>
        <Link
          href="/admin/prodotti/nuovo"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700 shadow-sm"
        >
          <Plus size={18} />
          Nuovo Prodotto
        </Link>
      </div>

      {/* Tabella Prodotti */}
      <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 text-stone-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Immagine</th>
              <th className="px-6 py-4 font-semibold">Nome</th>
              <th className="px-6 py-4 font-semibold">Prezzo</th>
              <th className="px-6 py-4 font-semibold">Categoria</th>
              <th className="px-6 py-4 font-semibold text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {prodotti?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                  Nessun prodotto trovato. Inizia creandone uno!
                </td>
              </tr>
            ) : (
              prodotti?.map((product) => (
                <tr key={product.id} className="group hover:bg-stone-50/50">
                  {/* Immagine */}
                  <td className="px-6 py-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-stone-100 border border-stone-200">
                      {/* Usa <img /> standard per R2 per evitare costi Vercel, oppure <Image unoptimized /> */}
                      <img 
                        src={product.immagine_url} 
                        alt={product.nome}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </td>
                  
                  {/* Nome & Link */}
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{product.nome}</div>
                    <a 
                      href={product.link_affiliazione} 
                      target="_blank" 
                      className="flex items-center gap-1 text-xs text-stone-400 hover:text-primary mt-1"
                    >
                      Vedi link <ExternalLink size={10} />
                    </a>
                  </td>

                  {/* Prezzo */}
                  <td className="px-6 py-4 font-mono text-stone-600">
                    €{product.prezzo}
                  </td>

                  {/* Categoria Badge */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${product.categoria === 'scontati' 
                        ? 'bg-red-50 text-red-700' 
                        : 'bg-blue-50 text-blue-700'
                      }
                    `}>
                      {product.categoria === 'scontati' ? 'Offerta' : 'Lista Amazon'}
                    </span>
                  </td>

                  {/* Azioni */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/prodotti/${product.id}`} // Pagina Modifica
                        className="rounded-lg p-2 text-stone-500 hover:bg-primary/10 hover:text-primary transition-colors"
                        title="Modifica"
                      >
                        <Pencil size={18} />
                      </Link>
<DeleteProductButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
