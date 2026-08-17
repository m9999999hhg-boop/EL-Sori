import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'brand';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'brand',
  showSubtitle = true,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="syrian-restaurant-logo">
      {/* Brand Icon - Syrian Chef emblem */}
      <div
        className={`${sizeClasses[size]} relative flex items-center justify-center rounded-2xl bg-[#141414] border border-[#D4AF37]/40 text-[#D4AF37] shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-105`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/4 h-3/4"
        >
          {/* Chef Hat */}
          <path
            d="M24 10C21.5 10 19.5 11.5 18.5 13.5C16.5 13 14 15 14 17.5C14 19 14.8 20.2 16 21C15.5 22 16 23.5 17 24.5C17.5 25 18.5 25.5 20 25.5H28C29.5 25.5 30.5 25 31 24.5C32 23.5 32.5 22 32 21C33.2 20.2 34 19 34 17.5C34 15 31.5 13 29.5 13.5C28.5 11.5 26.5 10 24 10Z"
            fill="currentColor"
          />
          {/* Hat base */}
          <rect x="18" y="26" width="12" height="3" rx="1.5" fill="currentColor" opacity="0.9" />
          {/* Chef Mustache */}
          <path
            d="M24 33C21 31.5 17.5 33 16 36C18.5 36.5 22 35 24 33.8C26 35 29.5 36.5 32 36C30.5 33 27 31.5 24 33Z"
            fill="currentColor"
          />
          {/* Star accent */}
          <circle cx="24" cy="7" r="1.5" fill="#D4AF37" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-right">
        <span
          className={`font-black tracking-tight leading-none ${textClasses[size]} text-white`}
          style={{ fontFamily: "'Alexandria', sans-serif" }}
        >
          المطعم <span className="text-[#D4AF37]">السوري</span>
        </span>
        {showSubtitle && (
          <span className="text-[11px] font-semibold mt-1 tracking-wider text-[#D4AF37]/90">
            نكهات سورية أصيلة بطابع مميز
          </span>
        )}
      </div>
    </div>
  );
};

