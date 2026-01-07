"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, AlertTriangle, X } from "lucide-react";
import { toast } from "sonner"; // 1. Importiamo Sonner

export default function DeleteProductButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 

  const handleDelete = async () => {
    setLoading(true);
    const supabase = createClient();

    try {
      // Elimina dal Database
      const { error } = await supabase
        .from("prodotti")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // 2. Successo: Notifica Toast + Chiudi Modale + Refresh
      toast.success("Prodotto eliminato con successo!");
      setIsOpen(false);
      router.refresh();
      
    } catch (error) {
      console.error("Errore eliminazione:", error);
      // 3. Errore: Notifica Toast
      toast.error("Impossibile eliminare il prodotto. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. IL BOTTONE CESTINO (Apre la modale) */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg p-2 text-stone-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        title="Elimina"
      >
        <Trash2 size={18} />
      </button>

      {/* 2. LA MODALE CUSTOM */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          
          {/* Overlay Scuro (sfondo) */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !loading && setIsOpen(false)} // Chiude se clicchi fuori
          />

          {/* Box del Dialogo */}
          <div className="relative w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-stone-200 animate-in zoom-in-95 duration-200">
            
            {/* Header Modale */}
            <div className="flex items-center justify-between border-b border-stone-100 p-4">
              <h3 className="font-bold text-stone-800">Elimina Prodotto</h3>
              <button 
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Corpo Modale */}
            <div className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle size={24} />
              </div>
              <p className="mb-2 text-lg font-semibold text-stone-800">
                Sei sicuro?
              </p>
              <p className="text-sm text-stone-500">
                Questa azione eliminerà definitivamente il prodotto dal database. Non potrai tornare indietro.
              </p>
            </div>

            {/* Footer Azioni */}
            <div className="flex gap-3 bg-stone-50 p-4">
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="flex-1 rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-sm hover:bg-stone-50 hover:text-stone-900 focus:ring-2 focus:ring-stone-200 disabled:opacity-50"
              >
                Annulla
              </button>
              
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Eliminazione...
                  </>
                ) : (
                  "Elimina"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
