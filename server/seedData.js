/** Datos iniciales equivalentes al index.html original (solo título e imagen) */
const { randomUUID } = require("crypto");

function withIds(products) {
  return products.map((p) => {
    const id = randomUUID();
    return {
      id,
      title: p.title,
      image: p.image,
      detailPath: `/obra/${id}`,
      category: p.category,
    };
  });
}

const raw = [
  { title: "Ilustración 1", image: "pla1.png", description: "Descripción de ejemplo 1", category: "Ilustraciones" },
  { title: "Digital 1", image: "pla2.png", description: "Descripción de ejemplo 2", category: "Digital" },
  { title: "Acuarela 1", image: "pla3.png", description: "Descripción de ejemplo 3", category: "Acuarela" },
  { title: "Papel 1", image: "pla4.png", description: "Descripción de ejemplo 4", category: "Papel" },
  { title: "Ilustración 2", image: "pla5.png", description: "Descripción de ejemplo 5", category: "Ilustraciones" },
  { title: "Digital 2", image: "pla6.png", description: "Descripción de ejemplo 6", category: "Digital" },
  { title: "Acuarela 2", image: "pla7.png", description: "Descripción de ejemplo 7", category: "Acuarela" },
  { title: "Papel 2", image: "pla8.png", description: "Descripción de ejemplo 8", category: "Papel" },
  { title: "Ilustración 3", image: "pla9.png", description: "Descripción de ejemplo 9", category: "Ilustraciones" },
  { title: "Digital 3", image: "pla10.png", description: "Descripción de ejemplo 10", category: "Digital" },
  { title: "Acuarela 3", image: "pla11.png", description: "Descripción de ejemplo 11", category: "Acuarela" },
  { title: "Papel 3", image: "pla12.png", description: "Descripción de ejemplo 12", category: "Papel" },
];

module.exports = {
  seedProducts: () => withIds(raw),
};
