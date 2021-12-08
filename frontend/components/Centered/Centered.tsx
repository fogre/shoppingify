import styled from  'styled-components';

const Centered = ({ children }: { children: React.ReactNode }) => (
  <Wrapper>
    {children}
  </Wrapper>  
);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-h2);
  font-weight: 700;
`;

export default Centered;