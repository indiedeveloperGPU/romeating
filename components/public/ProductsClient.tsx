"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Star, Tag, List, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Definiamo l'interfaccia basata su come arrivano i dati dal DB (mappati)
export interface Product {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  partner: string;
  badge: string | null;
  link: string;
}

// Utility per formattare prezzo
const formatPrice = (price: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price);

// Componente Card Prodotto
const ProductCard = ({ product }: { product: Product }) => (
  <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-stone-200 transition-all hover:shadow-md hover:ring-primary/20">
    <div className="relative aspect-square overflow-hidden bg-stone-100">
      {product.badge && (
        <span className={`absolute left-2 top-2 z-10 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm sm:left-3 sm:top-3 sm:text-xs
          ${product.category === 'scontati' ? 'bg-red-600' : 'bg-primary/90'}
        `}>
          {product.category === 'scontati' ? <Tag size={10} className="mr-1" /> : <Star size={10} className="mr-1" />}
          {product.badge}
        </span>
      )}
      <div 
        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${product.image})` }}
      />
    </div>

    <div className="flex flex-1 flex-col p-3 sm:p-5">
      <div className="flex flex-col-reverse items-start justify-between gap-1 mb-2 sm:flex-row sm:items-center">
         <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 truncate w-full sm:w-auto">
            {product.partner}
         </span>
         <div className="flex items-center gap-2">
           {product.originalPrice && (
             <span className="text-xs text-stone-400 line-through">
               {formatPrice(product.originalPrice)}
             </span>
           )}
           <span className={`text-sm font-bold sm:text-lg ${product.category === 'scontati' ? 'text-red-600' : 'text-primary'}`}>
              {formatPrice(product.price)}
           </span>
         </div>
      </div>
      
      <h3 className="font-serif text-sm font-bold text-foreground mb-1 leading-tight group-hover:text-primary transition-colors sm:text-lg sm:mb-2 line-clamp-2">
        <Link href={product.link} target="_blank">
            {product.name}
        </Link>
      </h3>
      
      <p className="text-xs text-stone-500 mb-4 line-clamp-2 flex-1 sm:text-sm">
        {product.description}
      </p>

      <Link
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-lg bg-stone-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary sm:text-sm sm:py-2.5"
      >
        <span className="truncate">Vedi su {product.partner}</span>
        <ArrowUpRight size={14} className="shrink-0" />
      </Link>
    </div>
  </div>
);

// Tipi per la vista attiva (devono coincidere con i valori nel DB)
type ViewState = 'categories' | 'lista_amazon' | 'scontati';

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [view, setView] = useState<ViewState>('categories');

  // Filtra prodotti
  const currentProducts = products.filter(p => p.category === view);

  return (
    <div className="min-h-[80vh] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Header Dinamico */}
        <div className="mx-auto max-w-2xl text-center mb-10">
          {view === 'categories' ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                La Bottega di <span className="text-primary">Romeating</span>
              </h1>
              <p className="mt-3 text-base text-stone-600 sm:text-lg">
                Cosa stai cercando oggi?
              </p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col items-center">
              <button 
                onClick={() => setView('categories')}
                className="mb-4 flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-primary transition-colors"
              >
                <ArrowLeft size={16} />
                Torna alle categorie
              </button>
              
              <h1 className="font-serif text-3xl font-bold text-foreground">
                {view === 'lista_amazon' ? 'La mia lista Amazon' : 'Prodotti Scontati'}
              </h1>
            </motion.div>
          )}
        </div>

        {/* CONTENUTO PRINCIPALE */}
        <AnimatePresence mode="wait">
          
          {/* VISTA 1: SELEZIONE CATEGORIE */}
          {view === 'categories' && (
            <motion.div 
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto"
            >
              {/* Card Categoria: Amazon List */}
              <button 
                onClick={() => setView('lista_amazon')}
                className="group relative flex h-64 flex-col items-center justify-center overflow-hidden rounded-2xl bg-stone-100 p-8 text-center shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div 
                  className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 transition-opacity group-hover:opacity-50 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-4 rounded-full bg-white p-4 shadow-lg text-primary">
                    <List size={32} />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white mb-2">La mia lista Amazon</h2>
                  <p className="text-stone-100 text-sm max-w-xs">
                    La selezione curata dei prodotti che amiamo e usiamo ogni giorno.
                  </p>
                </div>
              </button>

              {/* Card Categoria: Scontati */}
              <button 
                onClick={() => setView('scontati')}
                className="group relative flex h-64 flex-col items-center justify-center overflow-hidden rounded-2xl bg-red-50 p-8 text-center shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div 
                  className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 transition-opacity group-hover:opacity-50 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-red-900/30 group-hover:bg-red-900/50 transition-colors" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-4 rounded-full bg-white p-4 shadow-lg text-red-600">
                    <Tag size={32} />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white mb-2">Prodotti Scontati</h2>
                  <p className="text-stone-100 text-sm max-w-xs">
                    Offerte lampo e sconti esclusivi sui migliori brand.
                  </p>
                </div>
              </button>
            </motion.div>
          )}

          {/* VISTA 2: LISTA PRODOTTI */}
          {view !== 'categories' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-3"
            >
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              
              {currentProducts.length === 0 && (
                <div className="col-span-full py-12 text-center text-stone-500">
                  <ShoppingBag className="mx-auto h-12 w-12 text-stone-300 mb-4" />
                  <p>Nessun prodotto trovato in questa categoria al momento.</p>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
