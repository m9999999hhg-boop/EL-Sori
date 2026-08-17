import React from 'react';
import { PhoneCall, ShoppingBag, Utensils } from 'lucide-react';
import { CartItem } from '../types';

interface MobileQuickBarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onExploreMenu: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  cartItems,
  onOpenCart,
  onExploreMenu,
}) => {
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <aside
      aria-label="شريط الوصول السريع للجوال"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/10 p-2.5 px-4 shadow-2xl flex items-center justify-between gap-3"
      id="mobile-quick-action-bar"
    >
      {/* Hotline Call Button */}
      <a
        href="tel:17196"
        id="mobile-bar-call-btn"
        className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-[#D4AF37] hover:bg-[#c4a132] text-black font-black text-xs shadow-md shadow-[#D4AF37]/20 active:scale-95 transition-transform"
      >
        <PhoneCall className="w-4 h-4 text-black" />
        <div className="flex flex-col text-right leading-tight">
          <span className="text-[9px] text-black/75">اطلب هاتفياً</span>
          <span className="text-sm font-black tracking-wider" dir="ltr">17196</span>
        </div>
      </a>

      {/* Menu scroll */}
      <button
        type="button"
        onClick={onExploreMenu}
        className="flex items-center justify-center p-3 rounded-2xl bg-[#141414] border border-white/10 text-[#D4AF37] active:scale-95"
        title="تصفح المنيو"
      >
        <Utensils className="w-5 h-5" />
      </button>

      {/* Cart button */}
      <button
        type="button"
        onClick={onOpenCart}
        id="mobile-bar-cart-btn"
        className="relative flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#141414] border border-white/10 text-white font-bold text-xs active:scale-95 transition-transform"
      >
        <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
        {count > 0 ? (
          <div className="flex flex-col text-right leading-tight">
            <span className="text-[9px] text-white/50">{count} أصناف</span>
            <span className="text-xs font-black text-[#D4AF37]">{total} ج.م</span>
          </div>
        ) : (
          <span className="text-xs">السلة</span>
        )}

        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#D4AF37] text-black text-[10px] font-black flex items-center justify-center border-2 border-black shadow-xs">
            {count}
          </span>
        )}
      </button>
    </aside>
  );
};

