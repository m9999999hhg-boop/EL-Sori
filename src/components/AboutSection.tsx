import React from 'react';
import { Flame, UtensilsCrossed, ShieldCheck, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-16 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Visual Showcase Block */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl bg-[#111111] border border-white/5 p-5 sm:p-6 text-white shadow-xl overflow-hidden space-y-4">
              
              {/* Gold glow element */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold">
                  سر النكهة الأصلية
                </span>
                <h3
                  className="text-xl sm:text-2xl font-bold text-white"
                  style={{ fontFamily: "'Alexandria', sans-serif" }}
                >
                  ضيافة شامية وطعم لا يُنسى
                </h3>
              </div>

              <div className="space-y-3 pt-1">
                <div className="p-3 rounded-xl bg-[#141414] border border-white/5 flex items-start gap-2.5">
                  <Flame className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white">تتبيلة سورية سرية</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-normal">
                      بهارات ومطحونات شامية مختارة بعناية تعطي الشاورما والفراخ نكهة فريدة ومميزة.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#141414] border border-white/5 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white">لحوم ودواجن طازجة</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-normal">
                      نستخدم أجود أنواع اللحوم الطازجة والدواجن المجهزة يومياً بأعلى معايير الجودة.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#141414] border border-white/5 flex items-start gap-2.5">
                  <UtensilsCrossed className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white">كرم الضيافة وأحجام مشبعة</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-normal">
                      وجبات وبوكسات عائلية مليانة وكميات سخية مع جميع الصوصات والمقبلات.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-white/50">
                <span>المطعم السوري • شبرا الخيمة</span>
                <span className="font-bold text-[#D4AF37]">الخط الساخن: 17196</span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>عن المطعم السوري</span>
            </div>

            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
              style={{ fontFamily: "'Alexandria', sans-serif" }}
            >
              نقدم لكم حكاية <span className="text-[#D4AF37]">المذاق الشامي الأصيل</span>
            </h2>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-normal">
              تأسس المطعم السوري ليكون الوجهة الأولى لعشاق الأكل الشامي الأصيل في شبرا الخيمة والقليوبية. نحرص على تقديم تجربة طعام استثنائية تمزج بين عراقة المطبخ السوري وسرعة وجودة الخدمة.
            </p>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-normal">
              من سيخ الشاورما الدوار المتبل بعناية، إلى ساندويتشات الكريب المقرمشة المحشوة بأشهى المكونات، ووجبات الفراخ المشوية على الفحم والبروست الذهبي المقرمش، نضمن وصول وجبتك ساخنة وطازجة.
            </p>

            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#0F0F0F] border border-white/5 text-center space-y-0.5">
                <span className="text-xl font-bold text-[#D4AF37]">100%</span>
                <p className="text-xs font-medium text-white/70">نكهة سورية أصلية</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0F0F0F] border border-white/5 text-center space-y-0.5">
                <span className="text-xl font-bold text-[#D4AF37]">فرعان</span>
                <p className="text-xs font-medium text-white/70">بهتيم & كوبري عرابي</p>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-[#0F0F0F] border border-white/5 text-center space-y-0.5">
                <span className="text-xl font-black text-[#D4AF37]">17196</span>
                <p className="text-xs font-medium text-white/70">خط ساخن موحد</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

