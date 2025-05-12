import { createEffect, createSignal, For } from "solid-js";
import { pickRandomEmoji } from "~/utils/emojis";
import PoppingItem from "./PoppingItem";
import { createRandomId } from "~/utils/helpers";

export type PoppingItemDef = {
  icon: string;
  points: number;
  id: string;
};

const GamePlay = () => {
  const [activeItems, setActiveItems] = createSignal<Array<PoppingItemDef>>([]);

  createEffect(() => {
    const timeout = setInterval(() => {
      if (activeItems().length < 5)
        setActiveItems((prev) => [
          ...prev,
          {
            id: createRandomId(),
            points: 10,
            icon: pickRandomEmoji(),
          },
        ]);
    }, 600);

    return () => clearTimeout(timeout);
  });

  const removeItem = (itemId: string) => {
    setActiveItems((prev) => prev.filter((prevItem) => prevItem.id !== itemId));
  };

  return (
    <div class="bg-rings relative size-full overflow-hidden">
      <For each={activeItems()}>
        {(item) => (
          <PoppingItem
            {...item}
            onPop={() => {
              removeItem(item.id);
              // TODO set collected points to state
            }}
            onTimelineComplete={() => removeItem(item.id)}
          />
        )}
      </For>
    </div>
  );
};

export default GamePlay;
