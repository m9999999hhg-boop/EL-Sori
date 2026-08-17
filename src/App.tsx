import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { MenuItemModal } from './components/MenuItemModal';
import { CartDrawer } from './components/CartDrawer';
import { BranchesSection } from './components/BranchesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { MenuItem, PriceOption, MenuItemAddon, CartItem } from './types';
import { Check } from 'lucide-react';

const CART_STORAGE_KEY = 'syrian_restaurant_cart_v1';

export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleOpenModal = (item: MenuItem) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = (
    item: MenuItem,
    selectedOption?: PriceOption,
    selectedAddons?: MenuItemAddon[],
    quantity = 1,
    notes?: string
  ) => {
    const basePrice = selectedOption ? selectedOption.price : item.basePrice;
    const addonsTotal = selectedAddons ? selectedAddons.reduce((sum, a) => sum + a.price, 0) : 0;
    const unitPrice = basePrice + addonsTotal;
    const totalPrice = unitPrice * quantity;

    // Generate unique identifier based on options & addons
    const optionKey = selectedOption ? selectedOption.label : 'base';
    const addonsKey = selectedAddons && selectedAddons.length > 0
      ? selectedAddons.map(a => a.id).sort().join(',')
      : 'none';
    const notesKey = notes || '';
    const cartItemId = `${item.id}_${optionKey}_${addonsKey}_${notesKey}`;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((ci) => ci.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: updated[existingIndex].unitPrice * newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          menuItemId: item.id,
          name: item.name,
          selectedOption,
          selectedAddons,
          quantity,
          unitPrice,
          totalPrice,
          notes,
        };
        return [...prevItems, newItem];
      }
    });

    showToast(`تمت إضافة "${item.name}" إلى سلة طلباتك`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    handleAddToCart(item);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((ci) =>
        ci.id === cartItemId
          ? {
              ...ci,
              quantity: newQuantity,
              totalPrice: ci.unitPrice * newQuantity,
            }
          : ci
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prevItems) => prevItems.filter((ci) => ci.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToMenu = useCallback((categoryId?: string) => {
    if (categoryId) {
      setSelectedCategoryId(categoryId);
    }
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-[#E4E3E0] pb-16 md:pb-0 selection:bg-[#D4AF37] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#141414] text-white text-sm font-bold shadow-2xl border border-[#D4AF37]/40 flex items-center gap-2.5 animate-scale">
          <div className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center text-black">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(catId) => scrollToMenu(catId)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onExploreMenu={() => scrollToMenu('all')} />

        {/* Dynamic Menu Section */}
        <MenuSection
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          onOpenModal={handleOpenModal}
          onQuickAdd={handleQuickAdd}
        />

        {/* Branches Section */}
        <BranchesSection />

        {/* About Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Floating Quick Action Bar */}
      <MobileQuickBar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onExploreMenu={() => scrollToMenu('all')}
      />

      {/* Item Details & Customization Modal */}
      <MenuItemModal
        item={modalItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Order Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
