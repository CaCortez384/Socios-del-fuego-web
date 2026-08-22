"use client";

import { useState, useMemo } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { format, parseISO, isAfter } from 'date-fns';
import { LogOut, Calendar, ShieldCheck, Trash2, User, FileText, Eye, Upload, Utensils, Users, MapPin, Phone, Tag, ChevronDown, ChevronUp, DollarSign, Hash, PartyPopper, X } from 'lucide-react';
import { getAuth, signOut } from "firebase/auth";
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PLANS } from '@/lib/plans';
import AdminPlansEditor from './AdminPlansEditor';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es);

const EVENT_TYPES = [
  { value: '', label: 'Seleccionar (opcional)' },
  { value: 'cumpleanos', label: '🎂 Cumpleaños' },
  { value: 'matrimonio', label: '💍 Matrimonio' },
  { value: 'corporativo', label: '🏢 Corporativo' },
  { value: 'graduacion', label: '🎓 Graduación' },
  { value: 'aniversario', label: '🥂 Aniversario' },
  { value: 'baby_shower', label: '👶 Baby Shower' },
  { value: 'reunion_familiar', label: '👨‍👩‍👧‍👦 Reunión Familiar' },
  { value: 'otro', label: '📋 Otro' },
];

const CATEGORY_LABELS = {
  full: { label: 'Al Plato', emoji: '🍽️', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  picar: { label: 'Tabla / Picoteo', emoji: '🥩', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
};

function getPlanById(id) {
  return PLANS.find(p => p.id === id) || null;
}

function formatCLP(amount) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(amount);
}

// ─── Stats Banner ───────────────────────────────────────────────
function StatsBanner({ upcomingBlocks, bookedDetails }) {
  const stats = useMemo(() => {
    let totalGuests = 0;
    let totalRevenue = 0;

    upcomingBlocks.forEach(dateStr => {
      const detail = bookedDetails[dateStr] || {};
      const guests = detail.guestCount || 0;
      totalGuests += guests;
      if (detail.planId) {
        const plan = getPlanById(detail.planId);
        if (plan) totalRevenue += guests * plan.pricePerPerson;
      }
    });

    return { totalEvents: upcomingBlocks.length, totalGuests, totalRevenue };
  }, [upcomingBlocks, bookedDetails]);

  return (
    <div className="grid grid-cols-3 gap-2 w-full min-w-0">
      <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-2.5 sm:p-4 text-center min-w-0 flex flex-col items-center justify-center">
        <Calendar size={14} className="mx-auto text-orange-500 mb-1" />
        <p className="text-xl sm:text-2xl font-black text-white">{stats.totalEvents}</p>
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500">Eventos</span>
      </div>
      <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-2.5 sm:p-4 text-center min-w-0 flex flex-col items-center justify-center">
        <Users size={14} className="mx-auto text-sky-500 mb-1 shrink-0" />
        <p className="text-xl sm:text-2xl font-black text-white">{stats.totalGuests}</p>
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500">Comensales</span>
      </div>
      <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-2.5 sm:p-4 text-center min-w-0 flex flex-col items-center justify-center">
        <DollarSign size={14} className="mx-auto text-green-500 mb-1 shrink-0" />
        <p className="text-sm sm:text-lg font-black text-white leading-tight truncate w-full">{stats.totalRevenue > 0 ? formatCLP(stats.totalRevenue) : '—'}</p>
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500">Estimado</span>
      </div>
    </div>
  );
}

// ─── Event Card ─────────────────────────────────────────────────
function EventCard({ dateStr, detail, onClick }) {
  const plan = detail.planId ? getPlanById(detail.planId) : null;
  const catInfo = detail.planCategory ? CATEGORY_LABELS[detail.planCategory] : null;
  const eventLabel = detail.eventType ? EVENT_TYPES.find(e => e.value === detail.eventType)?.label : null;

  return (
    <div
      onClick={onClick}
      className="p-3 sm:p-4 flex items-start gap-3 hover:bg-stone-800/40 transition-colors group cursor-pointer active:bg-stone-800/60"
    >
      {/* Date Badge */}
      <div className="flex flex-col items-center justify-center bg-stone-950 border border-stone-800 w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl shrink-0 group-hover:border-orange-500/30 transition-colors">
        <span className="text-[9px] sm:text-[10px] text-red-500 font-bold uppercase">{format(parseISO(dateStr), "MMM", { locale: es })}</span>
        <span className="text-base sm:text-xl font-black text-white leading-none">{format(parseISO(dateStr), "dd")}</span>
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-stone-100 text-[13px] sm:text-sm font-bold capitalize truncate">
          {detail.clientName || 'Bloqueado'}
        </p>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-1">
          {plan && catInfo && (
            <span className={`inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md ${catInfo.bg} ${catInfo.border} border ${catInfo.color}`}>
              {catInfo.emoji} {plan.name}
            </span>
          )}
          {detail.guestCount && (
            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <Users size={9} /> {detail.guestCount}
            </span>
          )}
          {eventLabel && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-400">
              {eventLabel}
            </span>
          )}
        </div>

        {/* Estimated price */}
        {plan && detail.guestCount && (
          <p className="text-[10px] sm:text-[11px] text-stone-500">
            Est. {formatCLP(detail.guestCount * plan.pricePerPerson)}
          </p>
        )}

        {!plan && !detail.guestCount && (
          <p className="text-stone-600 text-xs truncate">
            {detail.note || 'Sin detalles'}
          </p>
        )}
      </div>

      <div className="text-stone-600 group-hover:text-orange-500 transition-colors p-1 sm:p-2 mt-1 shrink-0">
        <Eye size={16} />
      </div>
    </div>
  );
}

