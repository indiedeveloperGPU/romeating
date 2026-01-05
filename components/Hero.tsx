import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 pt-10 text-center">
      
      {/* Titolo Principale */}
      <div className="max-w-4xl space-y-2">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Esplora Roma con <br className="hidden sm:block" />
          <span className="text-primary">Gusto e Passione</span>
        </h1>
      </div>

      {/* Sottotitolo */}
      <p className="mt-6 max-w-2xl text-lg text-stone-600 sm:text-xl leading-relaxed">
        Selezioniamo i migliori prodotti culinari e organizziamo tour gastronomici indimenticabili. 
        Vivi l&apos;autenticità del cibo romano, direttamente a casa tua o in viaggio con noi.
      </p>

      {/* Bottoni Azione */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/food-tours"
          className="rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md active:scale-95"
        >
          Prenota un Tour
        </Link>
        
        <Link
          href="/prodotti"
          className="group flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-8 py-3.5 text-base font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/40 active:scale-95"
        >
          Visita i nostri prodotti
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

    </section>
  );
}
