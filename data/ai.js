export const ais = [
  {
    id: 2215,
    name: "〇〇で起業しろ！"
  },
  {
    id: 2214,
    name: "起業しろAI"
  }
];

export function getAIById(id) {
  return ais.find(ai => ai.id === id);
}
