import type { ReactElement } from 'react';
import styled from 'styled-components';

const LoginLayout = ({ children }: React.ReactNode) => (
  <Wrapper>
    <Card>
      {children}
    </Card>  
  </Wrapper>
);

export const getLoginLayout = (page: ReactElement) => (
  <LoginLayout>
    {page}
  </LoginLayout>
);

const Wrapper = styled.div`
  --main-margin: 32px;
  --form-margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const Card = styled.div`
  border: 2px solid var(--color-grey-95);
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-secondary);
  width: 400px;
  padding: 30px 20px 10px 20px;
`;