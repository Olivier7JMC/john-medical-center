export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl: string;
  longDescription?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  services: string[];
  imageUrl?: string;
  imagePosition?: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  fullDescription?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  imageUrl: string;
}
