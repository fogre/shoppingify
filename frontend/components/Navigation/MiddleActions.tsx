import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { COLORS, QUERIES } from '@/constants';
import { AsideContext } from '@/context';

import { IconButton } from '/components/Buttons';
import {
  HistoryIcon,
  ListIcon,
  StatsIcon
} from '/components/Icons';

const MiddleActions = () => {
  const { hideAsideView } = useContext(AsideContext);

  return (
    <Wrapper>
      <Link href='/'>
        <ContentLink>
          <IconButton
            size={26}
            color={COLORS.grey[27]}
            aria-label={'Open list menu'}
            onClick={() => hideAsideView()}
          >
            <ListIcon />
          </IconButton>
          <TooltipWrapper aria-hidden={true}>
            <Tooltip>list</Tooltip>
          </TooltipWrapper>
        </ContentLink>
      </Link>

      <Link href='/history'>
        <ContentLink>
          <IconButton
            size={26}
            color={COLORS.grey[27]}
            onClick={() => hideAsideView()}
          >
            <HistoryIcon />
          </IconButton>
          <TooltipWrapper aria-hidden={true}>
            <Tooltip>history</Tooltip>
          </TooltipWrapper>
        </ContentLink>     
      </Link>

      <Link href='/statistics'>
        <ContentLink>
          <IconButton
            size={26}
            color={COLORS.grey[27]}
            onClick={() => hideAsideView()}
          >
            <StatsIcon />
          </IconButton>
          <TooltipWrapper aria-hidden={true}>
            <Tooltip>statistics</Tooltip>
          </TooltipWrapper>
        </ContentLink>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: min(72px, 10vh);
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ContentLink = styled.a`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  isolation: isolate;
  z-index: 2;

  & :hover {
    cursor: pointer;
  }
`;

const TooltipWrapper = styled.span`
  color: var(--color-grey-27);
  font-size: var(--font-tiny);
  color: white;
  opacity: 0;
  position: absolute;
  top: 19%;
  left: 90%;
  display: flex;

  ${ContentLink}:hover & {
    opacity: 1;
  }

  @media ${QUERIES.tablet} {
    display: none;
  }
`;

const Tooltip = styled.p`
  display: inline-block;
  text-align: center;
  opacity: 1;
  text-align: center;
  border-radius: var(--radius-tiny);
  background: var(--color-grey-27);
  padding: 0px 10px;
`;

export default MiddleActions;
