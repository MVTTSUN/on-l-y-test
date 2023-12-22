import styled from "styled-components";
import ArrowLeftNavigation from "../../public/images/arrow-left-navigation.svg";
import ArrowRightNavigation from "../../public/images/arrow-right-navigation.svg";
import { DataTheme } from "@/types/types";
import { ResetButton, ResetText } from "@/mixins/mixins";
import { Color } from "@/const/const";
import { useResize } from "@/hooks/useResize";
import { Dispatch, SetStateAction } from "react";

type NavigationThemesProps = {
  data: DataTheme[];
  setCurrentThemeIndexHandler: Dispatch<SetStateAction<number>>;
  currentThemeIndex: number;
  startYear: number;
  setStartYearHandler: Dispatch<SetStateAction<number>>;
  endYear: number;
  setEndYearHandler: Dispatch<SetStateAction<number>>;
  isAnimationActive: boolean;
};

export function NavigationThemes(props: NavigationThemesProps) {
  const {
    data,
    setCurrentThemeIndexHandler,
    currentThemeIndex,
    isAnimationActive,
  } = props;
  const { isSmallScreen } = useResize();

  const clickForward = () => {
    if (!isAnimationActive) {
      if (currentThemeIndex < data.length - 1) {
        setCurrentThemeIndexHandler((prevState) => prevState + 1);
      } else {
        setCurrentThemeIndexHandler(0);
      }
    }
  };

  const clickBackward = () => {
    if (!isAnimationActive) {
      if (currentThemeIndex > 0) {
        setCurrentThemeIndexHandler((prevState) => prevState - 1);
      } else {
        setCurrentThemeIndexHandler(data.length - 1);
      }
    }
  };

  return (
    <Container>
      <NavigationSliceProgress>
        {currentThemeIndex + 1 < 10
          ? `0${currentThemeIndex + 1}`
          : currentThemeIndex + 1}
        /{data.length - 1 < 10 ? `0${data.length}` : data.length}
      </NavigationSliceProgress>
      <ButtonNavigationContainer>
        <ButtonNavigation type="button" onClick={clickBackward}>
          <ArrowLeftNavigation height={isSmallScreen ? 6.25 : 12.5} />
        </ButtonNavigation>
        <ButtonNavigation type="button" onClick={clickForward}>
          <ArrowRightNavigation height={isSmallScreen ? 6.25 : 12.5} />
        </ButtonNavigation>
      </ButtonNavigationContainer>
      <ProgressBar>
        {data.map((item, index) => (
          <Step key={item.id} $isActive={index === currentThemeIndex} />
        ))}
      </ProgressBar>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 780px) {
    order: 1;
    padding: 0 20px;
  }

  @media screen and (max-width: 560px) {
    padding: 0;
    gap: 10px;
  }
`;

const NavigationSliceProgress = styled.p`
  ${ResetText}
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;

const ButtonNavigationContainer = styled.div`
  display: flex;
  gap: 20px;

  @media screen and (max-width: 560px) {
    gap: 8px;
  }
`;

const ButtonNavigation = styled.button`
  ${ResetButton}
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  border: 1px solid ${`${Color.BlackBlue}50`};
  border-radius: 50%;

  @media screen and (max-width: 560px) {
    width: 25px;
    height: 25px;
  }
`;

const ProgressBar = styled.div`
  display: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;

  @media screen and (max-width: 780px) {
    display: flex;
    gap: 10px;
  }

  @media screen and (max-width: 560px) {
    bottom: 21px;
    transform: translateX(-61%);
  }
`;

const Step = styled.div<{ $isActive: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${Color.BlackBlue};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.4)};
  transition: opacity 0.3s ease-in-out;

  @media screen and (max-width: 560px) {
    width: 6px;
    height: 6px;
  }
`;
