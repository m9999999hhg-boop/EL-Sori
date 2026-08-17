import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, Flame, Users, Box, Plus, Info, ArrowUpDown } from 'lucide-react';
import { MenuItem, MenuCategory, PriceOption } from '../types';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';

interface MenuSectionProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  onOpenModal: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedCategoryId,
  onSelectCategory,
  onOpenModal,
  onQuickAdd,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // Quick tag filter definitions
  const tagFilters = [
    { id: 'all', label: 'الكل' },
    { id: 'popular', label: 'الأكثر طلباً', icon: Sparkles },
    { id: 'box', label: 'بوكسات التوفير', icon: Box },
    { id: 'spicy', label: 'حار وسبايسي', icon: Flame },
    { id: 'family', label: 'عائلي', icon: Users },
  ];

  // Filter and Sort Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategoryId !== 'all' && item.categoryId !== selectedCategoryId) {
        return false;
      }

      // Tag filter
      if (selectedTag !== 'all') {
        if (!item.tags || !item.tags.includes(selectedTag as any)) {
          return false;
        }
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(query);
        const descMatch = item.description.toLowerCase().includes(query);
        const catMatch = item.category.toLowerCase().includes(query);
        const servedMatch = item.servedWith ? item.servedWith.toLowerCase().includes(query) : false;
        const optionsMatch = item.options ? item.options.some(o => o.label.toLowerCase().includes(query)) : false;
        return nameMatch || descMatch || catMatch || servedMatch || optionsMatch;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.basePrice - b.basePrice;
      }
      if (sortBy === 'price-desc') {
        return b.basePrice - a.basePrice;
      }
      return 0;
    });
  }, [selectedCategoryId, selectedTag, searchQuery, sortBy]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MENU_ITEMS.length };
    MENU_ITEMS.forEach((item) => {
      counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
    });
    return counts;
  }, []);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag('all');
    onSelectCategory('all');
    setSortBy('default');
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#080808] text-[#E4E3E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>قائمة الطعام والأسعار المعتمدة</span>
          </div>
          
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white"
            style={{ fontFamily: "'Alexandria', sans-serif" }}
          >
            استكشف <span className="text-[#D4AF37]">منيو المطعم السوري</span>
          </h2>
          
          <p className="text-white/60 text-xs sm:text-sm font-normal">
            تصفح جميع الأقسام والأصناف الشامية الطازجة بالأسعار الرسمية المعتمدة، مع إمكانية التخصيص والطلب الفوري.
          </p>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-[#0F0F0F] rounded-2xl p-3.5 sm:p-4 shadow-lg shadow-black/60 border border-white/5 mb-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
            
            {/* Live Search Input */}
            <div className="md:col-span-8 relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-white/40">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن صنف أو مكون (شاورما، كريب، زنجر، بروست، فاهيتا...)"
                id="menu-search-input"
                className="w-full pr-9 pl-8 py-2.5 text-xs sm:text-sm rounded-xl bg-[#141414] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37] focus:bg-[#1A1A1A] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="مسح البحث"
                  className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-4 flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-white/40 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                id="menu-sort-select"
                aria-label="ترتيب حسب"
                className="w-full py-2.5 px-3 text-xs sm:text-sm rounded-xl bg-[#141414] border border-white/10 text-white font-bold focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                <option value="default">الترتيب: الافتراضي</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
              </select>
            </div>

          </div>

          {/* Quick Tag Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
            <span className="text-[11px] font-bold text-white/50 ml-1">تصفية:</span>
            {tagFilters.map((tag) => {
              const Icon = tag.icon;
              const isSelected = selectedTag === tag.id;
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setSelectedTag(tag.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#D4AF37] text-black shadow-xs'
                      : 'bg-[#141414] text-white/70 border border-white/5 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {Icon && <Icon className={`w-3 h-3 ${isSelected ? 'text-black' : 'text-[#D4AF37]'}`} />}
                  <span>{tag.label}</span>
                </button>
              );
            })}

            {(searchQuery || selectedTag !== 'all' || selectedCategoryId !== 'all' || sortBy !== 'default') && (
              <button
                type="button"
                onClick={clearFilters}
                className="mr-auto text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                <span>إعادة ضبط</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs (Horizontal Scrollable on Mobile) */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {MENU_CATEGORIES.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  id={`category-tab-${cat.id}`}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#D4AF37] text-black shadow-sm'
                      : 'bg-[#0F0F0F] text-white/70 border border-white/5 hover:border-[#D4AF37]/40 hover:text-white hover:bg-[#141414]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.2 rounded-md ${
                      isSelected ? 'bg-black/20 text-black' : 'bg-[#1A1A1A] text-white/50'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Description Banner (if selected category has one) */}
        {selectedCategoryId !== 'all' && (
          <div className="mb-5 p-3 rounded-xl bg-[#141414] border border-[#D4AF37]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="font-bold text-xs sm:text-sm text-white">
                {MENU_CATEGORIES.find(c => c.id === selectedCategoryId)?.name}:
              </span>
              <span className="text-xs text-white/60">
                {MENU_CATEGORIES.find(c => c.id === selectedCategoryId)?.description}
              </span>
            </div>
            <span className="text-[11px] font-bold text-[#D4AF37] bg-[#0A0A0A] px-2 py-0.5 rounded-lg border border-[#D4AF37]/30">
              {filteredItems.length} صنف
            </span>
          </div>
        )}

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredItems.map((item) => {
              // Determine price presentation
              const hasOptions = item.options && item.options.length > 0;
              const minPrice = item.basePrice;
              const maxPrice = hasOptions
                ? Math.max(...item.options!.map((o) => o.price))
                : item.basePrice;

              return (
                <div
                  key={item.id}
                  id={`menu-item-card-${item.id}`}
                  className="group relative rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-[#D4AF37]/40 hover:shadow-xl hover:shadow-black/70 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between"
                >
                  {/* Top: Category Tag & Badges */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1">
                        {item.tags?.includes('popular') && (
                          <span
                            title="الأكثر طلباً"
                            className="p-0.5 px-1.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold flex items-center gap-0.5"
                          >
                            <Sparkles className="w-2.5 h-2.5" /> مميز
                          </span>
                        )}
                        {item.tags?.includes('spicy') && (
                          <span
                            title="حار وسبايسي"
                            className="p-0.5 px-1.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold flex items-center gap-0.5"
                          >
                            <Flame className="w-2.5 h-2.5" /> حار
                          </span>
                        )}
                        {item.tags?.includes('family') && (
                          <span
                            title="عائلي"
                            className="p-0.5 px-1.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-0.5"
                          >
                            <Users className="w-2.5 h-2.5" /> عائلي
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Item Name */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {/* Options Preview (if any) */}
                    {hasOptions && (
                      <div className="pt-1 flex flex-wrap gap-1">
                        {item.options!.map((opt) => (
                          <span
                            key={opt.label}
                            className="text-[10px] font-semibold bg-[#141414] text-white/80 px-1.5 py-0.5 rounded border border-white/5"
                          >
                            {opt.label}: <strong className="text-[#D4AF37]">{opt.price} ج.م</strong>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Served with detail */}
                    {item.servedWith && (
                      <p className="text-[11px] text-white/70 bg-[#141414] p-1.5 rounded-lg border border-white/5 font-medium">
                        <strong className="text-[#D4AF37]">يقدم مع:</strong> {item.servedWith}
                      </p>
                    )}
                  </div>

                  {/* Bottom: Price and Actions */}
                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                    {/* Price Block */}
                    <div className="flex flex-col">
                      <span className="text-[9px] text-white/40 font-bold">
                        {hasOptions && minPrice !== maxPrice ? 'يبدأ من' : 'السعر'}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-[#D4AF37]">
                          {minPrice}
                        </span>
                        {hasOptions && minPrice !== maxPrice && (
                          <span className="text-xs text-white/40 font-bold">
                            - {maxPrice}
                          </span>
                        )}
                        <span className="text-xs font-bold text-white/60">ج.م</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      {/* Details / Customize Button */}
                      <button
                        type="button"
                        onClick={() => onOpenModal(item)}
                        id={`btn-details-${item.id}`}
                        aria-label={`تفاصيل ${item.name}`}
                        className="p-2 rounded-xl bg-[#141414] border border-white/10 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>

                      {/* Add Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (hasOptions || (item.addons && item.addons.length > 0)) {
                            onOpenModal(item);
                          } else {
                            onQuickAdd(item);
                          }
                        }}
                        id={`btn-add-${item.id}`}
                        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c4a132] text-black font-extrabold text-xs shadow-xs transition-all active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 text-black" />
                        <span>{hasOptions ? 'تخصيص' : 'إضافة'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-3xl bg-[#0F0F0F] border border-white/5 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] text-[#D4AF37] flex items-center justify-center mx-auto text-2xl border border-white/5">
              🔍
            </div>
            <h3 className="text-xl font-extrabold text-white">
              لم نجد نتائج مطابقة لبحثك
            </h3>
            <p className="text-sm text-white/50">
              جرب البحث بكلمات أخرى أو تصفح الأقسام الرئيسية في القائمة.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-sm"
            >
              عرض جميع الأصناف
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

