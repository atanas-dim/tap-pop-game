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
    const interval = setInterval(() => {
      if (activeItems().length < 5)
        setActiveItems((prev) => [
          ...prev,
          {
            id: createRandomId(),
            points: 10,
            icon: pickRandomEmoji(),
          },
        ]);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div class="relative size-full overflow-hidden">
      <For each={activeItems()}>
        {(item) => (
          <PoppingItem
            {...item}
            onPop={() =>
              setActiveItems((prev) =>
                prev.filter((prevItem) => prevItem.id !== item.id),
              )
            }
          />
        )}
      </For>
    </div>
  );
};

export default GamePlay;
