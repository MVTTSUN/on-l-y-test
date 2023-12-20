import {
  AnimationClassName,
  CIRCLE_SIZE,
  CIRCLE_SIZE_SMALL,
  Color,
} from "@/const/const";
import { useResize } from "@/hooks/useResize";
import { ResetButton, ResetText } from "@/mixins/mixins";
import { DataTheme } from "@/types/types";
import { calculateCoordinateInCircle } from "@/utils/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Dispatch, SetStateAction, useMemo } from "react";
import styled, { css } from "styled-components";

type ThemesCircleProps = {
  data: DataTheme[];
  currentThemeIndex: number;
  setCurrentThemeIndexHandler: Dispatch<SetStateAction<number>>;
  isAnimationActive: boolean;
};

export function ThemesCircle(props: ThemesCircleProps) {
  const {
    data,
    currentThemeIndex,
    setCurrentThemeIndexHandler,
    isAnimationActive,
  } = props;
  const { isLowMediumScreen } = useResize();
  const circleSize = isLowMediumScreen ? CIRCLE_SIZE_SMALL : CIRCLE_SIZE;
  const coordinates = useMemo(
    () => calculateCoordinateInCircle(data.length, circleSize / 2),
    [circleSize]
  );

  const changeThemeIndex = (index: number) => {
    if (!isAnimationActive) {
      setCurrentThemeIndexHandler(index);
    }
  };

  useGSAP(() => {
    gsap.to(`.${AnimationClassName.ThemeText}-${currentThemeIndex}`, {
      opacity: 1,
    });
  });

  return (
    <Container $size={circleSize} className={AnimationClassName.ThemesCircle}>
      {data.map((theme, index) => (
        <ThemeCircleWrapper
          key={theme.id}
          $top={coordinates[index].y}
          $left={coordinates[index].x}
          className={AnimationClassName.ThemeCircle}
        >
          <ThemeCircleButton
            $isActive={currentThemeIndex === index}
            onClick={() => changeThemeIndex(index)}
          >
            {index + 1}
          </ThemeCircleButton>
          <ThemeText
            className={`${AnimationClassName.ThemeText}-${index} ${AnimationClassName.ThemeText}`}
          >
            {theme.name}
          </ThemeText>
        </ThemeCircleWrapper>
      ))}
    </Container>
  );
}

const Container = styled.div<{ $size: number }>`
  position: absolute;
  z-index: 10;
  top: 215px;
  left: 50%;
  transform: translateX(-50%);
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 1px solid ${`${Color.BlackBlue}20`};
  border-radius: 50%;

  @media screen and (max-width: 780px) {
    top: 305px;
  }

  @media screen and (max-width: 560px) {
    display: none;
  }
`;

const ThemeText = styled.p`
  ${ResetText}
  font-size: 20px;
  font-weight: 700;
  line-height: 150%;
  opacity: 0;
`;

const ThemeCircleButton = styled.button<{ $isActive: boolean }>`
  ${ResetButton}
  flex: none;
  width: 56px;
  height: 56px;
  border: 1px solid ${`${Color.BlackBlue}70`};
  border-radius: 50%;
  font-size: 20px;
  font-weight: 400;
  line-height: 150%;
  color: ${Color.BlackBlue};
  background-color: ${Color.BlackBlue};
  transform: scale(0.107);
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;

  ${({ $isActive }) =>
    $isActive &&
    css`
      opacity: 1;
      transform: scale(1);
      background-color: ${Color.GreyLight};
    `}
`;

const ThemeCircleWrapper = styled.div<{ $top: number; $left: number }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;

  &:hover ${ThemeCircleButton} {
    opacity: 1;
    transform: scale(1);
    background-color: ${Color.GreyLight};
  }

  &:hover ${ThemeText} {
    opacity: 1;
  }
`;
