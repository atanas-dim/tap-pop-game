import { createEffect, createSignal, For } from "solid-js";

const pickRandomEmoji = () => {
  const emojis = [
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

  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};

const GamePlay = () => {
  const [activeItems, setActiveItems] = createSignal<
    Array<{ points: number; icon: string }>
  >([]);

  createEffect(() => {
    const interval = setInterval(() => {
      if (activeItems().length < 5)
        setActiveItems((prev) => [
          ...prev,
          {
            points: 10,
            icon: pickRandomEmoji(),
          },
        ]);
    }, 1000);

    return () => clearInterval(interval);
  });

  createEffect(() => {
    console.log(activeItems());
  });

  return (
    <div class="relative size-full">
      <For each={activeItems()}>
        {(item) => (
          <div class="flex size-30 items-center justify-center text-7xl leading-[0.8]">
            {item.icon}
          </div>
        )}
      </For>
    </div>
  );
};

export default GamePlay;
