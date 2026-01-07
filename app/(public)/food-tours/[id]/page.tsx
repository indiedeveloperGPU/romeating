"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Clock, 
  MapPin, 
  Users, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

export default function TourDetailPage() {
  // STATO DEL WIDGET DI PRENOTAZIONE
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [isBooking, setIsBooking] = useState(false);

  // DATI MOCK DEL TOUR (Statici per la demo)
  const TOUR = {
    title: "Street Food Tour Trastevere",
    price: 45, // Prezzo base
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
    description: "Immergiti nel cuore pulsante di Roma. Un percorso di 3 ore tra i vicoli storici, assaggiando il meglio dello street food romano: dal supplì fumante alla pizza al taglio, fino al classico maritozzo.",
    highlights: [
      "5 Degustazioni incluse",
      "Guida locale esperta",
      "Piccoli gruppi (max 10 persone)",
      "Cancellazione gratuita fino a 24h prima"
    ]
  };

  // DATI MOCK CALENDARIO (Gennaio 2026)
  // Simuliamo giorni pieni (sold out) per realismo
  const DAYS = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    available: ![5, 12, 18, 25].includes(i + 1), // Alcuni giorni a caso non disponibili
    price: i + 1 === 15 ? 55 : 45 // Simulazione dynamic pricing (es. weekend costa di più)
  }));

  const TIME_SLOTS = ["10:30", "17:00", "19:00"];

  const totalPrice = (selectedDate === 15 ? 55 : TOUR.price) * guests;

  const handleBooking = () => {
    setIsBooking(true);
    // Simulazione ritardo di rete prima di andare a Stripe
    setTimeout(() => {
      alert("Reindirizzamento a Stripe Checkout in corso...");
      setIsBooking(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      
      {/* HEADER IMMAGINE FULL WIDTH */}
      <div className="relative h-[50vh] w-full bg-stone-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${TOUR.image})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-900 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12">
          <div className="mx-auto max-w-7xl">
            <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
              Best Seller
            </span>
            <h1 className="font-serif text-4xl font-bold text-white sm:text-6xl text-shadow-lg">
              {TOUR.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-6 text-stone-200 font-medium">
              <div className="flex items-center gap-2">
                <Clock size={20} /> 3 Ore
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} /> Trastevere, Roma
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} /> Max 10 pax
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* COLONNA SINISTRA: DETTAGLI (2/3) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Descrizione */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">L&apos;Esperienza</h2>
              <p className="text-lg text-stone-600 leading-relaxed">
                {TOUR.description}
              </p>
              
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {TOUR.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm border border-stone-100">
                    <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
                    <span className="text-stone-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Esempio Itinerario (Timeline Semplice) */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Cosa Assaggeremo</h2>
              <div className="space-y-6 border-l-2 border-primary/20 pl-6 ml-2">
                <div className="relative">
                  <div className="absolute -left-7.75 top-1 h-4 w-4 rounded-full bg-primary border-4 border-stone-50" />
                  <h3 className="font-bold text-foreground">Il Forno Storico</h3>
                  <p className="text-stone-600">Pizza bianca con mortadella appena sfornata.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-7.75 top-1 h-4 w-4 rounded-full bg-primary border-4 border-stone-50" />
                  <h3 className="font-bold text-foreground">Re del Supplì</h3>
                  <p className="text-stone-600">Il classico supplì al telefono, fritto alla perfezione.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-7.75 top-1 h-4 w-4 rounded-full bg-primary border-4 border-stone-50" />
                  <h3 className="font-bold text-foreground">La Pasticceria</h3>
                  <p className="text-stone-600">Conclusione dolce con maritozzo artigianale.</p>
                </div>
              </div>
            </section>

          </div>

          {/* COLONNA DESTRA: WIDGET PRENOTAZIONE (Sticky) */}
          <div className="relative">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-stone-200">
              
              <div className="mb-6 flex items-baseline justify-between border-b border-stone-100 pb-4">
                <span className="text-stone-500">A partire da</span>
                <span className="font-serif text-3xl font-bold text-primary">€{TOUR.price}</span>
              </div>

              {/* 1. SELEZIONE DATA (Calendario Mock) */}
              <div className="mb-6">
                <label className="mb-3 text-sm font-bold text-foreground flex justify-between">
                  Seleziona una data
                  <span className="text-stone-400 font-normal">Gennaio 2026</span>
                </label>
                
                {/* Header Giorni */}
                <div className="grid grid-cols-7 text-center text-xs text-stone-400 mb-2">
                  <span>L</span><span>M</span><span>M</span><span>G</span><span>V</span><span>S</span><span>D</span>
                </div>
                
                {/* Griglia Giorni */}
                <div className="grid grid-cols-7 gap-1">
                  {DAYS.map((d) => (
                    <button
                      key={d.day}
                      disabled={!d.available}
                      onClick={() => { setSelectedDate(d.day); setSelectedTime(null); }}
                      className={`
                        relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm font-medium transition-all
                        ${!d.available 
                          ? "cursor-not-allowed bg-stone-100 text-stone-300 decoration-stone-400" 
                          : selectedDate === d.day
                            ? "bg-primary text-white shadow-md scale-105 z-10"
                            : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-100"
                        }
                      `}
                    >
                      <span className={!d.available ? "line-through" : ""}>{d.day}</span>
                      {/* Pallino disponibilità */}
                      {d.available && selectedDate !== d.day && (
                        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-green-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. SELEZIONE ORARIO (Mostra solo se data selezionata) */}
              {selectedDate && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6"
                >
                  <label className="mb-3 block text-sm font-bold text-foreground">Orario di partenza</label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`rounded-lg border px-2 py-2 text-sm font-semibold transition-all
                          ${selectedTime === time 
                            ? "border-primary bg-primary/5 text-primary ring-1 ring-primary" 
                            : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                          }
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 3. OSPITI */}
              <div className="mb-8">
                <label className="mb-3 block text-sm font-bold text-foreground">Ospiti</label>
                <div className="flex items-center justify-between rounded-lg border border-stone-200 p-3">
                  <span className="text-sm font-medium text-stone-600">Adulti</span>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="h-8 w-8 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200"
                    >
                      -
                    </button>
                    <span className="w-4 text-center font-bold">{guests}</span>
                    <button 
                      onClick={() => setGuests(guests + 1)}
                      className="h-8 w-8 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* RIEPILOGO E TOTALE */}
              <div className="rounded-xl bg-stone-50 p-4 mb-6">
                <div className="flex justify-between text-sm text-stone-600 mb-2">
                  <span>{guests} x Adulti</span>
                  <span>€{(selectedDate === 15 ? 55 : TOUR.price) * guests}</span>
                </div>
                {selectedDate && selectedTime && (
                  <div className="flex justify-between text-sm text-stone-600 mb-2">
                    <span>Data</span>
                    <span>{selectedDate} Gen, {selectedTime}</span>
                  </div>
                )}
                <div className="mt-4 flex justify-between border-t border-stone-200 pt-4 text-lg font-bold text-foreground">
                  <span>Totale</span>
                  <span>€{totalPrice}</span>
                </div>
              </div>

              {/* CTA PRENOTA */}
              <button
                disabled={!selectedDate || !selectedTime || isBooking}
                onClick={handleBooking}
                className={`w-full rounded-xl py-4 text-base font-bold text-white shadow-lg transition-all
                  ${!selectedDate || !selectedTime 
                    ? "bg-stone-300 cursor-not-allowed" 
                    : "bg-primary hover:bg-red-700 hover:shadow-xl active:scale-95"
                  }
                `}
              >
                {isBooking ? "Elaborazione..." : "Prenota Ora"}
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-stone-500">
                <ShieldCheck size={14} />
                <span>Pagamento sicuro con Stripe</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
