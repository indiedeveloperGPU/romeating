"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Toaster } from "sonner"; 
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Map, 
  LogOut, 
  Settings 
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Prodotti", href: "/admin/prodotti", icon: ShoppingBag },
    // { name: "Food Tours", href: "/admin/tours", icon: Map }, // Futuro
  ];

  return (
    <div className="flex min-h-screen bg-stone-100">
      
      {/* 2. COMPONENTE TOASTER (Globale per l'admin) */}
      <Toaster position="top-right" richColors closeButton />

      {/* SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-stone-200 bg-white shadow-sm">
        <div className="flex h-16 items-center border-b border-stone-200 px-6">
          <span className="font-serif text-xl font-bold text-foreground">
            Rome<span className="text-primary">ating</span>
            <span className="ml-2 rounded bg-stone-100 px-1.5 py-0.5 text-[10px] uppercase text-stone-500">
              Admin
            </span>
          </span>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                  ${isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-stone-600 hover:bg-stone-50 hover:text-foreground"
                  }
                `}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}

          <div className="my-4 h-px bg-stone-200" />

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={20} />
            Esci
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="ml-64 flex w-full flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-stone-200 bg-white/80 px-8 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-foreground">
            {menuItems.find(i => i.href === pathname)?.name || "Pannello di Controllo"}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-500">Admin User</span>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
