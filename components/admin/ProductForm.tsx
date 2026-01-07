"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getUploadUrl } from "@/actions/storage";
import { Save, Loader2, X, Upload } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner"; // <--- 1. Importiamo Sonner

// Definiamo il tipo dei dati che ci aspettiamo dal DB
interface ProductData {
  id?: number;
  nome: string;
  descrizione: string;
  prezzo: number;
  prezzo_originale?: number | null;
  link_affiliazione: string;
  partner: string;
  categoria: string;
  badge?: string | null;
  immagine_url: string;
}

interface ProductFormProps {
  initialData?: ProductData; // Opzionale: se c'è, siamo in modalità MODIFICA
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const isEditing = !!initialData; // Booleano: true se stiamo modificando

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // STATO DEL FORM (Inizializzato con initialData se esiste)
  const [formData, setFormData] = useState({
    nome: initialData?.nome || "",
    descrizione: initialData?.descrizione || "",
    prezzo: initialData?.prezzo?.toString() || "",
    prezzo_originale: initialData?.prezzo_originale?.toString() || "",
    link_affiliazione: initialData?.link_affiliazione || "",
    partner: initialData?.partner || "Amazon",
    categoria: initialData?.categoria || "lista_amazon",
    badge: initialData?.badge || "",
  });
  
  // Gestione Immagine
  const [imageFile, setImageFile] = useState<File | null>(null);
  // Se stiamo modificando, l'anteprima è l'URL esistente
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.immagine_url || null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = initialData?.immagine_url || ""; // Di base teniamo la vecchia

      // 1. UPLOAD NUOVA IMMAGINE (Solo se l'utente ha selezionato un nuovo file)
      if (imageFile) {
        setUploading(true);
        const { success, url, publicUrl, error } = await getUploadUrl(imageFile.name, imageFile.type);
        
        if (!success || !url) throw new Error("Errore URL upload: " + error);

        await fetch(url, {
          method: "PUT",
          body: imageFile,
          headers: { "Content-Type": imageFile.type },
        });

        imageUrl = publicUrl!;
        setUploading(false);
      } else if (!imageUrl) {
        // Se non c'è file nuovo E non c'era immagine vecchia
        toast.error("Devi caricare un'immagine per il prodotto!"); // <--- Toast Errore
        setLoading(false);
        return;
      }

      // Preparazione dati per DB
      const productPayload = {
        nome: formData.nome,
        descrizione: formData.descrizione,
        prezzo: parseFloat(formData.prezzo.replace(",", ".")),
        prezzo_originale: formData.prezzo_originale ? parseFloat(formData.prezzo_originale.replace(",", ".")) : null,
        partner: formData.partner,
        categoria: formData.categoria,
        badge: formData.badge || null,
        link_affiliazione: formData.link_affiliazione,
        immagine_url: imageUrl,
      };

      if (isEditing && initialData?.id) {
        // --- MODALITÀ UPDATE ---
        const { error } = await supabase
          .from("prodotti")
          .update(productPayload)
          .eq("id", initialData.id); // Aggiorna DOVE id corrisponde
        
        if (error) throw error;
        toast.success("Prodotto aggiornato con successo!"); // <--- Toast Successo Modifica
      } else {
        // --- MODALITÀ INSERT ---
        const { error } = await supabase
          .from("prodotti")
          .insert(productPayload);
        
        if (error) throw error;
        toast.success("Prodotto pubblicato con successo!"); // <--- Toast Successo Creazione
      }

      router.push("/admin/prodotti");
      router.refresh(); 

    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error("Errore: " + error.message); // <--- Toast Errore Catch
      } else {
        toast.error("Si è verificato un errore imprevisto.");
      }
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* 1. INFO PRODOTTO */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-foreground mb-4">Informazioni Prodotto</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="col-span-2">
            <label className="label">Nome Prodotto</label>
            <input name="nome" required value={formData.nome} onChange={handleChange} className="input" />
          </div>
          <div className="col-span-2">
            <label className="label">Descrizione Breve</label>
            <textarea name="descrizione" rows={3} value={formData.descrizione} onChange={handleChange} className="input resize-none" />
          </div>
          <div>
            <label className="label">Prezzo Attuale (€)</label>
            <input name="prezzo" required type="number" step="0.01" value={formData.prezzo} onChange={handleChange} className="input font-mono" />
          </div>
          <div>
            <label className="label">Prezzo Originale (Opzionale)</label>
            <input name="prezzo_originale" type="number" step="0.01" value={formData.prezzo_originale} onChange={handleChange} className="input font-mono" />
          </div>
        </div>
      </div>

      {/* 2. IMMAGINE (Con Fix Bug CSS) */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-foreground mb-4">Immagine</h2>
        <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-stone-200 bg-stone-50 p-8 hover:bg-stone-100 transition-colors">
          {imagePreview ? (
            <div className="relative z-10 aspect-square w-48 overflow-hidden rounded-lg border border-stone-200 shadow-sm group">
              <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
              {/* Bottone per rimuovere/cambiare immagine */}
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setImageFile(null); 
                  setImagePreview(null); 
                }}
                className="absolute top-2 right-2 rounded-full bg-white p-1 text-stone-500 shadow-md hover:text-red-600 z-20 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="text-center pointer-events-none">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-stone-200 text-stone-500">
                <Upload size={24} />
              </div>
              <p className="text-sm font-medium text-stone-700">Clicca per caricare</p>
            </div>
          )}
          
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className={`absolute inset-0 h-full w-full cursor-pointer opacity-0 ${imagePreview ? 'hidden' : 'block'}`} 
            style={{ zIndex: imagePreview ? -1 : 10 }}
          />
        </div>
      </div>

      {/* 3. DETTAGLI */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-foreground mb-4">Dettagli & Link</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="label">Categoria</label>
            <select name="categoria" value={formData.categoria} onChange={handleChange} className="input">
              <option value="lista_amazon">Lista Amazon</option>
              <option value="scontati">Prodotti Scontati</option>
            </select>
          </div>
          <div>
            <label className="label">Badge (Opzionale)</label>
            <input name="badge" value={formData.badge} onChange={handleChange} className="input" placeholder="es. Novità" />
          </div>
          <div>
            <label className="label">Partner</label>
            <input name="partner" value={formData.partner} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Link Affiliazione</label>
            <input name="link_affiliazione" required type="url" value={formData.link_affiliazione} onChange={handleChange} className="input text-blue-600" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Link href="/admin/prodotti" className="rounded-lg px-6 py-3 text-sm font-semibold text-stone-600 hover:bg-stone-100">
          Annulla
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-bold text-white shadow-md hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> {isEditing ? "Aggiornamento..." : "Salvataggio..."}</>
          ) : (
            <><Save size={18} /> {isEditing ? "Aggiorna Prodotto" : "Pubblica Prodotto"}</>
          )}
        </button>
      </div>

      <style jsx>{`
        .label { display: block; margin-bottom: 0.5rem; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: #78716c; }
        .input { width: 100%; border-radius: 0.5rem; border: 1px solid #e7e5e4; background-color: #fafaf9; padding: 0.75rem; font-size: 0.875rem; transition: all; }
        .input:focus { border-color: var(--primary); outline: none; ring: 1px solid var(--primary); }
      `}</style>
    </form>
  );
}
