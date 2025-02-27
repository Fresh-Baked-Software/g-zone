/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import styled from "styled-components";

import { PrevButton, NextButton, usePrevNextButtons } from "./CarouselButtons";

interface ImageProps {
  images: {
    sys: {
      id: string;
    };
    altText: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
  }[];
}

const Embla = styled.div`
  max-width: 80rem;
  margin: auto;
  --slide-height: 50rem;
  --slide-spacing: 1rem;
  --slide-size: 100%;
`;

const EmblaViewport = styled.div`
  overflow: hidden;
  width: 100%;
`;

const EmblaContainer = styled.div`
  display: flex;
  touch-action: pan-y pinch-zoom;
  margin-left: calc(var(--slide-spacing) * -1);
`;

const EmblaSlide = styled.div`
  transform: translate3d(0, 0, 0);
  flex: 0 0 auto;
  min-width: 0;
  padding-left: var(--slide-spacing);
  max-width: 100%;
`;

const EmblaControls = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  gap: 1.2rem;
  margin-top: 1.8rem;
`;

const EmblaButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  align-items: center;
`;

const EmblaCarousel: React.FC<ImageProps> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <Embla>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          {images.map((image) => (
            <EmblaSlide key={image.sys.id}>
              <img src={image.image.url} alt={image.altText} height={500} />
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </EmblaViewport>

      <EmblaControls>
        <EmblaButtons>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </EmblaButtons>
      </EmblaControls>
    </Embla>
  );
};

export default EmblaCarousel;
