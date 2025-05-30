// TODO Replace with PNGs for consistency in all browsers
const EMOJIS = [
  "🍎",
  "🍌",
  "🍍",
  "🍇",
  "🍉",
  "🍓",
  "🍒",
  "🍊",
  "🍋",
  "🍑", // Fruits
  "🥭",
  "🍒",
  "🍍",
  "🍋",
  "🍏",
  "🍅",
  "🥝",
  "🍠",
  "🥕", // More fruits & vegetables
  "🥬",
  "🥒",
  "🍆",
  "🌶",
  "🍄",
  "🍪",
  "🍫",
  "🍩",
  "🍰",
  "🍜", // Food items
  "🍣",
  "🥗",
  "🍕",
  "🍔",
  "🌮",
  "🍦",
  "🍻",
  "🍺",
  "🥤", // More food and drinks
  "⚡",
  "💥",
  "🔥",
  "🌈",
  "🌟",
  "🌙",
  "🎉",
  "🎁",
  "🎈",
  "🎤", // Fun objects and symbols
  "🚀",
  "🛸",
  "🎮",
  "🎲",
  "🕹",
  "🧩",
  "🔮",
  "📱",
  "💻",
  "📸", // Technology and games
  "💎",
  "🔑",
  "🛍",
  "🎬",
  "⏰",
  "🎩",
  "🎒",
  "👓",
  "🕶",
  "🧸", // Miscellaneous items
];

export const pickRandomEmoji = () => {
  const randomIndex = Math.floor(Math.random() * EMOJIS.length);
  return EMOJIS[randomIndex];
};
