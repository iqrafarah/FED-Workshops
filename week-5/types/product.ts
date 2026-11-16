export type Product = {
  id: number;
  external_id: number | null;
  title: string;
  price: number;
  description: string | null;
  category: string | null;
  image_url: string | null;
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
};
