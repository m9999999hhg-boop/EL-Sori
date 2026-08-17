import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, PhoneCall, ShoppingBag, Check, Flame, Users, Sparkles } from 'lucide-react';
import { MenuItem, MenuItemAddon, PriceOption } from '../types';

interface MenuItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    selectedOption?: PriceOption,
    selectedAddons?: MenuItemAddon[],
    quantity?: number,
    notes?: string
  ) => void;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedOption, setSelectedOption] = useState<PriceOption | undefined>(undefined);
  const [selectedAddons, setSelectedAddons] = useState<MenuItemAddon[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Reset state when item changes
  useEffect(() => {
    if (item) {
      if (item.options && item.options.length > 0) {
        setSelectedOption(item.options[0]);
      } else {
        setSelectedOption(undefined);
      }
      setSelectedAddons([]);
      setQuantity(1);
      setNotes('');
    }
  }, [item]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const basePrice = selectedOption ? selectedOption.price : item.basePrice;
  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const unitPrice = basePrice + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (addon: MenuItemAddon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(item, selectedOption, selectedAddons, quantity, notes.trim() || undefined);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      id="menu-item-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-item-title"
    >
      <div
        className="relative w-full max-w-lg bg-[#0A0A0A] text-[#E4E3E0] rounded-3xl shadow-2xl border border-white/10 overflow-hidden max-h-[90vh] flex flex-col animate-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-[#111111] border-b border-white/5 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="space-y-1.5 pr-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold">
                {item.category}
              </span>
              {item.tags?.includes('popular') && (
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-black text-[11px] font-black flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> الأكثر طلباً
                </span>
              )}
              {item.tags?.includes('spicy') && (
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-[11px] font-black flex items-center gap-1">
                  <Flame className="w-3 h-3" /> حار
                </span>
              )}
              {item.tags?.includes('family') && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] font-black flex items-center gap-1">
                  <Users className="w-3 h-3" /> عائلي
                </span>
              )}
            </div>
            <h2 id="modal-item-title" className="text-xl sm:text-2xl font-black text-white">
              {item.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="إغلاق"
            id="close-modal-btn"
            className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-white/10 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Description & Serving Details */}
          <div className="p-4 rounded-2xl bg-[#111111] border border-white/5 space-y-2">
            <h3 className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider">
              المكونات والتفاصيل
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-normal">
              {item.description}
            </p>
            {item.servedWith && (
              <div className="pt-2 border-t border-white/5 flex items-start gap-2 text-xs text-white/60">
                <span className="font-bold text-[#D4AF37]">يقدم مع:</span>
                <span>{item.servedWith}</span>
              </div>
            )}
          </div>

          {/* Size / Type Options */}
          {item.options && item.options.length > 0 && (
            <div className="space-y-3">
              <label className="block text-sm font-extrabold text-white">
                اختر الحجم أو النوع <span className="text-[#D4AF37]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.options.map((option) => {
                  const isSelected = selectedOption?.label === option.label;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setSelectedOption(option)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-right transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white font-bold shadow-xs'
                          : 'bg-[#111111] border-white/10 text-white/70 hover:border-[#D4AF37]/50 font-normal'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-white/30'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </div>
                        <span className="text-sm">{option.label}</span>
                      </div>
                      <span className="text-sm font-black text-[#D4AF37]">
                        {option.price} ج.م
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {item.addons && item.addons.length > 0 && (
            <div className="space-y-3">
              <label className="block text-sm font-extrabold text-white">
                إضافات اختيارية
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.addons.map((addon) => {
                  const isSelected = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-right transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white font-bold'
                          : 'bg-[#111111] border-white/10 text-white/70 hover:border-[#D4AF37]/40 font-normal'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isSelected ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : 'border-white/30'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm">{addon.name}</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#D4AF37]">
                        +{addon.price} ج.م
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity and Notes */}
          <div className="space-y-3 pt-1 border-t border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-white">الكمية</span>
              <div className="flex items-center gap-3 bg-[#111111] border border-white/10 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-lg bg-[#1A1A1A] hover:bg-white/10 disabled:opacity-40 text-white flex items-center justify-center font-black transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-black text-base text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-[#D4AF37] text-black flex items-center justify-center font-black hover:bg-[#c4a132] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Special Instructions Note */}
            <div>
              <label htmlFor="modal-notes" className="block text-xs font-bold text-white/50 mb-1.5">
                ملاحظات إضافية (اختياري)
              </label>
              <input
                type="text"
                id="modal-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: تومية زيادة، بدون مايونيز، سبايسي..."
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#111111] border border-white/10 focus:outline-none focus:border-[#D4AF37] text-white placeholder-white/30"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#0F0F0F] border-t border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white/60">المجموع الإجمالي:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-[#D4AF37]">
                {totalPrice}
              </span>
              <span className="text-xs font-bold text-white/60">ج.م</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleAddToCart}
              id="modal-add-to-cart-btn"
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#c4a132] text-black font-extrabold text-sm shadow-md shadow-[#D4AF37]/20 transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              <span>إضافة للطلب</span>
            </button>

            <a
              href="tel:17196"
              id="modal-direct-call-btn"
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#141414] border border-white/10 hover:border-[#D4AF37]/50 text-white font-bold text-sm transition-all"
            >
              <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
              <span>اطلب فوراً (17196)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

