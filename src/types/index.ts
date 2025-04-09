
export type PriceRange = "$" | "$$" | "$$$";

export type Mood = "trabajo" | "cita" | "familia" | "solo";

export type NoiseLevel = "bajo" | "medio" | "alto";

export interface Tag {
  id: string;
  name: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: Tag[];
  priceRange: PriceRange;
  noiseLevel: NoiseLevel;
  location: {
    address: string;
    distance: number; // in km
  };
  rating: number;
  foodType?: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: number;
}

export interface FilterOptions {
  noiseLevel: NoiseLevel[];
  priceRange: PriceRange[];
  maxDistance: number;
  foodTypes: string[];
  mood: Mood[];
}
