import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';

import Link from 'next/link';
import { useMutation } from 'urql';
import { Formik } from 'formik';
import styled from 'styled-components';

import { NotificationContext } from '@/context';
import { PingDocument, UserLoginDocument } from '@/graphql/generated';
import { setToken } from '@/utils/tokenUtils';

import { getLoginLayout } from '@/components/Layouts';
import { Button } from '@/components/Buttons';
import {
  ErrorMessage,
  FieldWrapper,
  Label,
  Input,
  LoginButton,
  LoginStyledForm
} from '@/components/Forms';
import { Icon, LogoIcon } from '@/components/Icons';

interface ValuesIF {
  email: string;
  password: string;
}

const DEFAULT_VALUES = {
  email: '',
  password: ''
};

const validateForm = (values: ValuesIF) => {
  const errors: { [field: string]: string } = {};
  if (!values.email.length) {
    errors.email = 'Email is required';
  }
  if (!values.password.length) {
    errors.password = 'Password is required';
  }
  return errors;
};

const LoginPage = () => {
  const router = useRouter();
  const { showNotification } = useContext(NotificationContext);
  const [, logInMutation] = useMutation(UserLoginDocument);
  //wake up the server
  const [result] = useQuery({
    query: PingDocument
  });

  if (result.error) {
    showNotification({
      type: 'error',
      message: 'Failed to connect to the server'
    });
  }

  const handleSubmit = async (values: ValuesIF) => {
    try {
      showNotification({
        type: 'success',
        message: 'Logging in...'
      });
      
      const result = await logInMutation(values);

      if (result.error) {
        showNotification({
          type: 'error',
          message: result.error.message
        });
      }
      if (result.data.userLogin) {
        setToken(
          result.data.userLogin.value
        );
        await router.push('/');
      }
    } catch (e) {
      console.log('Error in login:' , e);
    }
  };

  return (
    <>
      <HeadingWrapper>
        <Icon size={36}>
          <LogoIcon />
        </Icon>  
        <h2>Shoppingify</h2>
      </HeadingWrapper>
      <div>
        <h3>Log in</h3>
        <Formik
          initialValues={DEFAULT_VALUES}
          validate={values => validateForm(values)}
          onSubmit={values => handleSubmit(values)}
        >
          {({ isValid, dirty, errors, touched }) => {
            return (
              <LoginStyledForm>
                <FieldWrapper>
                  <Label>Email</Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter email'
                  />
                  {errors.email && touched.email &&
                    <ErrorMessage>{errors.email}</ErrorMessage>
                  }
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Password</Label>
                  <Input
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Enter password'
                  />
                  {errors.password && touched.password &&
                    <ErrorMessage>{errors.password}</ErrorMessage>
                  }
                </FieldWrapper>
                <ButtonWrapper>
                  <LoginButton
                    disabled={!isValid || !dirty}
                    type='submit'
                  >
                    Login
                  </LoginButton>
                  <TestAccountButton
                    type='button'
                    onClick={() => handleSubmit({
                      email: 'dev@user.com',
                      password: 'verysekret'
                    })}
                  >Login with test account
                  </TestAccountButton>  
                </ButtonWrapper>  
              </LoginStyledForm>
            );
          }}  
        </Formik>
      </div>  
      <LinkWrapper>
        <Link href='/register'>
          <StyledA>Don&apos;t have an account? <strong>Register</strong></StyledA>
        </Link>  
      </LinkWrapper>  
    </>
  );
};

LoginPage.getLayout = getLoginLayout;

const HeadingWrapper = styled.div`
  display: flex;
  gap: 16px;
  color: var(--color-primary);
  margin-bottom: var(--main-margin);
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
`;

const TestAccountButton = styled(Button)`
  background-color: var(--color-grey-27);
  padding: 6px 10px;
  height: min-content;

  & :hover {
    background-color: var(--color-secondary);
  }
`;

const LinkWrapper = styled.div`
  margin-top: var(--main-margin);
`;

const StyledA = styled.a`
  font-size: var(--font-small);

  strong {
    font-size: var(--font-medium);
  }

  & :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default LoginPage;

