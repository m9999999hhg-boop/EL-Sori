import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, PhoneCall, Copy, Check, MessageSquare, ShoppingBag, ArrowRight, MapPin, Navigation, Loader2, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';
import { BRANCHES_DATA } from '../data/branchesData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(BRANCHES_DATA[0].id);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const selectedBranch = BRANCHES_DATA.find((b) => b.id === selectedBranchId) || BRANCHES_DATA[0];

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('متصفحك لا يدعم تحديد الموقع الجغرافي');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCoords({ lat, lng });

        try {
          // Attempt reverse geocoding via OpenStreetMap Nominatim for human-friendly Arabic address
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`
          );
          if (res.ok) {
            const data = await res.json();
            const displayName = data.display_name || `موقع محدد (${lat.toFixed(5)}, ${lng.toFixed(5)})`;
            setCustomerAddress(displayName);
          } else {
            setCustomerAddress(`موقعك الجغرافي الحالي (خط العرض: ${lat.toFixed(5)}, خط الطول: ${lng.toFixed(5)})`);
          }
        } catch {
          setCustomerAddress(`موقعك الجغرافي الحالي (${lat.toFixed(5)}, ${lng.toFixed(5)})`);
        }

        setIsLocating(false);
        setLocationSuccess(true);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('يرجى السماح للتطبيق بالوصول لموقعك من إعدادات المتصفح.');
        } else {
          setLocationError('تعذر تحديد الموقع، يرجى المحاولة مجدداً أو كتابة العنوان.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  };

  const generateOrderSummaryText = () => {
    let text = `*طلب جديد من موقع المطعم السوري*\n`;
    text += `الفرع المفضل: ${selectedBranch.name}\n`;
    if (customerName) text += `الاسم: ${customerName}\n`;
    
    if (coords) {
      text += `📍 رابط الموقع الحالي على الخريطة: https://maps.google.com/?q=${coords.lat},${coords.lng}\n`;
    }
    if (customerAddress) {
      text += `العنوان: ${customerAddress}\n`;
    }
    if (addressDetails) {
      text += `تفاصيل المبنى/الشقة/العلامة المميزة: ${addressDetails}\n`;
    }

    text += `\n*تفاصيل الطلب:*\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (${item.quantity}x)\n`;
      if (item.selectedOption) {
        text += `   - الحجم/النوع: ${item.selectedOption.label}\n`;
      }
      if (item.selectedAddons && item.selectedAddons.length > 0) {
        text += `   - إضافات: ${item.selectedAddons.map((a) => a.name).join(', ')}\n`;
      }
      if (item.notes) {
        text += `   - ملاحظات: ${item.notes}\n`;
      }
      text += `   - السعر: ${item.totalPrice} ج.م\n`;
    });

    text += `\n*الإجمالي: ${subtotal} ج.م*\n`;
    text += `الخط الساخن: 17196`;
    return text;
  };

  const handleCopyOrder = () => {
    const text = generateOrderSummaryText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    const text = generateOrderSummaryText();
    const phone = '201020999996';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-xs flex justify-end animate-fade-in"
      onClick={onClose}
      id="cart-drawer-overlay"
    >
      <div
        className="w-full max-w-md bg-[#0A0A0A] text-[#E4E3E0] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-left border-l border-white/10"
        onClick={(e) => e.stopPropagation()}
        id="cart-drawer-container"
      >
        {/* Drawer Header */}
        <div className="p-5 bg-[#111111] border-b border-white/5 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">سلة طلباتك</h2>
              <p className="text-xs text-white/50">
                {cartItems.length} {cartItems.length === 1 ? 'صنف مختار' : 'أصناف مختارة'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                title="تفريغ السلة"
                className="p-2 rounded-lg bg-[#1A1A1A] border border-white/10 hover:bg-white/10 text-white/70 hover:text-red-400 text-xs transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق السلة"
              className="p-2 rounded-lg bg-[#1A1A1A] border border-white/10 hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        {cartItems.length > 0 ? (
          <div className="p-5 overflow-y-auto space-y-5 flex-1">
            {/* Items List */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#0F0F0F] border border-white/5 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        {item.name}
                      </h4>
                      {item.selectedOption && (
                        <p className="text-xs text-[#D4AF37] font-bold">
                          {item.selectedOption.label} ({item.selectedOption.price} ج.م)
                        </p>
                      )}
                      {item.selectedAddons && item.selectedAddons.length > 0 && (
                        <p className="text-[11px] text-white/50">
                          إضافات: {item.selectedAddons.map((a) => a.name).join(' + ')}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-[11px] text-[#D4AF37] bg-[#141414] border border-white/5 p-1.5 rounded-lg">
                          ملاحظة: {item.notes}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-white/40 hover:text-red-400 p-1 transition-colors"
                      title="حذف الصنف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    {/* Quantity Modifier */}
                    <div className="flex items-center gap-2 bg-[#141414] border border-white/10 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-[#1A1A1A] hover:bg-white/10 text-white flex items-center justify-center font-bold text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-black text-xs text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-[#D4AF37] text-black flex items-center justify-center font-bold text-xs hover:bg-[#c4a132]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Total item price */}
                    <div className="text-left">
                      <span className="text-base font-black text-[#D4AF37]">
                        {item.totalPrice}
                      </span>
                      <span className="text-[11px] font-bold text-white/50 mr-1">ج.م</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Branch Selector */}
            <div className="p-4 rounded-2xl bg-[#111111] border border-white/5 space-y-2">
              <label className="block text-xs font-bold text-white/70 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>اختر فرع الاستلام أو التوصيل:</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BRANCHES_DATA.map((branch) => (
                  <button
                    key={branch.id}
                    type="button"
                    onClick={() => setSelectedBranchId(branch.id)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-center border transition-all ${
                      selectedBranchId === branch.id
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-xs'
                        : 'bg-[#141414] text-white/70 border-white/10 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {branch.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery & Auto-Location Section */}
            <div className="p-4 rounded-2xl bg-[#111111] border border-white/5 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white/80 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>بيانات وموقع التوصيل:</span>
                </span>
                {locationSuccess && (
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    تم التقاط موقعك الحالي
                  </span>
                )}
              </div>

              {/* Automatic GPS Location Button */}
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={isLocating}
                className="w-full py-3 px-4 rounded-xl bg-[#181818] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isLocating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                    <span>جارٍ تحديد موقعك الحالي عبر GPS...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 text-[#D4AF37]" />
                    <span>تحديد موقعي الحالي تلقائياً (بدون كتابة عنوان)</span>
                  </>
                )}
              </button>

              {locationError && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{locationError}</span>
                </div>
              )}

              {coords && (
                <div className="p-3 rounded-xl bg-[#141414] border border-emerald-500/30 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>تم التحديد بنجاح:</span>
                    <a
                      href={`https://maps.google.com/?q=${coords.lat},${coords.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[11px] text-[#D4AF37]"
                    >
                      عرض في خرائط جوجل
                    </a>
                  </div>
                  {customerAddress && (
                    <p className="text-white/70 text-[11px] leading-relaxed">
                      {customerAddress}
                    </p>
                  )}
                </div>
              )}

              {/* Customer Inputs */}
              <div className="space-y-2 pt-1 text-xs">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="اسمك الكريم (اختياري)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                />
                
                {!coords && (
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="أو اكتب العنوان يدوياً هنا..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                  />
                )}

                <input
                  type="text"
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  placeholder="رقم العمارة / الشقة / الدور / علامة مميزة (اختياري)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart state */
          <div className="p-8 text-center my-auto space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#141414] border border-white/10 text-[#D4AF37] flex items-center justify-center mx-auto text-3xl">
              <ShoppingBag className="w-10 h-10 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-black text-white">سلة الطلبات فارغة</h3>
            <p className="text-sm text-white/50">
              لم تقم بإضافة أي أصناف بعد. تصفح المنيو واختر وجبتك المفضلة!
            </p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm shadow-md"
            >
              <span>تصفح المنيو الآن</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        )}

        {/* Drawer Footer Actions */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-[#0F0F0F] border-t border-white/5 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/60">إجمالي الطلب:</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-black text-[#D4AF37]">
                  {subtotal}
                </span>
                <span className="text-xs font-bold text-white/60">ج.م</span>
              </div>
            </div>

            {/* Direct Call 17196 CTA */}
            <a
              href="tel:17196"
              id="cart-hotline-call-btn"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#c4a132] text-black font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              <PhoneCall className="w-4 h-4 text-black" />
              <span>اتصال بالخط الساخن (17196) لتأكيد الطلب</span>
            </a>

            {/* WhatsApp / Copy Grid */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>إرسال واتساب بالموقع</span>
              </button>

              <button
                type="button"
                onClick={handleCopyOrder}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#141414] border border-white/10 text-white hover:bg-white/10 font-bold text-xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-white/70" />
                    <span>نسخ ملخص الطلب</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


