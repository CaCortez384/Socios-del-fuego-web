import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Save, Edit2, X, Plus, Trash2, Beef } from 'lucide-react';
import { usePlans } from '@/hooks/usePlans';

export default function AdminPlansEditor() {
  const { plans, loadingPlans, errorPlans } = usePlans();
  const [editingPlan, setEditingPlan] = useState(null);
  const [saving, setSaving] = useState(false);

  if (loadingPlans) {
    return <div className="text-stone-400 p-8 text-center animate-pulse">Cargando planes...</div>;
  }

  if (errorPlans) {
    return <div className="text-red-400 bg-red-900/20 p-4 rounded-xl">Error: {errorPlans}</div>;
  }

  const handleEditClick = (plan) => {
    // Clona el plan profundamente para no modificar el estado original directamente
    setEditingPlan(JSON.parse(JSON.stringify(plan)));
  };

  const handleArrayChange = (field, subfield, index, value) => {
    setEditingPlan(prev => {
      const updated = { ...prev };
      if (subfield) {
        updated[field][subfield][index] = value;
      } else {
        updated[field][index] = value;
      }
      return updated;
    });
  };

  const handleArrayAdd = (field, subfield) => {
    setEditingPlan(prev => {
      const updated = { ...prev };
      if (subfield) {
        if (!updated[field][subfield]) updated[field][subfield] = [];
        updated[field][subfield].push("");
      } else {
        if (!updated[field]) updated[field] = [];
        updated[field].push("");
      }
      return updated;
    });
  };

  const handleArrayRemove = (field, subfield, index) => {
    setEditingPlan(prev => {
      const updated = { ...prev };
      if (subfield) {
        updated[field][subfield].splice(index, 1);
      } else {
        updated[field].splice(index, 1);
      }
      return updated;
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const docRef = doc(db, "plans", editingPlan.id);
      await setDoc(docRef, editingPlan);
      alert("¡Plan guardado exitosamente!");
      setEditingPlan(null);
      // Opcional: Podríamos recargar la página para que el usePlans hook obtenga la info nueva, 
      // pero en este caso el usuario puede navegar y verá los cambios, o refrescar.
      window.location.reload();
    } catch (e) {
      alert("Error guardando el plan: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  // VISTA DE EDICIÓN
  if (editingPlan) {
    return (
      <div className="bg-stone-900 border border-stone-700 rounded-2xl p-6 shadow-2xl animate-in fade-in space-y-6">
        <div className="flex justify-between items-center border-b border-stone-800 pb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Edit2 className="text-orange-500" size={20} />
            Editando: {editingPlan.name}
          </h3>
          <button onClick={() => setEditingPlan(null)} className="text-stone-400 hover:text-white p-2">
            <X size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* INFO BÁSICA */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase text-stone-500 tracking-wider">Información Básica</h4>
            
            <div className="space-y-2">
              <label className="text-xs text-stone-400 uppercase">Nombre del Plan</label>
              <input type="text" className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-white focus:border-orange-500 outline-none" 
                value={editingPlan.name} onChange={e => setEditingPlan({...editingPlan, name: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-stone-400 uppercase">Precio p/p (Número)</label>
              <input type="number" className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-white focus:border-orange-500 outline-none" 
                value={editingPlan.pricePerPerson} onChange={e => setEditingPlan({...editingPlan, pricePerPerson: Number(e.target.value)})} />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-stone-400 uppercase">Peso Total / Etiqueta</label>
              <input type="text" className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-white focus:border-orange-500 outline-none" 
                value={editingPlan.totalWeight} onChange={e => setEditingPlan({...editingPlan, totalWeight: e.target.value})} />
            </div>
          </div>

          {/* FEATURES PRINCIPALES */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase text-stone-500 tracking-wider flex justify-between items-center">
              Puntos Destacados (Card)
              <button onClick={() => handleArrayAdd('features', null)} className="text-orange-500 hover:text-orange-400 p-1 bg-orange-500/10 rounded-md">
                <Plus size={16} />
              </button>
            </h4>
            
            <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
              {editingPlan.features.map((feat, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" className="flex-1 bg-stone-950 border border-stone-800 rounded-lg p-2 text-sm text-stone-300 focus:border-orange-500 outline-none" 
                    value={feat} onChange={e => handleArrayChange('features', null, i, e.target.value)} />
                  <button onClick={() => handleArrayRemove('features', null, i)} className="text-red-500 hover:text-red-400 p-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* MENU COMPLETO: CARNES */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase text-stone-500 tracking-wider flex justify-between items-center">
              Menú: Carnes
              <button onClick={() => handleArrayAdd('fullMenu', 'carnes')} className="text-orange-500 hover:text-orange-400 p-1 bg-orange-500/10 rounded-md">
                <Plus size={16} />
              </button>
            </h4>
            
            <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
              {(editingPlan.fullMenu.carnes || []).map((feat, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" className="flex-1 bg-stone-950 border border-stone-800 rounded-lg p-2 text-sm text-stone-300 focus:border-orange-500 outline-none" 
                    value={feat} onChange={e => handleArrayChange('fullMenu', 'carnes', i, e.target.value)} />
                  <button onClick={() => handleArrayRemove('fullMenu', 'carnes', i)} className="text-red-500 hover:text-red-400 p-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* MENU COMPLETO: PICOTEO */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase text-stone-500 tracking-wider flex justify-between items-center">
              Menú: Picoteo
              <button onClick={() => handleArrayAdd('fullMenu', 'picoteo')} className="text-orange-500 hover:text-orange-400 p-1 bg-orange-500/10 rounded-md">
                <Plus size={16} />
              </button>
            </h4>
            
            <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
              {(editingPlan.fullMenu.picoteo || []).map((feat, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" className="flex-1 bg-stone-950 border border-stone-800 rounded-lg p-2 text-sm text-stone-300 focus:border-orange-500 outline-none" 
                    value={feat} onChange={e => handleArrayChange('fullMenu', 'picoteo', i, e.target.value)} />
                  <button onClick={() => handleArrayRemove('fullMenu', 'picoteo', i)} className="text-red-500 hover:text-red-400 p-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {!(editingPlan.fullMenu.picoteo || []).length && <p className="text-xs text-stone-600">No incluye picoteo.</p>}
            </div>
          </div>

          {/* MENU COMPLETO: ENSALADAS */}
          <div className="space-y-4 md:col-span-2">
            <h4 className="text-sm font-bold uppercase text-stone-500 tracking-wider flex justify-between items-center">
              Menú: Acompañamientos / Ensaladas
              <button onClick={() => handleArrayAdd('fullMenu', 'ensaladas')} className="text-orange-500 hover:text-orange-400 p-1 bg-orange-500/10 rounded-md">
                <Plus size={16} />
              </button>
            </h4>
            
            <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              {(editingPlan.fullMenu.ensaladas || []).map((feat, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" className="flex-1 bg-stone-950 border border-stone-800 rounded-lg p-2 text-sm text-stone-300 focus:border-orange-500 outline-none" 
                    value={feat} onChange={e => handleArrayChange('fullMenu', 'ensaladas', i, e.target.value)} />
                  <button onClick={() => handleArrayRemove('fullMenu', 'ensaladas', i)} className="text-red-500 hover:text-red-400 p-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
               {!(editingPlan.fullMenu.ensaladas || []).length && <p className="text-xs text-stone-600">No incluye ensaladas.</p>}
            </div>
          </div>
          
           {/* SERVICIO TEXTAREA */}
           <div className="space-y-4 md:col-span-2">
              <h4 className="text-sm font-bold uppercase text-stone-500 tracking-wider">Servicio Incluido</h4>
              <textarea className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-stone-300 focus:border-orange-500 outline-none min-h-[80px]"
                value={editingPlan.fullMenu.servicio || ''} onChange={e => setEditingPlan({...editingPlan, fullMenu: {...editingPlan.fullMenu, servicio: e.target.value}})}
              />
           </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-stone-800">
          <button onClick={() => setEditingPlan(null)} className="flex-1 py-3 text-stone-400 hover:text-white bg-stone-950 rounded-xl border border-stone-800 transition-colors">
            Cancelar
          </button>
          <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20">
            {saving ? 'Guardando...' : <><Save size={18} /> Guardar Cambios</>}
          </button>
        </div>
      </div>
    );
  }

  // VISTA DE LISTA (Grilla de planes)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
      {plans.map(plan => (
        <div key={plan.id} className={`p-5 rounded-2xl border bg-stone-900/50 backdrop-blur-sm flex flex-col h-full ${plan.colorTheme.border}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 bg-stone-950 px-2 py-1 rounded-md">
                {plan.category === 'full' ? 'Al Plato' : 'Cóctel'}
              </span>
              <h3 className="text-xl font-oswald text-white uppercase mt-2">{plan.name}</h3>
            </div>
            {plan.recommended && (
              <span className="bg-sky-600/20 text-sky-400 text-[10px] font-bold px-2 py-1 uppercase rounded">Recomendado</span>
            )}
          </div>

          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-3xl font-bold text-white">${plan.pricePerPerson.toLocaleString("es-CL")}</span>
            <span className="text-stone-500 text-sm">/ p/p</span>
          </div>

          <div className="space-y-3 mb-6 flex-1">
            <div className="flex items-center gap-2 text-stone-400 text-sm">
              <Beef size={16} className="text-orange-500 shrink-0"/>
              <span className="truncate">{plan.totalWeight}</span>
            </div>
            <div className="bg-stone-950/50 p-3 rounded-lg border border-stone-800/50 text-xs text-stone-400 space-y-1">
                <p><strong>Carnes:</strong> {plan.fullMenu.carnes?.length || 0} items</p>
                <p><strong>Picoteo:</strong> {plan.fullMenu.picoteo?.length || 0} items</p>
                <p><strong>Acompañamientos:</strong> {plan.fullMenu.ensaladas?.length || 0} items</p>
            </div>
          </div>

          <button onClick={() => handleEditClick(plan)} className="w-full mt-auto bg-stone-800 hover:bg-orange-600 border border-stone-700 hover:border-orange-500 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 group">
            <Edit2 size={16} className="group-hover:scale-110 transition-transform"/> Editar Plan
          </button>
        </div>
      ))}
    </div>
  );
}
