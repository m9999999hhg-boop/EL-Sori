import React from 'react';
import { PhoneCall, MapPin, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">
            <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>تواصل معنا والطلب السريع</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white"
            style={{ fontFamily: "'Alexandria', sans-serif" }}
          >
            تواصل مع <span className="text-[#D4AF37]">المطعم السوري</span>
          </h2>

          <p className="text-white/60 text-xs sm:text-sm font-normal">
            فريق خدمة العملاء والتوصيل جاهز لاستقبال طلباتكم واستفساراتكم على مدار اليوم.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
          
          {/* Main Hotline Card */}
          <div className="rounded-2xl bg-[#111111] border border-[#D4AF37]/30 text-white p-5 sm:p-6 shadow-lg shadow-black/40 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#D4AF37]">الخط الساخن لجميع الفروع</span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-wider text-[#D4AF37]" dir="ltr">
                17196
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-normal">
                رقم موحد وسريع للطلبات، الاستفسارات، والتوصيل لجميع مناطق شبرا الخيمة.
              </p>
            </div>

            <a
              href="tel:17196"
              id="contact-hotline-btn"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#c4a132] text-black font-extrabold text-xs sm:text-sm transition-all shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-black" />
              <span>اتصال بالخط الساخن (17196)</span>
            </a>
          </div>

          {/* Bahtim Branch Direct Phone Card */}
          <div className="rounded-2xl bg-[#0F0F0F] border border-white/5 p-5 sm:p-6 shadow-md shadow-black/30 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#D4AF37]">فرع بهتيم (الشارع الجديد)</span>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-wider" dir="ltr">
                01020999996
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-normal">
                هاتف فرع بهتيم للطلبات المباشرة والتنسيق وخدمة التوصيل السريع.
              </p>
            </div>

            <a
              href="tel:01020999996"
              id="contact-bahtim-phone-btn"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#141414] border border-white/10 hover:border-emerald-400 text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>اتصال بفرع بهتيم</span>
            </a>
          </div>

          {/* Working Hours & Branches Info Card */}
          <div className="rounded-2xl bg-[#0F0F0F] border border-white/5 p-5 sm:p-6 shadow-md shadow-black/30 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#D4AF37]">مواعيد العمل والفروع</span>
              <h3 className="text-base font-bold text-white">
                يومياً: 11:00 ص إلى 3:00 ص
              </h3>
              <div className="text-xs text-white/60 space-y-1 pt-1">
                <div className="flex items-center gap-1.5 font-medium text-white/80">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>فرع بهتيم: الشارع الجديد</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-white/80">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>فرع عرابي: عمارة معمل البرج</span>
                </div>
              </div>
            </div>

            <a
              href="#branches"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#141414] border border-white/10 hover:border-[#D4AF37]/50 text-white font-bold text-xs sm:text-sm transition-all"
            >
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>تفاصيل عناوين الفروع</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

