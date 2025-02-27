"use client";

import styled from "styled-components";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

interface CopyProps {
    content: {
      json: Document;
    };
}

const StyledParagraph = styled.p`
  font-size: 1rem;
  margin-bottom: var(--space-4);
  padding-inline: var(--space-12);
  text-align: justify;
`;


export default function CopyText({ content }: CopyProps) {
  return (
    <StyledParagraph>
      {content && documentToReactComponents(content.json)}
    </StyledParagraph>
  );
}
