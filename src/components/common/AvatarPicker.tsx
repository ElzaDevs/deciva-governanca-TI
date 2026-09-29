import React, { useState } from 'react';
import { TECH_AVATARS, TechAvatar } from '../../data/avatars';
import { Check, Sparkles, Image as ImageIcon, Link2 } from 'lucide-react';

interface AvatarPickerProps {
  selectedAvatar: string;
  onSelectAvatar: (avatarValue: string) => void;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({ selectedAvatar, onSelectAvatar }) => {
  const [activeTab, setActiveTab] = useState<string>('Enviados pelo Usuário');
  const [customUrl, setCustomUrl] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

  const categories = ['Enviados pelo Usuário', 'Retrô Y2K & Hacker', 'Linux & Open Source', 'Pixel Art'];

  const filteredAvatars = TECH_AVATARS.filter((av) => av.category === activeTab);

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onSelectAvatar(customUrl.trim());
      setShowCustomInput(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onSelectAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const isCurrentCustomUrl = selectedAvatar.startsWith('http') || selectedAvatar.startsWith('data:');

  return (
    <div className="space-y-3 bg-slate-950/80 border border-slate-800 rounded-xl p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-[11px] font-bold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Galeria de Avatares & Fotos de Perfil (Anos 2000 Tech)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Selecione entre suas imagens enviadas, referências clássicas dos anos 2000 ou insira foto personalizada.
          </p>
        </div>

        {/* Custom URL or upload trigger */}
        <div className="flex items-center space-x-2 shrink-0">
          <label className="cursor-pointer text-[10px] font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-md transition-colors flex items-center space-x-1.5">
            <ImageIcon className="w-3 h-3 text-cyan-400" />
            <span>Upload Foto</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
          <button
            type="button"
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="text-[10px] font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-md transition-colors flex items-center space-x-1.5"
          >
            <Link2 className="w-3 h-3 text-indigo-400" />
            <span>Link URL</span>
          </button>
        </div>
      </div>

      {showCustomInput && (
        <form onSubmit={handleApplyCustomUrl} className="flex gap-2 p-2 bg-slate-900 border border-indigo-500/50 rounded-lg">
          <input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="Cole o link da sua foto (ex: https://...)"
            className="flex-1 bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold"
          >
            Aplicar
          </button>
        </form>
      )}

      {/* Category Tabs */}
      <div className="flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-thin">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === cat
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-slate-800'
            }`}
          >
            {cat === 'Enviados pelo Usuário' ? '⭐ Suas Imagens' : cat}
          </button>
        ))}
      </div>

      {/* Grid of Avatars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
        {filteredAvatars.map((av: TechAvatar) => {
          const isSelected = selectedAvatar === av.imageUrl || selectedAvatar === av.id;

          return (
            <button
              type="button"
              key={av.id}
              onClick={() => onSelectAvatar(av.imageUrl || av.id)}
              className={`group relative text-left p-2 rounded-xl transition-all border ${
                isSelected
                  ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                {av.imageUrl ? (
                  <img
                    src={av.imageUrl}
                    alt={av.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      // Fallback to emoji if remote image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-3xl">{av.emojiFallback}</span>
                )}

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-slate-950 p-1 rounded-full shadow-md">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>

              <div className="mt-1.5">
                <div className="text-[11px] font-bold text-slate-200 truncate group-hover:text-emerald-300">
                  {av.name}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1 leading-tight mt-0.5">
                  {av.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Selection summary */}
      <div className="flex items-center space-x-3 pt-2 border-t border-slate-850 text-xs">
        <span className="text-slate-400 text-[11px]">Avatar Ativo:</span>
        <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
          {selectedAvatar.startsWith('http') || selectedAvatar.startsWith('/') || selectedAvatar.startsWith('data:') ? (
            <img src={selectedAvatar} alt="Ativo" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          ) : (
            <span className="text-base">{selectedAvatar}</span>
          )}
        </div>
        <span className="text-slate-300 font-mono text-[11px] truncate flex-1">
          {isCurrentCustomUrl ? 'Foto personalizada carregada' : selectedAvatar}
        </span>
      </div>
    </div>
  );
};
