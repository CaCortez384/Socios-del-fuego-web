"use client";

import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { format, parseISO, isAfter } from 'date-fns';
import { LogOut, Calendar, ShieldCheck, Trash2, User, FileText, Eye, Upload, Utensils } from 'lucide-react';
import { getAuth, signOut } from "firebase/auth";
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PLANS } from '@/lib/plans';
import AdminPlansEditor from './AdminPlansEditor';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es);

export default function AdminDashboard({ bookedDates, bookedDetails, toggleDateLock }) {
  const auth = getAuth();
  const [activeTab, setActiveTab] = useState('fechas'); // 'fechas' | 'planes'
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [clientName, setClientName] = useState('');
  const [clientNote, setClientNote] = useState('');

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
    openDetailModal(dateStr);
  };

  const openDetailModal = (dateStr) => {
    setSelectedDate(dateStr);
    
    if (bookedDetails && bookedDetails[dateStr]) {
        setClientName(bookedDetails[dateStr].clientName || '');
        setClientNote(bookedDetails[dateStr].note || '');
    } else {
        setClientName('');
        setClientNote('');
    }
  };

  const saveBlock = () => {
    if (!selectedDate) return;
    toggleDateLock(selectedDate, { 
        clientName: clientName || 'Bloqueo Rápido', 
        note: clientNote || '' 
    });
    closeModal();
  };

  const deleteBlock = () => {
    if (!selectedDate) return;
    toggleDateLock(selectedDate);
    closeModal();
  };

  const closeModal = () => {
    setSelectedDate(null);
    setClientName('');
    setClientNote('');
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8 pb-10 relative">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-stone-900/80 p-5 rounded-2xl border border-stone-800 backdrop-blur-sm shadow-xl gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-600/20 rounded-xl text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Panel de Control</h2>
            <div className="flex items-center gap-2 text-stone-400 text-xs font-mono mt-1">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> 
               <span className="capitalize">Hola, {auth.currentUser?.email?.split('@')[0]}</span>
            </div>
          </div>
        </div>
        
        {/* TABS NAVEGACIÓN */}
        <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800 self-stretch md:self-auto">
          <button 
            onClick={() => setActiveTab('fechas')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'fechas' ? 'bg-stone-800 text-white shadow-md' : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'}`}
          >
            <Calendar size={16} className={activeTab === 'fechas' ? 'text-orange-500' : ''} /> Fechas
          </button>
          <button 
            onClick={() => setActiveTab('planes')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'planes' ? 'bg-stone-800 text-white shadow-md' : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'}`}
          >
            <Utensils size={16} className={activeTab === 'planes' ? 'text-orange-500' : ''} /> Planes
          </button>
        </div>

        <div className="flex gap-2 self-stretch md:self-auto justify-end">
          <button onClick={handleMigration} title="Forzar Subida de lib/plans.js a Firestore" className="group bg-orange-600/10 hover:bg-orange-600/20 text-orange-600 p-3 rounded-xl flex items-center justify-center transition-all border border-orange-600/20">
            <Upload size={18} />
          </button>
          <button onClick={handleLogout} className="flex-1 md:flex-none group bg-stone-800 hover:bg-red-900/30 text-stone-300 hover:text-red-400 px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all border border-stone-700">
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </div>

      {activeTab === 'fechas' ? (
        <div className="grid md:grid-cols-2 gap-8">
        
        {/* COLUMNA 1: CALENDARIO */}
        <div className="space-y-4 flex flex-col items-center md:block">
            <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 w-full">
                <Calendar size={14} className="text-orange-500"/> Calendario Maestro
            </h3>
            
            <div className="p-2 md:p-6 bg-stone-900 rounded-2xl border border-stone-800 flex justify-center shadow-2xl relative overflow-hidden w-full max-w-[360px] md:max-w-none mx-auto">
                 <style>{`
                    .react-datepicker { font-family: inherit; background-color: transparent; border: none; display: flex; justify-content: center; }
                    .react-datepicker__header { background-color: transparent; border-bottom: none; }
                    .react-datepicker__current-month { color: #f5f5f4; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem; text-transform: capitalize; }
                    .react-datepicker__day-name { color: #57534e; font-weight: bold; width: 2rem; margin: 0.2rem; }
                    .react-datepicker__day { color: #a8a29e; width: 2rem; line-height: 2rem; margin: 0.2rem; transition: all 0.2s; }
                    .react-datepicker__day:hover { background-color: #292524; color: white; border-radius: 50%; }
                    .react-datepicker__day--selected { background-color: transparent; }
                    .admin-blocked-day { background-color: #7f1d1d !important; color: #fca5a5 !important; border-radius: 50%; font-weight: bold; }
                    @media (min-width: 768px) { .react-datepicker__day-name, .react-datepicker__day { width: 2.5rem; line-height: 2.5rem; } }
                `}</style>

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

        {/* COLUMNA 2: LISTA DE EVENTOS */}
        <div className="space-y-4">
             <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest">
                Próximos Eventos ({upcomingBlocks.length})
             </h3>
             <div className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden max-h-[450px] overflow-y-auto custom-scrollbar">
                {upcomingBlocks.length === 0 ? (
                    <div className="p-8 text-center text-stone-500 opacity-50">Calendario despejado</div>
                ) : (
                    <div className="divide-y divide-stone-800/50">
                        {upcomingBlocks.map(dateStr => {
                            const detail = bookedDetails[dateStr] || {};
                            return (
                                <div 
                                    key={dateStr} 
                                    onClick={() => openDetailModal(dateStr)}
                                    className="p-4 flex items-center justify-between hover:bg-stone-800/40 transition-colors group cursor-pointer"
                                >
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <div className="flex flex-col items-center justify-center bg-stone-950 border border-stone-800 w-12 h-12 rounded-lg shrink-0 group-hover:border-orange-500/30 transition-colors">
                                            <span className="text-[10px] text-red-500 font-bold uppercase">{format(parseISO(dateStr), "MMM", { locale: es })}</span>
                                            <span className="text-lg font-bold text-white leading-none">{format(parseISO(dateStr), "dd")}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-stone-200 text-sm font-bold capitalize truncate">
                                                {detail.clientName || 'Bloqueado'}
                                            </p>
                                            <p className="text-stone-500 text-xs truncate">
                                                {detail.note || 'Sin notas'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="text-stone-600 group-hover:text-orange-500 transition-colors p-2">
                                        <Eye size={18} />
                                    </div>
                                </div>
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

      {/* --- MODAL DE GESTIÓN DE FECHA --- */}
      {selectedDate && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-stone-900 border border-stone-700 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5">
                
                <div className="border-b border-stone-800 pb-4">
                    <h3 className="text-xl font-bold text-white capitalize flex items-center gap-2">
                        <Calendar className="text-orange-500" size={20}/>
                        {format(parseISO(selectedDate), "EEEE d 'de' MMMM", { locale: es })}
                    </h3>
                </div>

                {bookedDates.includes(selectedDate) ? (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-stone-500 font-bold uppercase flex items-center gap-2 mb-1">
                                    <User size={12}/> Cliente
                                </label>
                                <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 text-white font-medium text-lg">
                                    {clientName || 'Sin nombre registrado'}
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-xs text-stone-500 font-bold uppercase flex items-center gap-2 mb-1">
                                    <FileText size={12}/> Detalles / Notas
                                </label>
                                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-stone-300 text-sm whitespace-pre-wrap leading-relaxed max-h-[200px] overflow-y-auto custom-scrollbar">
                                    {clientNote || 'No hay detalles adicionales para este evento.'}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button onClick={closeModal} className="flex-1 bg-stone-800 hover:bg-stone-700 text-white py-3.5 rounded-xl font-bold transition-colors">
                                Cerrar
                            </button>
                            <button onClick={deleteBlock} className="flex-1 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                <Trash2 size={18}/> Eliminar Evento
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs text-stone-500 font-bold uppercase">Nombre Cliente / Razón</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-stone-600 w-4 h-4"/>
                                <input autoFocus type="text" placeholder="Ej: Juan Pérez" className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 pl-9 text-white focus:border-orange-500 outline-none" 
                                    value={clientName} onChange={e => setClientName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-stone-500 font-bold uppercase">Nota / Teléfono</label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 text-stone-600 w-4 h-4"/>
                                <textarea 
                                    placeholder="Ej: Plan Premium para 40 personas. Tel: +569..." 
                                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 pl-9 text-white focus:border-orange-500 outline-none min-h-[100px] resize-none"
                                    value={clientNote} onChange={e => setClientNote(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <button onClick={closeModal} className="flex-1 text-stone-500 hover:text-white py-3">Cancelar</button>
                            <button onClick={saveBlock} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-900/20">
                                Bloquear Fecha
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      )}

    </div>
  );
}
