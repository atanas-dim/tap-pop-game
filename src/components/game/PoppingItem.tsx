import { type Component, createSignal, Match, onMount, Switch } from "solid-js";
import { PoppingItemDef } from "./GamePlay";
import gsap from "gsap";
import CustomEase from "gsap/dist/CustomEase";
import { Transition } from "solid-transition-group";
import { delay } from "~/utils/helpers";

gsap.registerPlugin(CustomEase);

export type PoppingItemProps = PoppingItemDef & { onPop: () => void };

const PoppingItem: Component<PoppingItemProps> = ({ icon, points, onPop }) => {
  let el!: HTMLDivElement;
  let tween: gsap.core.Tween | null = null;
  const [key, setKey] = createSignal("icon");

  onMount(() => {
    const randomXPercent = gsap.utils.random(15, 85);
    const randomXOffset = gsap.utils.random(-10, 10);

    CustomEase.create(
      "poppiing-item-ease",
      "M0,0 C0,0 0.129,0.543 0.181,0.543 0.252,0.543 0.232,0.406 0.312,0.406 0.529,0.406 1,1 1,1",
    );

    tween = gsap.fromTo(
      el,
      {
        left: randomXPercent + "%",
        top: -20 + "%",
      },
      {
        left: randomXPercent + randomXOffset + "%",
        top: 120 + "%",
        duration: 16,
        ease: "poppiing-item-ease",
      },
    );
  });

  return (
    <div
      ref={el}
      class="absolute flex size-30 -translate-1/2 items-center justify-center text-7xl leading-[0.8] *:select-none"
      onClick={async () => {
        setKey("points");
        if (tween) tween.kill();
      }}
    >
      <Transition
        mode="outin"
        onEnter={async (el, done) => {
          // TODO Replace with gsap
          const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 300,
          });
          a.finished.then(done);

          if (key() === "points") {
            await delay(1000);
            setKey("none");
            await delay(1000);
            onPop();
          }
        }}
        onExit={(el, done) => {
          const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 200,
          });
          a.finished.then(done);
        }}
      >
        <Switch>
          <Match when={key() === "icon"}>
            <div class="flex size-full items-center justify-center">{icon}</div>
          </Match>
          <Match when={key() === "points"}>
            <div class="flex size-24 items-center justify-center rounded-full bg-rose-400 text-2xl font-extrabold">
              {points}
            </div>
          </Match>
          <Match when={key() === "none"}>
            <div class="size-full" />
          </Match>
        </Switch>
      </Transition>
    </div>
  );
};

export default PoppingItem;
