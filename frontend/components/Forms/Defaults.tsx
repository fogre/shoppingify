import styled from 'styled-components';
import { Field, Form } from 'formik';

import { Button } from '@/components/Buttons';

export const ErrorMessage = styled.p`
  font-size: var(--font-small);
  color: var(--color-danger);
  text-align: center;
  margin-top: 6px;
`;

export const FieldWrapper = styled.div`
  margin-bottom: 18px;

  &:focus-within {
    color: var(--color-primary);
  }
`;

export const handleFocus = (ref: HTMLDivElement | undefined) => {
  //a hack to wait for the mobile keyboard to pop up and only after that focus
  setTimeout(() => {
    ref?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, 500);
};

export const Input = styled(Field)`
  border: 2px solid;
  border-color: var(--borderColor, var(--color-grey-74));
  border-radius: var(--radius-normal);
  box-shadow: var(--shadow-primary);
  padding: 17px 17px;
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

export const Label = styled.label`
  font-size: var(--font-small);
  display: block;
  margin-bottom: 4px;
`;

export const LoginStyledForm = styled(Form)`
  margin-top: var(--form-margin);
`;

export const LoginButton = styled(Button)`
  padding: 10px 16px;
  background-color: var(--color-secondary);
`;

export const TextArea = styled(Input).attrs(() => ({
  as: 'textarea'
}))`
  height: 10ch;
  resize: none;
`;
