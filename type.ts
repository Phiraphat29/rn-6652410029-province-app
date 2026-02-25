export type Location = {
  id: number;
  name: string;
  description: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  image_url: string;
  created_at: string;
};

export type Festival = {
  id: number;
  name: string;
  description: string;
  period: string;
  image_url: string;
};
