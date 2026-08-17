import React from 'react';
import { PhoneCall, Utensils, MapPin, Sparkles, Flame, ShieldCheck, Clock } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu }) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-[#080808] text-[#E4E3E0]"
    >
      {/* Background Soft Radial Gold Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Content (Text & CTAs) */}
          <div className="lg:col-span-7 text-right space-y-5">
            
            {/* Top Brand Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>المطعم السوري • شبرا الخيمة</span>
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
              <span className="text-white/70 font-medium">الخط الساخن: 17196</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug"
                style={{ fontFamily: "'Alexandria', sans-serif" }}
              >
                نكهات سورية أصيلة <br />
                <span className="text-[#D4AF37]">بطابع دمشقي مميز</span>
              </h1>
              <p className="text-sm sm:text-base font-medium text-white/75">
                أشهى الشاورما، الكريب المقرمش، الفراخ المشوية، والبوكسات العائلية
              </p>
            </div>

            {/* Paragraph description */}
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
              وجبات طازجة يومياً من أجود الدواجن واللحوم، بتتبيلة سورية أصيلة وخدمة سريعة عبر فرعينا في بهتيم وكوبري عرابي.
            </p>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              {/* Explore Menu Button */}
              <button
                onClick={onExploreMenu}
                id="hero-explore-menu-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c4a132] text-black font-extrabold text-xs sm:text-sm shadow-md shadow-[#D4AF37]/20 transition-all duration-200"
              >
                <Utensils className="w-4 h-4 text-black" />
                <span>استكشف المنيو</span>
              </button>

              {/* Call Hotline Now Button (Compact Number Box) */}
              <a
                href="tel:17196"
                id="hero-call-hotline-btn"
                className="inline-flex items-center justify-center gap-2.5 px-4 py-2 rounded-xl bg-[#141414] border border-white/10 hover:border-[#D4AF37]/50 text-white font-bold text-xs transition-all duration-200"
              >
                <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                <div className="text-right leading-tight">
                  <span className="block text-[10px] text-white/50">الخط الساخن</span>
                  <span className="block text-sm font-black tracking-wider text-[#D4AF37]" dir="ltr">17196</span>
                </div>
              </a>

              {/* Branches Link Button */}
              <a
                href="#branches"
                id="hero-branches-btn"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#141414] border border-white/10 hover:border-[#D4AF37]/50 text-white/80 hover:text-white font-bold text-xs transition-all duration-200"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>فروعنا</span>
              </a>
            </div>

            {/* Quick Pillars */}
            <div className="pt-3 grid grid-cols-3 gap-2.5 border-t border-white/5 max-w-lg">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#101010] border border-white/5">
                <Flame className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <div className="text-right">
                  <span className="block text-[11px] font-bold text-white">تتبيلة أصلية</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#101010] border border-white/5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <div className="text-right">
                  <span className="block text-[11px] font-bold text-white">لحوم طازجة</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#101010] border border-white/5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <div className="text-right">
                  <span className="block text-[11px] font-bold text-white">توصيل سريع</span>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Visual Card (Clean, Uncluttered, Spaced) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-[#0F0F0F] p-5 sm:p-6 shadow-xl border border-white/10 space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#161616] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center font-bold text-sm">
                    ★
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-sm">الأصناف الأكثر طلباً</h3>
                    <p className="text-[11px] text-[#D4AF37]">جاهزة للطلب الفوري</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                  مفتوح الآن
                </span>
              </div>

              {/* Items Summary */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-[#141414] border border-white/5 flex items-center justify-between hover:border-[#D4AF37]/30 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🌯</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">شاورما سوري ع الفحم</h4>
                      <p className="text-[11px] text-white/50">لحم وفراخ وتومية مميزة</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#D4AF37] bg-[#1C1C1C] px-2.5 py-1 rounded-lg border border-white/5">
                    من 40 ج.م
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#141414] border border-white/5 flex items-center justify-between hover:border-[#D4AF37]/30 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">📦</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">بوكسات العيلة والتوفير</h4>
                      <p className="text-[11px] text-white/50">وجبات عائلية مشبعة وسخية</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#D4AF37] bg-[#1C1C1C] px-2.5 py-1 rounded-lg border border-white/5">
                    من 225 ج.م
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#141414] border border-white/5 flex items-center justify-between hover:border-[#D4AF37]/30 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🌮</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">كريب سوري مقرمش</h4>
                      <p className="text-[11px] text-white/50">محشو بألذ الأجبان والخلطات</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#D4AF37] bg-[#1C1C1C] px-2.5 py-1 rounded-lg border border-white/5">
                    من 65 ج.م
                  </span>
                </div>
              </div>

              {/* Bottom Quick Call */}
              <div className="p-3 rounded-xl bg-[#141414] border border-[#D4AF37]/30 text-white flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-white/50">للطلب والتوصيل:</span>
                  <span className="block text-sm font-black tracking-wider text-[#D4AF37]" dir="ltr">17196</span>
                </div>
                <a
                  href="tel:17196"
                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c4a132] text-black font-extrabold text-xs transition-colors"
                >
                  اتصال فوري
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


