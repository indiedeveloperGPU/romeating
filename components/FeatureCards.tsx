import Link from "next/link";
import { ShoppingBag, Map } from "lucide-react";

export default function FeatureCards() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">
      
      {/* Card Prodotti (Affiliate/Consigliati) */}
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-stone-200 transition-all hover:shadow-xl hover:ring-primary/20">
        <div className="aspect-video w-full bg-stone-100 object-cover">
           {/* Immagine: Ingredienti/Cucina (Focus su 'Consigli per cucinare') */}
           <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale transition-all duration-500 group-hover:grayscale-0" />
           
           {/* Badge opzionale per chiarire il contesto 'Consigli' */}
           <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur-sm">
             La nostra selezione
           </div>
        </div>
        
        <div className="p-8">
          <div className="flex items-center gap-3 mb-3">
            <ShoppingBag className="text-primary h-6 w-6" />
            <h2 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              Prodotti Selezionati
            </h2>
          </div>
          <p className="mt-2 text-stone-600 leading-relaxed">
            Dai migliori ingredienti agli strumenti indispensabili: abbiamo selezionato per te i prodotti che amiamo e consigliamo per la tua cucina. Acquista le nostre scelte top dai migliori partner online.
          </p>
        </div>
        <Link href="/prodotti" className="absolute inset-0">
          <span className="sr-only">Vai ai prodotti selezionati</span>
        </Link>
      </div>

      {/* Card Tours */}
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-stone-200 transition-all hover:shadow-xl hover:ring-primary/20">
        <div className="aspect-video w-full bg-stone-100 object-cover">
           {/* Immagine: Tour/Persone */}
           <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1515537617637-6d60a5d43896?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale transition-all duration-500 group-hover:grayscale-0" />
        </div>
        
        <div className="p-8">
          <div className="flex items-center gap-3 mb-3">
            <Map className="text-primary h-6 w-6" />
            <h2 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              Food Tours
            </h2>
          </div>
          <p className="mt-2 text-stone-600 leading-relaxed">
            Passeggiate gastronomiche tra i vicoli storici di Trastevere e Testaccio. Scopri i segreti della cucina capitolina guidato da veri esperti locali.
          </p>
        </div>
        <Link href="/food-tours" className="absolute inset-0">
          <span className="sr-only">Prenota un tour</span>
        </Link>
      </div>

    </section>
  );
}
