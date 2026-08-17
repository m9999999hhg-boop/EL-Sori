import React, { useState } from 'react';
import { MapPin, PhoneCall, ExternalLink, Clock, ShieldCheck, Navigation, Loader2, Compass } from 'lucide-react';
import { BRANCHES_DATA } from '../data/branchesData';

// Branch approximate coordinates for distance calculation
const BRANCH_COORDS: Record<string, { lat: number; lng: number }> = {
  bahtim: { lat: 30.1340, lng: 31.2820 },
  orabi: { lat: 30.1205, lng: 31.2650 },
};

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export const BranchesSection: React.FC = () => {
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locateError, setLocateError] = useState<string | null>(null);

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setLocateError('متصفحك لا يدعم تحديد الموقع');
      return;
    }
    setIsLocating(true);
    setLocateError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        setLocateError('يرجى السماح بصلاحية الموقع من إعدادات المتصفح');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Find nearest branch if user coords available
  let nearestBranchId: string | null = null;
  const branchDistances: Record<string, number> = {};

  if (userCoords) {
    let minDistance = Infinity;
    Object.entries(BRANCH_COORDS).forEach(([id, coords]) => {
      const dist = getDistanceKm(userCoords.lat, userCoords.lng, coords.lat, coords.lng);
      branchDistances[id] = dist;
      if (dist < minDistance) {
        minDistance = dist;
        nearestBranchId = id;
      }
    });
  }

  return (
    <section id="branches" className="py-16 sm:py-20 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>فروعنا في شبرا الخيمة</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white"
            style={{ fontFamily: "'Alexandria', sans-serif" }}
          >
            فروع <span className="text-[#D4AF37]">المطعم السوري</span>
          </h2>

          <p className="text-white/60 text-xs sm:text-sm font-normal">
            نسعد باستقبالكم وتلبية طلباتكم من خلال فرعينا في شبرا الخيمة، أو عبر خدمة التوصيل السريع.
          </p>

          {/* Quick Find Nearest Branch Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleLocateMe}
              disabled={isLocating}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141414] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] text-xs font-bold transition-all disabled:opacity-50"
            >
              {isLocating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                  <span>جارٍ تحديد موقعك...</span>
                </>
              ) : (
                <>
                  <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{userCoords ? 'تم تحديد موقعك ومعرفة أقرب فرع' : 'حدد موقعي لمعرفة الفرع الأقرب'}</span>
                </>
              )}
            </button>
            {locateError && (
              <p className="text-xs text-red-400 mt-2">{locateError}</p>
            )}
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {BRANCHES_DATA.map((branch) => {
            const isBahtim = branch.id === 'bahtim';
            const isNearest = nearestBranchId === branch.id;
            const distance = branchDistances[branch.id];

            return (
              <div
                key={branch.id}
                id={`branch-card-${branch.id}`}
                className={`relative rounded-2xl bg-[#0F0F0F] border shadow-lg shadow-black/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group ${
                  isNearest ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/50' : 'border-white/5 hover:border-[#D4AF37]/40'
                }`}
              >
                {/* Nearest Badge */}
                {isNearest && (
                  <div className="absolute -top-3 right-5 px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-black text-[11px] font-black shadow-sm flex items-center gap-1">
                    <Navigation className="w-3 h-3" />
                    <span>الفرع الأقرب إليك {distance ? `(~${distance} كم)` : ''}</span>
                  </div>
                )}

                {/* Branch Header */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center font-bold shadow-xs">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#D4AF37]">
                          {isBahtim ? 'الفرع الأول' : 'الفرع الثاني'}
                        </span>
                        <h3 className="text-lg font-bold text-white">
                          {branch.name}
                        </h3>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      مفتوح الآن
                    </span>
                  </div>

                  {/* Address Details */}
                  <div className="p-3 rounded-xl bg-[#141414] border border-white/5 space-y-1">
                    <div className="flex items-start gap-2">
                      <Navigation className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-white/50">العنوان:</span>
                        <p className="text-xs font-semibold text-white leading-relaxed">
                          {branch.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Numbers for Branch */}
                  <div className="space-y-2 pt-0.5 text-xs">
                    {/* Hotline for branch */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#141414] border border-white/5">
                      <div className="flex items-center gap-1.5">
                        <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="font-bold text-white/70">الخط الساخن:</span>
                      </div>
                      <a
                        href="tel:17196"
                        className="font-black text-[#D4AF37] tracking-wider hover:underline"
                        dir="ltr"
                      >
                        17196
                      </a>
                    </div>

                    {/* Local phone for Bahtim only */}
                    {branch.phone && (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#141414] border border-white/5">
                        <div className="flex items-center gap-1.5">
                          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="font-bold text-white/70">هاتف الفرع المباشر:</span>
                        </div>
                        <a
                          href={`tel:${branch.phone}`}
                          className="font-black text-emerald-400 tracking-wider hover:underline"
                          dir="ltr"
                        >
                          {branch.phone}
                        </a>
                      </div>
                    )}

                    {/* Working Hours */}
                    <div className="flex items-center gap-1.5 text-[11px] text-white/50 pt-0.5">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      <span>{branch.workingHours}</span>
                    </div>
                  </div>
                </div>

                {/* Branch CTA Buttons */}
                <div className="pt-4 mt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Google Maps Search Button */}
                  <a
                    href={branch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`btn-maps-${branch.id}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#141414] border border-white/10 hover:border-[#D4AF37]/50 text-white font-bold text-xs transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>فتح الموقع</span>
                  </a>

                  {/* Call Button */}
                  <a
                    href={`tel:${branch.phone || branch.hotline}`}
                    id={`btn-call-${branch.id}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#D4AF37] hover:bg-[#c4a132] text-black font-extrabold text-xs shadow-xs transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-black" />
                    <span>اتصال بالفرع</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery Guarantee Banner */}
        <div className="mt-12 max-w-4xl mx-auto p-5 sm:p-6 rounded-3xl bg-[#111111] border border-white/5 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-white">خدمة التوصيل السريع للمنازل</h4>
              <p className="text-xs sm:text-sm text-white/60">
                نغطي كافة مناطق شبرا الخيمة وبهتيم وعرابي والمناطق المجاورة بأسرع وقت وأعلى جودة.
              </p>
            </div>
          </div>
          <a
            href="tel:17196"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c4a132] text-black font-black text-sm transition-all shadow-md"
          >
            اتصل بـ 17196
          </a>
        </div>

      </div>
    </section>
  );
};


