export const ais = [
  {
    id: 2215,
    name: "〇〇で起業しろ！"
  },
  {
    id: 2214,
    name: "起業しろAI"
  },
  {
    id: 2325,
    name: "あなたっぽいア二メキャラ"
  },
  {
    id: 2207,
    name: "からあげかトイプードルか"
  },
  {
    id: 2090,
    name: "天才判定"
  }
];

export function getAIById(id) {
  return ais.find(ai => ai.id === id);
}
