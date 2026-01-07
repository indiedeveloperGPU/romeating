import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/prodotti"
          className="rounded-full p-2 text-stone-500 hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Nuovo Prodotto</h1>
          <p className="text-sm text-stone-500">Compila i dettagli per aggiungere un prodotto al catalogo.</p>
        </div>
      </div>

      <ProductForm />
    </div>
  );
}
