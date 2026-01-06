"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ShoppingBag, Map, Home as HomeIcon, Info } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", name: "Home", icon: HomeIcon },
  { path: "/prodotti", name: "Shop", icon: ShoppingBag }, 
  { path: "/food-tours", name: "Food Tours", icon: Map },
  { path: "/contatti", name: "Contatti", icon: Info }, 
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="font-serif text-2xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity mr-8"
          onClick={() => setIsOpen(false)}
        >
          Romeating
        </Link>

        {/* Desktop Menu (Pill Style) */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive 
                    ? "text-white" 
                    : "text-foreground hover:bg-stone-100 hover:text-primary"
                }`}
              >
                {/* Sfondo Attivo Animato (Motion) */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ zIndex: -1 }} // Va dietro al testo
                  />
                )}
                
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 text-foreground focus:outline-none hover:bg-stone-100 rounded-full transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white shadow-lg">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link 
                  key={item.path}
                  href={item.path} 
                  onClick={toggleMenu}
                  className={`flex items-center gap-3 rounded-full px-4 py-3 text-base font-medium transition-colors ${
                    isActive 
                      ? "bg-primary text-white shadow-md" 
                      : "text-foreground hover:bg-stone-100"
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
