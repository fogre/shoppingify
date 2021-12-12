import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { COLORS, QUERIES } from '@/constants';
import { AsideContext } from '@/context';

import { IconButton } from '@/components/Buttons';
import {
  HistoryIcon,
  ListIcon,
  StatsIcon
} from '@/components/Icons';

const MiddleActions = () => {
  const router = useRouter();
  const { hideAsideView } = useContext(AsideContext);

  return (
    <Wrapper>
      <LinkWrapper>
        <BorderThing visible={router.pathname === '/' ? true : false}/>
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
      </LinkWrapper>

      <LinkWrapper>
        <BorderThing visible={router.pathname === '/history' ? true : false}/>
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
      </LinkWrapper>

      <LinkWrapper>
        <BorderThing visible={router.pathname === '/statistics' ? true : false}/>
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
      </LinkWrapper>  
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

const LinkWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
`;

const BorderThing = styled('div')<{ visible: boolean }>`
  display: ${p => p.visible ? 'block' : 'none'};
  width: 6px;
  height: 140%;
  border-radius: 0 4px 4px 0;
  background-color: var(--color-primary);
  position: absolute;
  top: -20%;
  left: calc(var(--padding-nav) * -1);
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
  left: 100%;
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
