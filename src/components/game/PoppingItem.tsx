import { type Component, createSignal, Match, onMount, Switch } from "solid-js";
import { PoppingItemDef } from "./GamePlay";
import gsap from "gsap";
import { Transition } from "solid-transition-group";
import { delay } from "~/utils/helpers";
import Star from "./Star";

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
  let container!: HTMLDivElement;
  let timeline: gsap.core.Timeline | null = null;
  const [key, setKey] = createSignal<"icon" | "points" | "none">("icon");

  onMount(() => {
    // TODO Update this to pick free space on screen and not overlap other items
    const randomXPercent = gsap.utils.random(15, 85);
    const randomYPercent = gsap.utils.random(15, 85);

    const randomRotation = gsap.utils.random([-6, 6]);
    const randomOffset = gsap.utils.random([5, 10]);

    timeline = gsap
      .timeline()
      .set(container, {
        rotate: randomRotation,
        x: randomOffset,
        top: `-20%`,
        left: `${randomXPercent}%`,
      })
      .to(
        container,
        {
          top: `${randomYPercent}%`,
          duration: 1,
          ease: "back.out(0.8)",
        },
        0,
      )
      .to(
        container,
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
        container,
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
      ref={container}
      class="pointer-events-none absolute flex size-24 -translate-1/2 items-center justify-center text-7xl leading-0 *:select-none"
    >
      <Transition
        mode="outin"
        onEnter={async (el, done) => {
          if (key() === "none") return console.log("none");

          gsap.fromTo(
            el,
            {
              scale: 0.5,
            },
            {
              scale: 1,
              duration: 0.15,
              ease: "back.out",
              onComplete: done,
            },
          );

          if (key() === "points") {
            await delay(1000);
            setKey("none");
            await delay(1000);
            onPop();
          }
        }}
        onExit={(el, done) => {
          gsap.fromTo(
            el,
            {
              scale: 1,
              opacity: 1,
            },
            {
              opacity: 0,
              scale: 0.5,
              duration: 0.15,
              onComplete: done,
            },
          );
        }}
      >
        <Switch>
          <Match when={key() === "icon"}>
            <div
              role="button"
              class="pointer-events-auto flex size-full items-center justify-center"
              onClick={async () => {
                setKey("points");
                if (timeline) timeline.kill();
              }}
            >
              {icon}
            </div>
          </Match>
          <Match when={key() === "points"}>
            <div class="bg-star relative flex size-full items-center justify-center rounded-full text-4xl font-extrabold">
              <Star className="absolute top-1/2 left-1/2 -z-1 -translate-1/2 scale-90" />

              {points}
            </div>
          </Match>
          <Match when={key() === "none"}>
            <div class="size-0" />
          </Match>
        </Switch>
      </Transition>
    </div>
  );
};

export default PoppingItem;
