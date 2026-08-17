export interface PriceOption {
  label: string;
  price: number;
}

export interface MenuItemAddon {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  description: string;
  basePrice: number;
  options?: PriceOption[];
  servedWith?: string;
  addons?: MenuItemAddon[];
  tags?: ('popular' | 'spicy' | 'family' | 'box' | 'new')[];
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  iconName?: string;
  description?: string;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  selectedOption?: PriceOption;
  selectedAddons?: MenuItemAddon[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  shortAddress: string;
  phone?: string;
  hotline: string;
  googleMapsUrl: string;
  workingHours: string;
  isMain?: boolean;
}
