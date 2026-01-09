import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Benvenuta!</h1>
        <p className="mt-2 text-stone-500">
          Da qui puoi gestire tutti i contenuti del sito Romeating.
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Card Gestione Prodotti */}
        <Link 
          href="/admin/prodotti"
          className="group relative overflow-hidden rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <ShoppingBag size={24} />
            </div>
            <ArrowRight size={20} className="text-stone-300 group-hover:text-primary transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Prodotti</h3>
          <p className="mt-1 text-sm text-stone-500">
            Aggiungi, modifica o rimuovi i prodotti affiliati Amazon e le offerte.
          </p>
        </Link>

        {/* Future Card: Food Tours */}
        <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-stone-50 p-6 opacity-60">
           <div className="flex items-center justify-between mb-4">
            <div className="rounded-lg bg-stone-200 p-3 text-stone-500">
              <ShoppingBag size={24} />
            </div>
          </div>
          <h3 className="text-lg font-bold text-stone-500">Food Tours</h3>
          <p className="mt-1 text-sm text-stone-400">
            Prossimamente disponibile.
          </p>
        </div>
      </div>
    </div>
  );
}
