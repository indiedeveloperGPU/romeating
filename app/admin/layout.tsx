"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Toaster } from "sonner";
import {
  LayoutDashboard,
  ShoppingBag,
  Map,
  LogOut,
  Settings,
  Menu, // Aggiunto per mobile
  X,    // Aggiunto per mobile
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  
  // 1. STATO PER GESTIONE SIDEBAR MOBILE
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

     useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSidebarOpen(false);
    }, 0);

    return () => clearTimeout(timeout);
  }, [pathname]); // <-- FONDAMENTALE: Solo [pathname] qui


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

      {/* 3. MOBILE OVERLAY (Visibile solo se aperto e su mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside 
  className={`
    fixed inset-y-0 left-0 z-50 w-64 border-r border-stone-200 bg-white shadow-sm 
    transition-transform duration-300 ease-in-out
    flex flex-col
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    lg:translate-x-0 lg:static lg:inset-auto
  `}
>
  {/* Header (Fisso in alto) */}
  <div className="flex h-16 items-center justify-between border-b border-stone-200 px-6 flex-shrink-0">
    <span className="font-serif text-xl font-bold text-foreground">
      Rome<span className="text-primary">ating</span>
      <span className="ml-2 rounded bg-stone-100 px-1.5 py-0.5 text-[10px] uppercase text-stone-500">
        Admin
      </span>
    </span>
    
    <button 
      onClick={() => setIsSidebarOpen(false)}
      className="rounded-md p-1 text-stone-500 hover:bg-stone-100 lg:hidden"
    >
      <X size={20} />
    </button>
  </div>

  {/* Nav (Occupa spazio rimanente) */}
  <nav className="flex flex-col flex-1 overflow-y-auto">
    <div className="flex flex-col gap-1 p-4">
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
    </div>

    {/* Spacer per spingere Logout in fondo */}
    <div className="flex-1" />

    {/* Logout Button (Ancorato in fondo) */}
    <div className="border-t border-stone-200 p-4">
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        <LogOut size={20} />
        Esci
      </button>
    </div>
  </nav>
</aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex w-full flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-stone-200 bg-white/80 px-4 backdrop-blur-md lg:px-8">
          
          <div className="flex items-center gap-3">
            {/* Bottone Hamburger Menu (Visibile solo su mobile) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-md p-2 text-stone-600 hover:bg-stone-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>

            <h2 className="text-lg font-semibold text-foreground truncate">
              {menuItems.find(i => i.href === pathname)?.name || "Pannello di Controllo"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-stone-500 sm:inline-block">Admin User</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

    </div>
  );
}
