import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { EmblaCarouselType } from "embla-carousel";

import LeftArrow from "../../public/icons/arrow-left-long-sharp-solid.svg";
import RightArrow from "../../public/icons/arrow-right-long-sharp-solid.svg";
import styled from "styled-components";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

const EmblaButton = styled.button`
  -webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  display: inline-flex;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
  box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
  width: 3.6rem;
  height: 3.6rem;
  z-index: 0;
  border-radius: 50%;
  color: var(--text-body);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <EmblaButton
      type="button"
      {...restProps}
    >
      <Image src={LeftArrow} alt="previous slide" width={40} height={20} />
      {children}
    </EmblaButton>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <EmblaButton
      type="button"
      {...restProps}
    >
      <Image src={RightArrow} alt="next slide" width={40} height={20} />
      {children}
    </EmblaButton>
  );
};
