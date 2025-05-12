import { type Component, createSignal, Match, onMount, Switch } from "solid-js";
import { PoppingItemDef } from "./GamePlay";
import gsap from "gsap";
import CustomEase from "gsap/dist/CustomEase";
import { Transition } from "solid-transition-group";
import { delay } from "~/utils/helpers";

gsap.registerPlugin(CustomEase);

export type PoppingItemProps = PoppingItemDef & {
  onPop: () => void;
  onTimelineComplete: () => void;
};

const PoppingItem: Component<PoppingItemProps> = ({
  icon,
  points,
  onPop,
  onTimelineComplete,
}) => {
  let el!: HTMLDivElement;
  let timeline: gsap.core.Timeline | null = null;
  const [key, setKey] = createSignal("icon");

  onMount(() => {
    const randomXPercent = gsap.utils.random(15, 85);
    const randomYPercent = gsap.utils.random(15, 85);

    const randomRotation = gsap.utils.random([-6, 6]);
    const randomOffset = gsap.utils.random([5, 10]);

    gsap.set(el, {
      top: `-20%`,
      left: `${randomXPercent}%`,
    });

    timeline = gsap
      .timeline()
      .set(el, {
        rotate: randomRotation,
        x: randomOffset,
      })
      .to(
        el,
        {
          top: `${randomYPercent}%`,
          duration: 1,
          ease: "back.out(0.8)",
        },
        0,
      )
      .to(
        el,
        {
          rotate: -randomRotation,
          x: -randomOffset,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          duration: 3,
        },
        0,
      )
      .to(
        el,
        {
          top: `120%`,
          duration: 1,
          ease: "slow",
          onComplete: onTimelineComplete,
        },
        5,
      );
  });

  return (
    <div
      ref={el}
      class="absolute flex size-30 -translate-1/2 items-center justify-center text-7xl leading-[0.8] *:select-none"
      onClick={async () => {
        setKey("points");
        if (timeline) timeline.kill();
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
