import React from 'react';
import { PhoneCall, MapPin, ArrowUp } from 'lucide-react';
import { Logo } from './Logo';
import { BRANCHES_DATA } from '../data/branchesData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080808] text-[#E4E3E0] pt-14 pb-24 md:pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm font-normal">
              الموقع الرسمي للمطعم السوري في شبرا الخيمة. نكهات سورية أصيلة، شاورما على الفحم، كريب، دجاج مشوي وبروست، وبوكسات عائلية مجهزة يومياً بأعلى درجات الجودة.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="tel:17196"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141414] border border-[#D4AF37]/30 text-[#D4AF37] font-bold text-xs hover:bg-[#D4AF37] hover:text-black transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>الخط الساخن: 17196</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white">روابط سريعة</h4>
            <ul className="space-y-2 text-xs font-normal text-white/60">
              <li>
                <a href="#hero" className="hover:text-[#D4AF37] transition-colors">الرئيسية</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D4AF37] transition-colors">قائمة الطعام الكاملة</a>
              </li>
              <li>
                <a href="#branches" className="hover:text-[#D4AF37] transition-colors">فروعنا (بهتيم وعرابي)</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4AF37] transition-colors">عن المطعم السوري</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D4AF37] transition-colors">تواصل معنا</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Branches Summary */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-extrabold text-white">فروعنا</h4>
            <div className="space-y-3 text-xs text-white/60">
              {BRANCHES_DATA.map((b) => (
                <div key={b.id} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-white font-bold">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{b.name}</span>
                  </div>
                  <p className="pr-5 text-[11px] text-white/50">{b.address}</p>
                  {b.phone && (
                    <p className="pr-5 text-[11px] text-emerald-400 font-bold" dir="ltr">
                      هاتف: {b.phone}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} المطعم السوري. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] border border-white/10 hover:border-[#D4AF37]/50 text-white transition-colors"
            >
              <span>للأعلى</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

