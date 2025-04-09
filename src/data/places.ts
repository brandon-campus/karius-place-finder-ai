
import { Place } from "../types";

export const mockPlaces: Place[] = [
  {
    id: "1",
    name: "Café Tranquilo",
    description: "Un espacio acogedor para trabajar o estudiar con excelente wifi y enchufes en cada mesa. Ofrecen variedad de cafés de especialidad y pastelería artesanal.",
    image: "/placeholder.svg",
    tags: [
      { id: "t1", name: "tranquilo" },
      { id: "t2", name: "buen wifi" },
      { id: "t3", name: "enchufes" }
    ],
    priceRange: "$$",
    noiseLevel: "bajo",
    location: {
      address: "Calle Imaginaria 123",
      distance: 1.2
    },
    rating: 4.7,
    foodType: ["café", "pastelería", "brunch"]
  },
  {
    id: "2",
    name: "Rincón Romántico",
    description: "Restaurante con iluminación tenue, música suave y ambiente íntimo perfecto para citas. Su menú incluye platos para compartir y una extensa carta de vinos.",
    image: "/placeholder.svg",
    tags: [
      { id: "t4", name: "romántico" },
      { id: "t5", name: "cena" },
      { id: "t6", name: "vinos" }
    ],
    priceRange: "$$$",
    noiseLevel: "bajo",
    location: {
      address: "Avenida del Amor 45",
      distance: 2.5
    },
    rating: 4.9,
    foodType: ["mediterránea", "gourmet", "fusión"]
  },
  {
    id: "3",
    name: "Espacio Cowork",
    description: "Cafetería con zonas de trabajo, salas de reuniones privadas y ambiente profesional. Ideal para trabajadores remotos y emprendedores.",
    image: "/placeholder.svg",
    tags: [
      { id: "t7", name: "coworking" },
      { id: "t8", name: "profesional" },
      { id: "t2", name: "buen wifi" }
    ],
    priceRange: "$$",
    noiseLevel: "medio",
    location: {
      address: "Calle Productividad 78",
      distance: 0.8
    },
    rating: 4.5,
    foodType: ["café", "bowls", "snacks saludables"]
  },
  {
    id: "4",
    name: "La Terraza Verde",
    description: "Restaurante al aire libre con juegos para niños y menú familiar. Perfecto para almuerzos de fin de semana en familia.",
    image: "/placeholder.svg",
    tags: [
      { id: "t9", name: "familiar" },
      { id: "t10", name: "terraza" },
      { id: "t11", name: "juegos infantiles" }
    ],
    priceRange: "$$",
    noiseLevel: "alto",
    location: {
      address: "Parque Central, Entrada Norte",
      distance: 3.1
    },
    rating: 4.3,
    foodType: ["americana", "hamburguesas", "ensaladas"]
  },
  {
    id: "5",
    name: "Oficina Nómada",
    description: "Combinación perfecta de café y espacio de trabajo. Membresías diarias y mensuales disponibles, con internet de alta velocidad.",
    image: "/placeholder.svg",
    tags: [
      { id: "t7", name: "coworking" },
      { id: "t12", name: "silencioso" },
      { id: "t13", name: "reuniones" }
    ],
    priceRange: "$",
    noiseLevel: "bajo",
    location: {
      address: "Calle Innovación 56",
      distance: 1.5
    },
    rating: 4.8,
    foodType: ["café", "sandwiches", "batidos"]
  },
  {
    id: "6",
    name: "Bistró del Chef",
    description: "Restaurante íntimo con menú degustación y maridaje de vinos. Ideal para ocasiones especiales y cenas románticas.",
    image: "/placeholder.svg",
    tags: [
      { id: "t4", name: "romántico" },
      { id: "t14", name: "gourmet" },
      { id: "t15", name: "exclusivo" }
    ],
    priceRange: "$$$",
    noiseLevel: "bajo",
    location: {
      address: "Calle Gastronomía 34",
      distance: 4.2
    },
    rating: 4.9,
    foodType: ["francesa", "autor", "degustación"]
  }
];
