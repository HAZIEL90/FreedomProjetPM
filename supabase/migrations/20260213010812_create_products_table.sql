/*
  # Create products table for Freedom Projet PM store

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `category` (text) - Product category (zapatillas, ropa_hombre, ropa_mujer, gorras)
      - `price` (numeric) - Product price
      - `image_url` (text) - Product image URL
      - `sizes` (text[]) - Available sizes
      - `stock` (integer) - Available stock quantity
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (anyone can view products)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  image_url text,
  sizes text[] DEFAULT '{}',
  stock integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon
  USING (true);

-- Insert initial product data
INSERT INTO products (name, category, price, sizes, stock) VALUES
  -- Zapatillas
  ('Jordan 4', 'zapatillas', 150, ARRAY['38', '39', '40', '41', '42', '43', '44'], 15),
  ('Jordan 1', 'zapatillas', 120, ARRAY['38', '39', '40', '41', '42', '43', '44'], 20),
  ('Nike Dunk Low', 'zapatillas', 100, ARRAY['38', '39', '40', '41', '42', '43', '44'], 25),
  ('Nike Dunk Low Travis', 'zapatillas', 150, ARRAY['38', '39', '40', '41', '42', '43', '44'], 12),
  ('Adidas Bad Bunny', 'zapatillas', 150, ARRAY['38', '39', '40', '41', '42', '43', '44'], 10),
  
  -- Ropa Hombre
  ('Remera StreetWear', 'ropa_hombre', 100, ARRAY['S', 'M', 'L', 'XL', 'XXL'], 30),
  ('Pantalones Essentials', 'ropa_hombre', 150, ARRAY['S', 'M', 'L', 'XL', 'XXL'], 20),
  ('Buzo NBA', 'ropa_hombre', 150, ARRAY['S', 'M', 'L', 'XL', 'XXL'], 18),
  ('Buzo Balenciaga', 'ropa_hombre', 130, ARRAY['S', 'M', 'L', 'XL', 'XXL'], 15),
  ('Pantalon NBA', 'ropa_hombre', 120, ARRAY['S', 'M', 'L', 'XL', 'XXL'], 22),
  
  -- Ropa Mujer
  ('Pantalones Baggys', 'ropa_mujer', 120, ARRAY['XS', 'S', 'M', 'L', 'XL'], 25),
  ('Pantalones Wide Leg Clasicos', 'ropa_mujer', 190, ARRAY['XS', 'S', 'M', 'L', 'XL'], 15),
  ('Blazers', 'ropa_mujer', 140, ARRAY['XS', 'S', 'M', 'L', 'XL'], 12),
  ('Chalecos Sastreros', 'ropa_mujer', 100, ARRAY['XS', 'S', 'M', 'L', 'XL'], 20),
  ('Corsset', 'ropa_mujer', 160, ARRAY['XS', 'S', 'M', 'L', 'XL'], 18),
  
  -- Gorras
  ('Gorra Cerrada L.A', 'gorras', 200, ARRAY['Única'], 10),
  ('Gorra Cerrada N.Y', 'gorras', 190, ARRAY['Única'], 12),
  ('Gorra Cerrada Red Bull', 'gorras', 250, ARRAY['Única'], 8),
  ('Gorra Cerrada Golden State Warriors', 'gorras', 195, ARRAY['Única'], 15);