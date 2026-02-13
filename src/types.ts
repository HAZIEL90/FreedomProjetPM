export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url?: string;
  sizes: string[];
  stock: number;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}
