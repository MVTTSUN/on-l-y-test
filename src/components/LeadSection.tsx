import { AnimationClassName, Color } from "@/const/const";
import { ResetHeading, ResetText } from "@/mixins/mixins";
import styled from "styled-components";
import HorizontalLineTitle from "../../public/images/horizontal-line-title.svg";
import { useEffect, useMemo, useRef, useState } from "react";
import { generateFakeData } from "@/utils/utils";
import { Slider } from "@/components/Slider";
import { useResize } from "@/hooks/useResize";
import { NavigationThemes } from "@/components/NavigationThemes";
import { ThemesCircle } from "@/components/ThemesCircle";
import { useGSAP } from "@gsap/react";
import { useAnimationCirclePagination } from "@/hooks/useAnimationCirclePagination";

export function LeadSection() {
  const data = useMemo(() => generateFakeData(), []);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(data[currentThemeIndex]);
  const [startYear, setStartYear] = useState(currentTheme.startYear);
  const [endYear, setEndYear] = useState(currentTheme.endYear);
  const containerGSAP = useRef<HTMLDivElement>(null);
  const { isSmallScreen } = useResize();
  const { animation, isAnimationActive } = useAnimationCirclePagination();

  useGSAP(
    (_, contextSafe) => {
      animation({
        contextSafe,
        currentThemeIndex,
        data,
        startYear,
        endYear,
        setStartYearHandler: setStartYear,
        setEndYearHandler: setEndYear,
      });
    },
    {
      dependencies: [currentThemeIndex],
      scope: containerGSAP,
    }
  );

  useEffect(() => {
    setCurrentTheme(data[currentThemeIndex]);
    setStartYear(data[currentThemeIndex].startYear);
    setEndYear(data[currentThemeIndex].endYear);
  }, [currentThemeIndex]);

  return (
    <Container aria-label="Исторические данные" ref={containerGSAP}>
      <BorderContainer>
        <ThemesCircle
          data={data}
          currentThemeIndex={currentThemeIndex}
          setCurrentThemeIndexHandler={setCurrentThemeIndex}
          isAnimationActive={isAnimationActive}
        />
        <CenterVerticalLine />
        <HorizontalLine />
        <TitleContainer>
          {!isSmallScreen && <HorizontalLineTitle height={120} width={6} />}
          <Title>Исторические даты</Title>
        </TitleContainer>
        <YearsSliceContainer>
          <Year $color={Color.BlueAccent}>{startYear}</Year>
          <Year $color={Color.RoseAccent}>{endYear}</Year>
        </YearsSliceContainer>
        <ThemeText className={AnimationClassName.ThemeTextMobile}>
          {currentTheme.name}
        </ThemeText>
        <SliderContainer>
          <NavigationThemes
            data={data}
            setCurrentThemeIndexHandler={setCurrentThemeIndex}
            currentThemeIndex={currentThemeIndex}
            startYear={startYear}
            setStartYearHandler={setStartYear}
            endYear={endYear}
            setEndYearHandler={setEndYear}
            isAnimationActive={isAnimationActive}
          />
          <Slider data={currentTheme.years} />
        </SliderContainer>
      </BorderContainer>
    </Container>
  );
}

const BorderContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 1440px;
  padding: 170px 0 104px;
  border-right: 1px solid ${`${Color.BlackBlue}10`};
  border-left: 1px solid ${`${Color.BlackBlue}10`};

  @media screen and (max-width: 1200px) {
    padding: 100px 0 40px;
  }

  @media screen and (max-width: 780px) {
    padding: 50px 0 20px;
  }

  @media screen and (max-width: 560px) {
    padding: 59px 0 13px;
    border: none;
  }
`;

const Container = styled.section`
  position: relative;
  padding: 0 80px;
  background-color: ${Color.GreyLight};

  @media screen and (max-width: 1200px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 780px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 560px) {
    padding: 0 0 0 20px;
  }
`;

const CenterVerticalLine = styled.div`
  z-index: 0;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  width: 1px;
  background-color: ${`${Color.BlackBlue}10`};

  @media screen and (max-width: 560px) {
    display: none;
  }
`;

const HorizontalLine = styled.div`
  z-index: 0;
  position: absolute;
  top: 480px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: ${`${Color.BlackBlue}10`};

  @media screen and (max-width: 560px) {
    display: none;
  }
`;

const TitleContainer = styled.div`
  position: relative;
  z-index: 5;
  margin-bottom: 85px;
  display: grid;
  grid-template-columns: min-content min-content;
  align-items: center;
  gap: 75px;
  transform: translateX(-1px);

  @media screen and (max-width: 1200px) {
    margin-bottom: 205px;
  }

  @media screen and (max-width: 780px) {
    margin-bottom: 280px;
  }

  @media screen and (max-width: 560px) {
    margin-bottom: 53px;
  }
`;

const Title = styled.h1`
  ${ResetHeading}
  max-width: 353px;
  font-size: 56px;
  font-weight: 700;
  line-height: 67.2px;

  @media screen and (max-width: 1200px) {
    font-size: 36px;
    line-height: 47.2px;
  }

  @media screen and (max-width: 560px) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const YearsSliceContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 95px;
  transform: translateX(-17px);
  position: relative;
  z-index: 5;
  margin-bottom: 147px;

  @media screen and (max-width: 1200px) {
    transform: translateX(0);
  }

  @media screen and (max-width: 560px) {
    transform: translateX(-4px);
    gap: 26px;
    margin-bottom: 17px;
    margin-right: 20px;
  }
`;

const Year = styled.p<{ $color: string }>`
  ${ResetText}
  text-align: center;
  font-size: 200px;
  font-weight: 700;
  line-height: 160px;
  letter-spacing: -4px;
  color: ${({ $color }) => $color};

  @media screen and (max-width: 1200px) {
    font-size: 140px;
    line-height: 100px;
  }

  @media screen and (max-width: 780px) {
    font-size: 100px;
    line-height: 60px;
  }

  @media screen and (max-width: 560px) {
    font-size: 56px;
    line-height: normal;
    letter-spacing: -1.12px;
  }
`;

const ThemeText = styled.p`
  ${ResetText}
  display: none;
  padding-bottom: 10px;
  margin: 0 20px 21px 0;
  height: 30px;
  font-size: 20px;
  font-weight: 700;
  line-height: 150%;
  border-bottom: 1px solid ${Color.Grey};

  @media screen and (max-width: 560px) {
    display: block;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;

  @media screen and (max-width: 560px) {
    padding: 0;
    gap: 78px;
  }
`;
