import Link from "next/link";
import { Clock, MapPin, Users, ArrowRight } from "lucide-react";

// DATI MOCK TOURS
const TOURS = [
  {
    id: 1,
    title: "Street Food Tour Trastevere",
    description: "Immergiti nel cuore pulsante di Roma. Assaggia il supplì caldo, la pizza al taglio e il maritozzo con la panna tra i vicoli più caratteristici.",
    price: "€45,00",
    duration: "3 Ore",
    location: "Trastevere",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop", // Pizza/Street food
    tags: ["Best Seller", "Camminata"],
    link: "#",
  },
  {
    id: 2,
    title: "Testaccio Market & Tasting",
    description: "Scopri il quartiere verace della cucina romana. Visita al mercato rionale, degustazione di salumi, formaggi e la vera pasta alla carbonara.",
    price: "€55,00",
    duration: "4 Ore",
    location: "Testaccio",
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=800&auto=format&fit=crop", // Market/Ingredients
    tags: ["Foodies", "Storia"],
    link: "#",
  },
  {
    id: 3,
    title: "Aperitivo al Tramonto con Vista",
    description: "Un'esperienza esclusiva su una terrazza panoramica. Degustazione di vini laziali e finger food gourmet mentre il sole cala sul Colosseo.",
    price: "€70,00",
    duration: "2.5 Ore",
    location: "Centro Storico",
    image: "https://images.unsplash.com/photo-1515537617637-6d60a5d43896?q=80&w=800&auto=format&fit=crop", // Wine/View
    tags: ["Romantico", "Vino"],
    link: "#",
  },
  {
    id: 4,
    title: "Cooking Class: Pasta Fresca",
    description: "Impara a fare le fettuccine e i ravioli a mano con una 'Nonna' locale. Include pranzo con le tue creazioni e vino illimitato.",
    price: "€85,00",
    duration: "4 Ore",
    location: "Vaticano",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=800&auto=format&fit=crop", // Cooking Class
    tags: ["Interattivo", "Pranzo"],
    link: "#",
  },
];

export default function FoodToursPage() {
  return (
    <div className="py-12">
      {/* Header Pagina */}
      <div className="mx-auto max-w-2xl text-center mb-16 px-6">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Esperienze di Gusto a <span className="text-primary">Roma</span>
        </h1>
        <p className="mt-4 text-lg text-stone-600">
          Lasciati guidare alla scoperta dei sapori autentici. Dai mercati rionali alle cene esclusive, vivi Roma come un vero locale.
        </p>
      </div>

      {/* Listato Tours (Card Orizzontali o Verticali - qui mantengo griglia verticale per consistenza mobile) */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 px-6">
        {TOURS.map((tour) => (
          <div 
            key={tour.id} 
            className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition-all hover:shadow-lg hover:ring-primary/20 md:flex-row"
          >
            {/* Immagine (Sx su desktop, Top su mobile) */}
            <div className="relative h-64 w-full shrink-0 overflow-hidden bg-stone-100 md:h-auto md:w-2/5">
              <div 
                className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${tour.image})` }}
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {tour.tags.map(tag => (
                   <span key={tag} className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-primary backdrop-blur-sm">
                     {tag}
                   </span>
                ))}
              </div>
            </div>

            {/* Contenuto */}
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-primary">{tour.price}</span>
                <span className="text-xs font-medium text-stone-500 uppercase">Per persona</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {tour.title}
              </h3>

              {/* Info Rapide */}
              <div className="flex flex-wrap gap-4 text-sm text-stone-600 mb-4">
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-primary" />
                  {tour.duration}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-primary" />
                  {tour.location}
                </div>
                {/* <div className="flex items-center gap-1.5">
                  <Users size={16} className="text-primary" />
                  Piccoli Gruppi
                </div> */}
              </div>
              
              <p className="text-stone-600 mb-6 leading-relaxed text-sm flex-1">
                {tour.description}
              </p>

              {/* CTA */}
              <div className="mt-auto pt-4 border-t border-stone-100">
                <Link
                  href={`/food-tours/1`}
                  className="flex w-full items-center justify-between rounded-lg bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary group-hover:bg-primary"
                >
                  Prenota Esperienza
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
