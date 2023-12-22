import { AnimationClassName, Direction, SynchAnimation } from "@/const/const";
import { DataTheme } from "@/types/types";
import { ContextSafeFunc } from "@gsap/react";
import gsap from "gsap";
import { Dispatch, SetStateAction, useState } from "react";

type AnimationProps = {
  contextSafe: ContextSafeFunc;
  data: DataTheme[];
  currentThemeIndex: number;
  startYear: number;
  endYear: number;
  setStartYearHandler: Dispatch<SetStateAction<number>>;
  setEndYearHandler: Dispatch<SetStateAction<number>>;
};

export const useAnimationCirclePagination = () => {
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [oldCurrentIndex, setOldCurrentIndex] = useState(0);
  const [oldIsStart, setOldIsStart] = useState(true);
  const [oldIsEnd, setOldIsEnd] = useState(false);

  const animation = ({
    contextSafe,
    currentThemeIndex,
    data,
    startYear,
    endYear,
    setStartYearHandler,
    setEndYearHandler,
  }: AnimationProps) => {
    const onStartAnimation = contextSafe(() => {
      const angle = 360 / data.length;
      const isStart = currentThemeIndex === 0;
      const isEnd = currentThemeIndex === data.length - 1;
      const isBoundaryForward =
        oldIsEnd &&
        oldCurrentIndex === data.length - 1 &&
        currentThemeIndex === 0;
      const isBoundaryBackward =
        oldIsStart &&
        oldCurrentIndex === 0 &&
        currentThemeIndex === data.length - 1;
      let direction;
      if (isBoundaryForward) {
        direction = Direction.Backward;
      } else if (isBoundaryBackward) {
        direction = Direction.Forward;
      } else if (currentThemeIndex > oldCurrentIndex) {
        direction = Direction.Forward;
      } else {
        direction = Direction.Backward;
      }
      direction =
        oldCurrentIndex === currentThemeIndex ? Direction.None : direction;
      const rotateBoundary = isBoundaryForward
        ? `-=${angle}deg`
        : `+=${angle}deg`;
      const rotateBoundaryReverse = isBoundaryForward
        ? `+=${angle}deg`
        : `-=${angle}deg`;
      const countStep = Math.abs(currentThemeIndex - oldCurrentIndex);

      const startYearTarget = {
        value: startYear,
      };

      const endYearTarget = {
        value: endYear,
      };

      const indexYear =
        direction === Direction.Forward
          ? isStart
            ? 0
            : currentThemeIndex
          : isEnd
          ? data.length - 1
          : currentThemeIndex;

      gsap
        .timeline({
          onStart: () => setIsAnimationActive(true),
          onComplete: () => setIsAnimationActive(false),
        })
        .to(
          `.${AnimationClassName.Slider}`,
          { opacity: 0, duration: 0 },
          SynchAnimation.One
        )
        .to(
          startYearTarget,
          {
            value: `+=${data[indexYear].startYear - startYear}`,
            roundProps: "value",
            ease: "expo.out",
            onUpdate: () => {
              setStartYearHandler(startYearTarget.value);
            },
          },
          SynchAnimation.One
        )
        .to(
          endYearTarget,
          {
            value: `+=${data[indexYear].endYear - endYear}`,
            roundProps: "value",
            ease: "expo.out",
            onUpdate: () => {
              setEndYearHandler(endYearTarget.value);
            },
          },
          SynchAnimation.One
        )
        .to(
          `.${AnimationClassName.ThemeText}`,
          { opacity: 0 },
          SynchAnimation.One
        )
        .to(
          `.${AnimationClassName.ThemeTextMobile}`,
          { opacity: 0 },
          SynchAnimation.One
        )
        .to(
          `.${AnimationClassName.ThemesCircle}`,
          {
            rotate:
              isBoundaryForward || isBoundaryBackward
                ? rotateBoundary
                : `${direction === Direction.Forward ? "-" : "+"}=${
                    countStep * angle
                  }deg`,
          },
          SynchAnimation.One
        )
        .to(
          `.${AnimationClassName.ThemeCircle}`,
          {
            rotate:
              isBoundaryForward || isBoundaryBackward
                ? rotateBoundaryReverse
                : `${direction === Direction.Forward ? "+" : "-"}=${
                    countStep * angle
                  }deg`,
          },
          SynchAnimation.One
        )
        .to(
          `.${AnimationClassName.Slider}`,
          { y: 10, duration: 0 },
          SynchAnimation.Two
        )
        .to(
          `.${AnimationClassName.ThemeTextMobile}`,
          { y: 10, duration: 0 },
          SynchAnimation.Two
        )
        .to(
          `.${AnimationClassName.Slider}`,
          { opacity: 1 },
          SynchAnimation.Three
        )
        .to(
          `.${AnimationClassName.ThemeText}-${
            direction === Direction.Forward
              ? isStart
                ? 0
                : currentThemeIndex
              : isEnd
              ? data.length - 1
              : currentThemeIndex
          }`,
          {
            opacity: 1,
          },
          SynchAnimation.Three
        )
        .to(
          `.${AnimationClassName.ThemeTextMobile}`,
          { opacity: 1 },
          SynchAnimation.Three
        )
        .to(`.${AnimationClassName.Slider}`, { y: 0 }, SynchAnimation.Three)
        .to(
          `.${AnimationClassName.ThemeTextMobile}`,
          { y: 0 },
          SynchAnimation.Three
        );

      setOldCurrentIndex(currentThemeIndex);
      setOldIsStart(isStart);
      setOldIsEnd(isEnd);
    });

    !isAnimationActive && onStartAnimation();
  };

  return {
    animation,
    isAnimationActive,
  };
};
