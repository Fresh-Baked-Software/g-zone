"use client";

import styled from "styled-components";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

import mq from "../../styles/theme/mq";

interface CopyProps {
    content: {
      json: Document;
    };
}

const StyledParagraph = styled.p`
  margin-bottom: var(--space-4);
  padding-inline: var(--space-12);
  text-align: justify;
  @media ${mq.mobile} {
    padding-inline: var(--space-2);
  }
`;

export default function CopyText({ content }: CopyProps) {
  return (
    <StyledParagraph>
      {content && documentToReactComponents(content.json)}
    </StyledParagraph>
  );
}
