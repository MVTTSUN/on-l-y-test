import styled from "styled-components";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { useEffect, useRef, useState } from "react";
import { ResetButton, ResetText } from "@/mixins/mixins";
import { AnimationClassName, Color } from "@/const/const";
import ArrowRightPagination from "../../public/images/arrow-right-pagination.svg";
import ArrowLeftPagination from "../../public/images/arrow-left-pagination.svg";
import { useResize } from "@/hooks/useResize";
import { YearSlice } from "@/types/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type SliderProps = {
  data: YearSlice[];
};

export function Slider(props: SliderProps) {
  const { data } = props;
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperCore>();
  const { isLargeScreen, isHighMediumScreen, isSmallScreen } = useResize();

  const getPositionSlider = (swiper: SwiperCore) => {
    setActiveIndex(swiper.activeIndex);
    swiper.isBeginning ? setIsBeginning(true) : setIsBeginning(false);
    swiper.isEnd ? setIsEnd(true) : setIsEnd(false);
  };

  useEffect(() => {
    setIsEnd(false);
    setIsBeginning(true);
    setActiveIndex(0);
    swiperRef.current.slideTo(0);
  }, [data]);

  return (
    <Container className={AnimationClassName.Slider}>
      {!isBeginning && (
        <ButtonPagination
          type="button"
          $isBeginningButton
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowLeftPagination height={10} />
        </ButtonPagination>
      )}
      <SwiperStyled
        modules={[A11y, Navigation]}
        spaceBetween={isLargeScreen || isHighMediumScreen ? 80 : 25}
        slidesPerView={isLargeScreen ? 3 : isSmallScreen ? 1.7 : 2}
        scrollbar={{ draggable: true }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSwiper={getPositionSlider}
        onSlideChange={getPositionSlider}
      >
        {data.map((year, index) => (
          <SwiperSlideStyled
            key={year.id}
            $isActive={activeIndex === index || !isSmallScreen}
          >
            <PaginationYear>{year.year}</PaginationYear>
            <PaginationText>{year.text}</PaginationText>
          </SwiperSlideStyled>
        ))}
      </SwiperStyled>
      {!isEnd && (
        <ButtonPagination
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowRightPagination height={10} />
        </ButtonPagination>
      )}
    </Container>
  );
}

const Container = styled.div`
  z-index: 5px;
  position: relative;
  padding: 0 80px;
  display: flex;
  gap: 20px;

  @media screen and (max-width: 780px) {
    padding: 0 20px;
    order: 0;
  }

  @media screen and (max-width: 560px) {
    padding: 0;
  }
`;

const SwiperStyled = styled(Swiper)`
  max-width: 1280px;
`;

const SwiperSlideStyled = styled(SwiperSlide)<{ $isActive: boolean }>`
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.4)};
  transition: opacity 0.3s ease-in-out;
`;

const PaginationYear = styled.p`
  ${ResetText}
  margin-bottom: 15px;
  font-family: "Bebas Neue";
  font-size: 25px;
  font-weight: 400;
  line-height: 120%;
  text-transform: uppercase;
  color: ${Color.Blue};

  @media screen and (max-width: 560px) {
    font-size: 16px;
  }
`;

const PaginationText = styled.p`
  ${ResetText}
  font-size: 20px;
  font-weight: 400;
  line-height: 150%;

  @media screen and (max-width: 560px) {
    font-size: 14px;
    line-height: 145%;
  }
`;

const ButtonPagination = styled.button<{ $isBeginningButton?: boolean }>`
  ${ResetButton}
  position: absolute;
  bottom: 40%;
  left: ${({ $isBeginningButton }) => $isBeginningButton && 20}px;
  right: ${({ $isBeginningButton }) => !$isBeginningButton && 20}px;
  width: 40px;
  height: 40px;
  background-color: ${Color.White};
  border-radius: 50%;
  filter: drop-shadow(0px 0px 15px ${`${Color.Blue}10`});

  @media screen and (max-width: 780px) {
    display: none;
  }
`;
