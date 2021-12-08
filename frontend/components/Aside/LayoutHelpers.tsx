import styled from 'styled-components';

export const BottomActions = ({ grey, children }: { grey: boolean, children: React.ReactNode }) => (
    <BottomActionsWrapper grey={grey}>
      {children}
    </BottomActionsWrapper>
);
//--bottom-actions-height is controlled by Aside.tsx
const BottomActionsWrapper = styled.div`
  background-color: ${p => p.grey ? 'var(--color-grey-95)' : 'white'};
  width: 100%;
  height: var(--bottom-actions-height);
  position: absolute;
  left: 0;
  bottom: 0px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: var(--padding-main);
`;

export const Scrollable = ({ children }: { children: React.ReactNode }) => (
  <ScrollableWrapper>
    {children}
  </ScrollableWrapper>    
);

const ScrollableWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: var(--padding-top) var(--padding-main) 0;
`;

export const ScrollContent = (
  { margin, children }: { margin: number, children: React.ReactNode }
) => (
  <ScrollContentWrapper style={{
    '--margin-top': `${margin}px`
  }}>
    {children}
  </ScrollContentWrapper>
);

//--bottom-actions-height is controlled by Aside.tsx
const ScrollContentWrapper = styled.div`
  margin-top: var(--margin-top, 0);
  padding-bottom: var(--bottom-actions-height);
`;