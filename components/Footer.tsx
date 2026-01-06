import Link from "next/link";
import { InstagramIcon, FacebookIcon } from "@/components/SocialIcons";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-stone-50 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Griglia a 3 Colonne */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-8">
          
          {/* Colonna 1: Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="font-serif text-2xl font-bold text-foreground">
              Rome<span className="text-primary">ating</span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-600 max-w-xs">
              La tua porta d&apos;accesso alle migliori esperienze culinarie e ai prodotti più autentici. Selezionati con amore, per te.
            </p>
          </div>

          {/* Colonna 2: Link Rapidi */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Link Rapidi</h3>
            <ul className="space-y-3 text-sm text-stone-600">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/prodotti" className="hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/food-tours" className="hover:text-primary transition-colors">
                  Food Tours
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="hover:text-primary transition-colors">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonna 3: Social & Legal */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Seguici</h3>
            <div className="flex gap-4 mb-6">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-white p-2 text-stone-600 shadow-sm ring-1 ring-stone-200 transition-all hover:text-primary hover:ring-primary hover:scale-105"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-white p-2 text-stone-600 shadow-sm ring-1 ring-stone-200 transition-all hover:text-primary hover:ring-primary hover:scale-105"
                aria-label="Facebook"
              >
                <FacebookIcon size={20} />
              </a>
              <a 
                href="mailto:info@romeating.com" 
                className="rounded-full bg-white p-2 text-stone-600 shadow-sm ring-1 ring-stone-200 transition-all hover:text-primary hover:ring-primary hover:scale-105"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            
            <p className="text-xs text-stone-500 leading-tight">
              Partecipante al Programma Affiliazione Amazon UE. In qualità di Affiliato Amazon, ricevo un guadagno dagli acquisti idonei.
            </p>
          </div>
        </div>

        {/* Separatore e Copyright */}
        <div className="mt-12 border-t border-stone-200 pt-8 text-center">
          <p className="text-xs text-stone-500">
            &copy; {currentYear} Romeating. Tutti i diritti riservati. P.IVA 00000000000
          </p>
        </div>
      </div>
    </footer>
  );
}
