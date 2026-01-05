import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

// DATI MOCK (Simulazione DB)
const PRODUCTS = [
  {
    id: 1,
    name: "Guanciale Stagionato Amatrice",
    description: "Il vero re della Carbonara. Stagionatura 60 giorni, pepatura manuale. Perfetto per i tuoi primi piatti romani.",
    price: "€18,90",
    image: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=800&auto=format&fit=crop", // Carne/Salumi
    partner: "Amazon",
    badge: "Best Seller",
    link: "https://amazon.it", // Link mock
  },
  {
    id: 2,
    name: "Pecorino Romano DOP",
    description: "Formaggio a pasta dura, cotta, prodotto con latte fresco di pecora intero. Stagionatura minima 5 mesi.",
    price: "€24,50",
    image: "https://images.unsplash.com/photo-1634487359989-3e913a697195?q=80&w=800&auto=format&fit=crop", // Formaggio
    partner: "Amazon",
    badge: "Consigliato",
    link: "https://amazon.it",
  },
  {
    id: 3,
    name: "Spaghettoni Artigianali",
    description: "Trafilatura al bronzo ed essiccazione lenta. La superficie ruvida cattura ogni tipo di condimento.",
    price: "€5,90",
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=800&auto=format&fit=crop", // Pasta
    partner: "Eataly",
    badge: null,
    link: "https://eataly.net",
  },
  {
    id: 4,
    name: "Kit Carbonara Experience",
    description: "Tutto l'occorrente per 4 persone: Spaghettoni, Guanciale, Pecorino e Pepe Nero Tellicherry.",
    price: "€45,00",
    image: "https://images.unsplash.com/photo-1546549010-413bc071d24b?q=80&w=800&auto=format&fit=crop", // Pasta dish/Kit
    partner: "Romeating Shop",
    badge: "Esclusivo",
    link: "#",
  },
  {
    id: 5,
    name: "Vino Rosso Cesanese del Piglio",
    description: "Un rosso autoctono laziale, corposo e fruttato. L'abbinamento ideale per abbacchio e piatti di carne.",
    price: "€16,00",
    image: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?q=80&w=800&auto=format&fit=crop", // Vino
    partner: "Tannico",
    badge: null,
    link: "#",
  },
  {
    id: 6,
    name: "Macchina per Pasta Atlas 150",
    description: "La regina delle macchine per pasta fatte in casa. Marcato Design, solida e durevole. Made in Italy.",
    price: "€79,90",
    image: "https://images.unsplash.com/photo-1598866594230-a7d127dddb18?q=80&w=800&auto=format&fit=crop", // Utensile
    partner: "Amazon",
    badge: "Top Gear",
    link: "#",
  },
];

export default function ProdottiPage() {
  return (
    <div className="py-12">
      {/* Header Pagina */}
      <div className="mx-auto max-w-2xl text-center mb-16 px-6">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          I Prodotti di <span className="text-primary">Romeating</span>
        </h1>
        <p className="mt-4 text-lg text-stone-600">
          Una selezione curata dei migliori ingredienti e strumenti per portare la cucina romana autentica a casa tua.
        </p>
      </div>

      {/* Grid Prodotti */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 px-6">
        {PRODUCTS.map((product) => (
          <div 
            key={product.id} 
            className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition-all hover:shadow-lg hover:ring-primary/20"
          >
            {/* Immagine */}
            <div className="relative aspect-square overflow-hidden bg-stone-100">
              {product.badge && (
                <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur-sm">
                  <Star size={12} className="mr-1 fill-primary" />
                  {product.badge}
                </span>
              )}
              {/* Immagine Placeholder: in produzione usare componente <Image> */}
              <div 
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${product.image})` }}
              />
            </div>

            {/* Contenuto */}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between mb-2">
                 <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {product.partner}
                 </span>
                 <span className="text-lg font-bold text-primary">
                    {product.price}
                 </span>
              </div>
              
              <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                <Link href={product.link} target="_blank">
                    {product.name}
                </Link>
              </h3>
              
              <p className="text-sm text-stone-600 mb-6 flex-1">
                {product.description}
              </p>

              {/* Call to Action (Affiliate Link) */}
              <Link
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
              >
                Acquista su {product.partner}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