// ─── Plan Selector ──────────────────────────────────────────────
function PlanSelector({ selectedPlanId, selectedCategory, onSelect }) {
  const [expandedCat, setExpandedCat] = useState(selectedCategory || 'full');

  const fullPlans = PLANS.filter(p => p.category === 'full');
  const picarPlans = PLANS.filter(p => p.category === 'picar');

  const categories = [
    { key: 'full', plans: fullPlans, ...CATEGORY_LABELS.full },
    { key: 'picar', plans: picarPlans, ...CATEGORY_LABELS.picar },
  ];

  return (
    <div className="space-y-3">
      <label className="text-xs text-stone-500 font-bold uppercase flex items-center gap-2">
        <Utensils size={12} /> Plan & Categoría
      </label>

      {categories.map(cat => (
        <div key={cat.key} className="space-y-2">
          <button
            type="button"
            onClick={() => setExpandedCat(expandedCat === cat.key ? null : cat.key)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold transition-all border ${
              expandedCat === cat.key
                ? `${cat.bg} ${cat.border} ${cat.color}`
                : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
            }`}
          >
            <span>{cat.emoji} {cat.label}</span>
            {expandedCat === cat.key ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {expandedCat === cat.key && (
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
              {cat.plans.map(plan => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => onSelect(plan.id, cat.key)}
                    className={`relative text-left p-2 sm:p-3 rounded-xl border transition-all text-[11px] sm:text-xs active:scale-[0.97] ${
                      isSelected
                        ? 'bg-orange-600/15 border-orange-500/50 ring-1 ring-orange-500/30'
                        : 'bg-stone-950 border-stone-800 hover:border-stone-600'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
                    )}
                    <p className={`font-bold truncate ${isSelected ? 'text-white' : 'text-stone-300'}`}>{plan.name}</p>
                    <p className="text-stone-500 mt-0.5">{formatCLP(plan.pricePerPerson)}/pp</p>
                    <p className="text-stone-600 mt-0.5 hidden sm:block">{plan.totalWeight}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── View Modal ─────────────────────────────────────────────────
function ViewEventModal({ dateStr, detail, onClose, onDelete }) {
  const plan = detail.planId ? getPlanById(detail.planId) : null;
  const catInfo = detail.planCategory ? CATEGORY_LABELS[detail.planCategory] : null;
  const eventLabel = detail.eventType ? EVENT_TYPES.find(e => e.value === detail.eventType)?.label : null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div className="bg-stone-900 border-t sm:border border-stone-700 w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="relative px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-stone-800 shrink-0">
          {/* Mobile drag handle */}
          <div className="w-10 h-1 bg-stone-700 rounded-full mx-auto mb-3 sm:hidden" />
          <button onClick={onClose} className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors p-1">
            <X size={18} />
          </button>
          <h3 className="text-base sm:text-xl font-bold text-white capitalize flex items-center gap-2 pr-8">
            <Calendar className="text-orange-500 shrink-0" size={18} />
            {format(parseISO(dateStr), "EEEE d 'de' MMMM", { locale: es })}
          </h3>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5 overflow-y-auto custom-scrollbar flex-1 overscroll-contain">

          {/* Client Name */}
          <div>
            <label className="text-[10px] text-stone-500 font-bold uppercase flex items-center gap-1.5 mb-1.5">
              <User size={10} /> Cliente
            </label>
            <p className="text-white font-semibold text-lg">{detail.clientName || 'Sin nombre'}</p>
          </div>

          {/* Plan & Category */}
          {plan && catInfo && (
            <div>
              <label className="text-[10px] text-stone-500 font-bold uppercase flex items-center gap-1.5 mb-1.5">
                <Utensils size={10} /> Plan
              </label>
              <div className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border ${catInfo.bg} ${catInfo.border}`}>
                <div className="text-xl sm:text-2xl">{catInfo.emoji}</div>
                <div className="min-w-0 flex-1">
                  <p className={`font-bold text-xs sm:text-sm ${catInfo.color} truncate`}>{plan.name}</p>
                  <p className="text-stone-500 text-[10px] sm:text-xs">{catInfo.label} · {plan.totalWeight}</p>
                </div>
                <div className="ml-auto text-right shrink-0">
                  <p className="text-white font-bold text-xs sm:text-sm">{formatCLP(plan.pricePerPerson)}</p>
                  <p className="text-stone-500 text-[9px] sm:text-[10px]">por persona</p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Row */}
          {(detail.guestCount || eventLabel) && (
            <div className="grid grid-cols-2 gap-3">
              {detail.guestCount && (
                <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 text-center">
                  <p className="text-[10px] text-stone-500 font-bold uppercase mb-1">Comensales</p>
                  <p className="text-xl font-black text-white">{detail.guestCount}</p>
                </div>
              )}
              {eventLabel && (
                <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 text-center">
                  <p className="text-[10px] text-stone-500 font-bold uppercase mb-1">Evento</p>
                  <p className="text-sm font-bold text-white">{eventLabel}</p>
                </div>
              )}
            </div>
          )}

          {/* Estimated Total */}
          {plan && detail.guestCount && (
            <div className="bg-gradient-to-r from-green-900/20 to-stone-900 border border-green-800/30 rounded-xl p-3 sm:p-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <DollarSign className="text-green-500 shrink-0" size={16} />
                <span className="text-xs sm:text-sm text-stone-400 font-medium">Total Estimado</span>
              </div>
              <span className="text-base sm:text-lg font-black text-green-400 shrink-0">{formatCLP(detail.guestCount * plan.pricePerPerson)}</span>
            </div>
          )}

          {/* Contact Info */}
          {(detail.phone || detail.location) && (
            <div className="space-y-3">
              {detail.phone && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={14} className="text-stone-500 shrink-0" />
                    <a href={`tel:${detail.phone}`} className="text-sky-400 hover:underline">{detail.phone}</a>
                  </div>
                  <a
                    href={`https://wa.me/${detail.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-all bg-green-600/15 hover:bg-green-600/25 text-green-400 border border-green-600/30 hover:border-green-500/50"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Contactar por WhatsApp
                  </a>
                </div>
              )}
              {detail.location && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={14} className="text-stone-500 shrink-0" />
                  <span className="text-stone-300">{detail.location}</span>
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          {detail.note && (
            <div>
              <label className="text-[10px] text-stone-500 font-bold uppercase flex items-center gap-1.5 mb-1.5">
                <FileText size={10} /> Notas
              </label>
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 text-stone-400 text-sm whitespace-pre-wrap leading-relaxed">
                {detail.note}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-stone-800 flex gap-2 sm:gap-3 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button onClick={onClose} className="flex-1 bg-stone-800 hover:bg-stone-700 text-white py-3 rounded-xl font-bold transition-colors text-sm sm:text-base">
            Cerrar
          </button>
          <button onClick={onDelete} className="flex-1 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base">
            <Trash2 size={16} /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Create Modal ───────────────────────────────────────────────
function CreateEventModal({ dateStr, onClose, onSave }) {
  const [clientName, setClientName] = useState('');
  const [planId, setPlanId] = useState('');
  const [planCategory, setPlanCategory] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [eventType, setEventType] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [showOptional, setShowOptional] = useState(false);

  const selectedPlan = planId ? getPlanById(planId) : null;
  const guests = parseInt(guestCount) || 0;

  const handleSave = () => {
    const data = {
      clientName: clientName || 'Bloqueo Rápido',
      note: note || '',
    };
    if (planId) data.planId = planId;
    if (planCategory) data.planCategory = planCategory;
    if (guests > 0) data.guestCount = guests;
    if (phone) data.phone = `+56${phone.replace(/\D/g, '')}`;
    if (eventType) data.eventType = eventType;
    if (location) data.location = location;

    onSave(dateStr, data);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div className="bg-stone-900 border-t sm:border border-stone-700 w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="relative px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-stone-800 shrink-0">
          {/* Mobile drag handle */}
          <div className="w-10 h-1 bg-stone-700 rounded-full mx-auto mb-3 sm:hidden" />
          <button onClick={onClose} className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors p-1">
            <X size={18} />
          </button>
          <h3 className="text-base sm:text-xl font-bold text-white capitalize flex items-center gap-2 pr-8">
            <Calendar className="text-orange-500 shrink-0" size={18} />
            {format(parseISO(dateStr), "EEEE d 'de' MMMM", { locale: es })}
          </h3>
          <p className="text-stone-500 text-xs mt-1">Nuevo evento</p>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5 overflow-y-auto custom-scrollbar flex-1 overscroll-contain">

          {/* Client Name */}
          <div className="space-y-1.5">
            <label className="text-xs text-stone-500 font-bold uppercase flex items-center gap-1.5">
              <User size={12} /> Nombre Cliente
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-stone-600 w-4 h-4" />
              <input
                autoFocus
                type="text"
                placeholder="Ej: Juan Pérez"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 pl-9 text-white focus:border-orange-500 outline-none transition-colors"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
              />
            </div>
          </div>

          {/* Plan Selector */}
          <PlanSelector
            selectedPlanId={planId}
            selectedCategory={planCategory}
            onSelect={(id, cat) => { setPlanId(id); setPlanCategory(cat); }}
          />

          {/* Guest Count */}
          <div className="space-y-1.5">
            <label className="text-xs text-stone-500 font-bold uppercase flex items-center gap-1.5">
              <Users size={12} /> Número de Comensales
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-3 text-stone-600 w-4 h-4" />
              <input
                type="number"
                min="1"
                max="500"
                placeholder="Ej: 40"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 pl-9 text-white focus:border-orange-500 outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={guestCount}
                onChange={e => setGuestCount(e.target.value)}
              />
            </div>
          </div>

          {/* Live Price Preview */}
          {selectedPlan && guests > 0 && (
            <div className="bg-gradient-to-r from-orange-900/15 to-stone-900 border border-orange-600/20 rounded-xl p-3 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
              <div>
                <p className="text-xs text-stone-400">{selectedPlan.name} × {guests} personas</p>
              </div>
              <p className="text-lg font-black text-orange-400">{formatCLP(guests * selectedPlan.pricePerPerson)}</p>
            </div>
          )}

          {/* Optional Fields Toggle */}
          <button
            type="button"
            onClick={() => setShowOptional(!showOptional)}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-300 transition-colors py-2"
          >
            {showOptional ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showOptional ? 'Ocultar campos opcionales' : 'Mostrar campos opcionales'}
          </button>

          {showOptional && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Event Type */}
              <div className="space-y-1.5">
                <label className="text-xs text-stone-500 font-bold uppercase flex items-center gap-1.5">
                  <PartyPopper size={12} /> Tipo de Evento
                </label>
                <select
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-white focus:border-orange-500 outline-none transition-colors appearance-none cursor-pointer"
                  value={eventType}
                  onChange={e => setEventType(e.target.value)}
                >
                  {EVENT_TYPES.map(et => (
                    <option key={et.value} value={et.value}>{et.label}</option>
                  ))}
                </select>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs text-stone-500 font-bold uppercase flex items-center gap-1.5">
                  <Phone size={12} /> Teléfono
                </label>
                <div className="flex items-center gap-0">
                  <span className="shrink-0 bg-stone-800 border border-stone-700 border-r-0 rounded-l-xl px-3 py-3 text-stone-400 text-sm font-bold select-none">+56</span>
                  <input
                    type="tel"
                    placeholder="9 1234 5678"
                    maxLength={11}
                    className="w-full bg-stone-950 border border-stone-800 rounded-r-xl p-3 text-white focus:border-orange-500 outline-none transition-colors"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs text-stone-500 font-bold uppercase flex items-center gap-1.5">
                  <MapPin size={12} /> Ubicación
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-stone-600 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Ej: Las Condes, Santiago"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 pl-9 text-white focus:border-orange-500 outline-none transition-colors"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs text-stone-500 font-bold uppercase flex items-center gap-1.5">
                  <FileText size={12} /> Notas
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-stone-600 w-4 h-4" />
                  <textarea
                    placeholder="Detalles adicionales del evento..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 pl-9 text-white focus:border-orange-500 outline-none min-h-[80px] resize-none transition-colors"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-stone-800 flex gap-2 sm:gap-3 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button onClick={onClose} className="flex-1 text-stone-500 hover:text-white py-3 font-medium transition-colors text-sm sm:text-base">
            Cancelar
          </button>
          <button onClick={handleSave} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-900/20 transition-all text-sm sm:text-base active:scale-[0.97]">
            Bloquear Fecha
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────
export default function AdminDashboard({ bookedDates, bookedDetails, toggleDateLock }) {
  const auth = getAuth();
  const [activeTab, setActiveTab] = useState('fechas');
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'create' | 'view'

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleMigration = async () => {
    if(!confirm("¿Seguro que deseas sobrescribir Firestore con los planes actuales del archivo local?")) return;
    try {
        const plansCollection = collection(db, "plans");
        for (const plan of PLANS) {
            const docRef = doc(plansCollection, plan.id);
            await setDoc(docRef, plan);
        }
        alert("¡Migración completada exitosamente! Los planes ya están en Firestore.");
    } catch (e) {
        alert("Error en migración: " + e.message);
    }
  };

  const upcomingBlocks = bookedDates
    .filter(dateStr => isAfter(parseISO(dateStr), new Date().setDate(new Date().getDate() - 1)))
    .sort();

  const handleDateClick = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    if (bookedDates.includes(dateStr)) {
      setSelectedDate(dateStr);
      setModalMode('view');
    } else {
      setSelectedDate(dateStr);
      setModalMode('create');
    }
  };

  const openDetailModal = (dateStr) => {
    if (bookedDates.includes(dateStr)) {
      setSelectedDate(dateStr);
      setModalMode('view');
    } else {
      setSelectedDate(dateStr);
      setModalMode('create');
    }
  };

  const handleSaveEvent = (dateStr, data) => {
    toggleDateLock(dateStr, data);
    closeModal();
  };

  const handleDeleteEvent = () => {
    if (!selectedDate) return;
    toggleDateLock(selectedDate);
    closeModal();
  };

  const closeModal = () => {
    setSelectedDate(null);
    setModalMode(null);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-5 sm:space-y-8 pb-10 relative overflow-hidden min-w-0">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-stone-900/80 p-3 sm:p-5 rounded-2xl border border-stone-800 backdrop-blur-sm shadow-xl gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-red-600/20 rounded-xl text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">Panel de Control</h2>
            <div className="flex items-center gap-2 text-stone-400 text-xs font-mono mt-0.5 sm:mt-1">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> 
               <span className="capitalize">Hola, {auth.currentUser?.email?.split('@')[0]}</span>
            </div>
          </div>
        </div>
        
        {/* TABS NAVEGACIÓN */}
        <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800 self-stretch md:self-auto">
          <button 
            onClick={() => setActiveTab('fechas')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === 'fechas' ? 'bg-stone-800 text-white shadow-md' : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'}`}
          >
            <Calendar size={15} className={activeTab === 'fechas' ? 'text-orange-500' : ''} /> Fechas
          </button>
          <button 
            onClick={() => setActiveTab('planes')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === 'planes' ? 'bg-stone-800 text-white shadow-md' : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'}`}
          >
            <Utensils size={15} className={activeTab === 'planes' ? 'text-orange-500' : ''} /> Planes
          </button>
        </div>

        <div className="flex gap-2 self-stretch md:self-auto justify-end">
          <button onClick={handleMigration} title="Forzar Subida de lib/plans.js a Firestore" className="group bg-orange-600/10 hover:bg-orange-600/20 text-orange-600 p-2.5 sm:p-3 rounded-xl flex items-center justify-center transition-all border border-orange-600/20">
            <Upload size={16} />
          </button>
          <button onClick={handleLogout} className="flex-1 md:flex-none group bg-stone-800 hover:bg-red-900/30 text-stone-300 hover:text-red-400 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border border-stone-700">
            <LogOut size={16} /> Salir
          </button>
        </div>
      </div>

      {activeTab === 'fechas' ? (
        <div className="grid md:grid-cols-2 gap-5 sm:gap-8 w-full min-w-0">
        
        {/* COLUMNA 1: CALENDARIO */}
        <div className="space-y-4 flex flex-col items-center md:block min-w-0 w-full">
            <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 w-full">
                <Calendar size={14} className="text-orange-500"/> Calendario Maestro
            </h3>
            
            <div className="bg-stone-900 rounded-2xl border border-stone-800 shadow-2xl relative w-full mx-auto" style={{ contain: 'content' }}>
                 <style>{`
                    .admin-cal-wrap { overflow: hidden; display: flex; justify-content: center; padding: 0.5rem; }
                    .admin-cal-wrap .react-datepicker-wrapper,
                    .admin-cal-wrap .react-datepicker__input-container,
                    .admin-cal-wrap .react-datepicker { width: 100% !important; max-width: 100% !important; }
                    .admin-cal-wrap .react-datepicker { font-family: inherit; background-color: transparent; border: none; display: flex !important; justify-content: center; overflow: hidden; }
                    .admin-cal-wrap .react-datepicker__month-container { max-width: 100% !important; overflow: hidden; }
                    .admin-cal-wrap .react-datepicker__header { background-color: transparent; border-bottom: none; padding-top: 0.5rem; }
                    .admin-cal-wrap .react-datepicker__current-month { color: #f5f5f4; font-weight: 700; margin-bottom: 0.75rem; font-size: 1rem; text-transform: capitalize; }
                    .admin-cal-wrap .react-datepicker__navigation { top: 0.6rem; z-index: 1; overflow: hidden; width: 2rem; height: 2rem; }
                    .admin-cal-wrap .react-datepicker__navigation-icon { font-size: 0 !important; color: transparent !important; }
                    .admin-cal-wrap .react-datepicker__navigation-icon::before { border-color: #a8a29e; content: ''; display: block; width: 9px; height: 9px; border-width: 2px 2px 0 0; }
                    .admin-cal-wrap .react-datepicker__navigation--previous { left: 0.5rem; }
                    .admin-cal-wrap .react-datepicker__navigation--next { right: 0.5rem; }
                    .admin-cal-wrap .react-datepicker__day-names,
                    .admin-cal-wrap .react-datepicker__week { display: flex !important; justify-content: center; }
                    .admin-cal-wrap .react-datepicker__day-name { color: #57534e; font-weight: bold; width: calc((100vw - 5rem) / 7); max-width: 2.5rem; height: 2rem; display: flex; align-items: center; justify-content: center; margin: 1px; font-size: 0.7rem; }
                    .admin-cal-wrap .react-datepicker__day { color: #a8a29e; width: calc((100vw - 5rem) / 7); max-width: 2.5rem; height: calc((100vw - 5rem) / 7); max-height: 2.5rem; display: flex !important; align-items: center; justify-content: center; margin: 1px; transition: all 0.2s; font-size: 0.8rem; box-sizing: border-box; }
                    .admin-cal-wrap .react-datepicker__day:hover { background-color: #292524; color: white; border-radius: 50%; }
                    .admin-cal-wrap .react-datepicker__day--selected { background-color: transparent; }
                    .admin-cal-wrap .react-datepicker__day--outside-month { opacity: 0.3; }
                    .admin-cal-wrap .admin-blocked-day { background-color: #7f1d1d !important; color: #fca5a5 !important; border-radius: 50%; font-weight: bold; }
                    @media (min-width: 640px) {
                      .admin-cal-wrap { padding: 1rem; }
                      .admin-cal-wrap .react-datepicker__day-name { width: 2.2rem; height: 2.2rem; font-size: 0.75rem; margin: 2px; }
                      .admin-cal-wrap .react-datepicker__day { width: 2.2rem; height: 2.2rem; margin: 2px; max-width: none; max-height: none; }
                    }
                    @media (min-width: 768px) {
                      .admin-cal-wrap { padding: 1.5rem; }
                      .admin-cal-wrap .react-datepicker__day-name { width: 2.5rem; height: 2.5rem; }
                      .admin-cal-wrap .react-datepicker__day { width: 2.5rem; height: 2.5rem; }
                      .admin-cal-wrap .react-datepicker__current-month { font-size: 1.1rem; }
                    }
                `}
                </style>

                <div className="admin-cal-wrap">
                  <DatePicker 
                      inline
                      locale="es"
                      minDate={new Date()}
                      onChange={handleDateClick}
                      dayClassName={(date) => {
                          const d = format(date, 'yyyy-MM-dd');
                          return bookedDates.includes(d) ? "admin-blocked-day" : "hover:bg-stone-800 rounded-full hover:text-white";
                      }}
                  />
                </div>
            </div>
        </div>

        {/* COLUMNA 2: STATS + LISTA DE EVENTOS */}
        <div className="space-y-3 sm:space-y-4 min-w-0 w-full">
            <h3 className="text-stone-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <PartyPopper size={14} className="text-orange-500"/> Próximos Eventos ({upcomingBlocks.length})
            </h3>

            {/* Stats Banner */}
            <StatsBanner upcomingBlocks={upcomingBlocks} bookedDetails={bookedDetails} />

            {/* Events List */}
            <div className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden max-h-[350px] sm:max-h-[400px] overflow-y-auto custom-scrollbar w-full min-w-0">
               {upcomingBlocks.length === 0 ? (
                   <div className="p-10 text-center">
                     <Calendar size={32} className="mx-auto text-stone-700 mb-3" />
                     <p className="text-stone-500 text-sm">Calendario despejado</p>
                     <p className="text-stone-600 text-xs mt-1">Selecciona una fecha para crear un evento</p>
                   </div>
               ) : (
                   <div className="divide-y divide-stone-800/50">
                       {upcomingBlocks.map(dateStr => {
                           const detail = bookedDetails[dateStr] || {};
                           return (
                             <EventCard
                               key={dateStr}
                               dateStr={dateStr}
                               detail={detail}
                               onClick={() => openDetailModal(dateStr)}
                             />
                           );
                       })}
                   </div>
               )}
            </div>
        </div>
        </div>
      ) : (
        <AdminPlansEditor />
      )}

      {/* --- MODALS --- */}
      {selectedDate && modalMode === 'view' && bookedDetails[selectedDate] && (
        <ViewEventModal
          dateStr={selectedDate}
          detail={bookedDetails[selectedDate]}
          onClose={closeModal}
          onDelete={handleDeleteEvent}
        />
      )}

      {selectedDate && modalMode === 'create' && (
        <CreateEventModal
          dateStr={selectedDate}
          onClose={closeModal}
          onSave={handleSaveEvent}
        />
      )}

    </div>
  );
}
