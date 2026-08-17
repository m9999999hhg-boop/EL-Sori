import React, { useState, useEffect } from 'react';
import { PhoneCall, ShoppingBag, Menu as MenuIcon, X, MapPin, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItemCount, onOpenCart, onSelectCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'المنيو الكامل', href: '#menu', action: () => onSelectCategory && onSelectCategory('all') },
    { label: 'بوكسات التوفير', href: '#menu', action: () => onSelectCategory && onSelectCategory('boxes') },
    { label: 'فروعنا', href: '#branches' },
    { label: 'عن المطعم', href: '#about' },
    { label: 'تواصل معنا', href: '#contact' },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    if (link.action) {
      link.action();
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg shadow-black/60 border-b border-white/5'
          : 'bg-[#0A0A0A] border-b border-white/5'
      }`}
    >
      {/* Top Banner with Hotline */}
      <div className="bg-[#111111] border-b border-white/5 text-white/80 text-xs font-semibold py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
            <span>نستقبل طلباتكم الآن عبر الخط الساخن الموحد</span>
          </div>
          <a
            href="tel:17196"
            className="flex items-center gap-1.5 text-[#D4AF37] hover:text-white transition-colors duration-200"
            id="top-hotline-link"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="font-bold tracking-wider">17196</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group" id="navbar-brand-logo">
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link)}
                className="px-3 py-1.5 text-xs sm:text-sm font-bold text-white/70 hover:text-[#D4AF37] hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Hotline CTA & Cart button */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Compact Hotline Button */}
            <a
              href="tel:17196"
              id="navbar-hotline-button"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37] hover:bg-[#c4a132] text-black font-extrabold text-xs shadow-md shadow-[#D4AF37]/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center">
                <PhoneCall className="w-3 h-3 text-black" />
              </div>
              <div className="flex flex-col text-right leading-tight">
                <span className="text-[8px] uppercase tracking-wider font-bold text-black/70">الخط الساخن</span>
                <span className="text-xs font-black tracking-wider" dir="ltr">17196</span>
              </div>
            </a>

            {/* Cart / Order Drawer Toggle */}
            <button
              onClick={onOpenCart}
              id="navbar-cart-button"
              aria-label="سلة الطلبات"
              className="relative flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141414] border border-white/10 text-white hover:border-[#D4AF37]/50 hover:text-[#D4AF37] shadow-xs transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden md:inline text-xs font-bold">طلباتي</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-[#D4AF37] text-black text-[10px] font-black flex items-center justify-center shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              aria-label="فتح القائمة"
              className="lg:hidden p-2 rounded-xl text-white/80 bg-[#141414] border border-white/10 hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden fixed inset-x-0 top-[112px] bg-[#0A0A0A] border-b border-white/10 shadow-2xl p-5 space-y-4 animate-fade-in"
        >
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link)}
                className="flex items-center justify-center p-3 text-center text-sm font-bold text-white/80 bg-[#141414] border border-white/5 rounded-2xl hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 space-y-2">
            <a
              href="tel:17196"
              className="flex items-center justify-center gap-3 w-full py-3.5 px-4 rounded-2xl bg-[#D4AF37] text-black font-black text-base shadow-lg shadow-[#D4AF37]/20"
              id="mobile-drawer-hotline-cta"
            >
              <PhoneCall className="w-5 h-5 text-black" />
              <span>اتصل بالخط الساخن 17196</span>
            </a>

            <div className="flex items-center justify-between p-3 bg-[#141414] border border-white/5 rounded-2xl text-xs font-semibold text-white/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>فروعنا: بهتيم & كوبري عرابي</span>
              </div>
              <span className="text-[#D4AF37] font-bold">مفتوح الآن</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

