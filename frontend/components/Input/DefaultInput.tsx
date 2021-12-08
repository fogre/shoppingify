import styled from 'styled-components';

interface props {
  borderColor: string;
  width: number
}

const Input = ({ borderColor, width, ...delegated }: props) => (
  <StyledInput
    type='text'
    style={{
      '--borderColor': borderColor,
      '--width': `${width}px`
    }}
    {...delegated}
  />
);

const StyledInput = styled.input`
  border: 2px solid;
  border-color: var(--borderColor, var(--color-grey-74));
  border-radius: var(--radius-normal);
  box-shadow: var(--shadow-primary);
  padding: 10px 16px;
  outline: none;
  width: var(--width, 100%);
  
  & ::placeholder {
    font-size: var(--font-small);
    color: var(--color-grey-74);
  }

  & :hover ::placeholder {
    color: var(--color-grey-27);
  }

  & :hover {
    box-shadow: var(--shadow-secondary);
  }

  & :focus {
    border-color: var(--color-primary);
  }
`;

export default Input;