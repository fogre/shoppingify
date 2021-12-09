import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation } from 'urql';
import { Formik } from 'formik';
import styled from 'styled-components';

import { NotificationContext } from '@/context';
import { UserCreateDocument } from '@/graphql/generated';

import { getLoginLayout } from '@/components/Layouts';
import { BackIconButton } from '@/components/Buttons';
import {
  ErrorMessage,
  FieldWrapper,
  Label,
  Input,
  LoginButton,
  LoginStyledForm
} from '@/components/Forms';

interface ValuesIF {
  email: string;
  emailCheck: string;
  password: string;
  passwordCheck: string;
}

const DEFAULT_VALUES = {
  email: '',
  emailCheck: '',
  password: '',
  passwordCheck: ''
};

const validateForm = (values: ValuesIF) => {
  const errors: { [field: string]: string } = {};
  if (!values.email.length) {
    errors.email = 'Email is required';
  }
  if (!values.password.length) {
    errors.password = 'Password is required';
  } else if (values.password.length < 5) {
    errors.password = 'Password should be more than 4 characters';
  }
  if (values.email !== values.emailCheck) {
    errors.emailCheck = 'Please check the email adresses';
  }
  if (values.password !== values.passwordCheck) {
    errors.passwordCheck = 'Please check the passwords';
  }
  return errors;
};

const RegisterPage = () => {
  const router = useRouter();
  const { showNotification } = useContext(NotificationContext);
  const [, registerMutation] = useMutation(UserCreateDocument);

  const handleSubmit = async (values: ValuesIF) => {
    try {
      const result = await registerMutation({
        email: values.email,
        password: values.password
      });

      if (result.error) {
        showNotification({
          type: 'error',
          message: result.error.message
        });
      }
      if (result.data.userCreate) {
        showNotification({
          type: 'success',
          message: `User ${result.data.userCreate.email} created!`
        });
        await router.push('/login');
      }
    } catch(e) {
      console.log('Error in registeration');
    }
  };

  return (
    <>
      <BackButtonWrapper>
        <Link href='/login'>
          <a style={{ textDecoration: 'none' }}>
            <BackIconButton />
          </a>
        </Link>
      </BackButtonWrapper>
      <div>
        <h3>Register</h3>
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
                  <FieldWrapper />
                  <Input
                    id='emailCheck'
                    name='emailCheck'
                    type='email'
                    placeholder='Confirm email address'
                  />
                  {errors.emailCheck && touched.emailCheck &&
                    <ErrorMessage>{errors.emailCheck}</ErrorMessage>
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
                  <FieldWrapper />
                  <Input
                    id='passwordCheck'
                    name='passwordCheck'
                    type='password'
                    placeholder='Confirm password'
                  />
                  {errors.passwordCheck && touched.passwordCheck &&
                    <ErrorMessage>{errors.passwordCheck}</ErrorMessage>
                  }
                </FieldWrapper>
                <LoginButton
                  style='secondary'
                  type='submit'
                  disabled={!isValid || !dirty}
                >
                  Register
                </LoginButton>
              </LoginStyledForm>  
            );
          }}  
        </Formik>
      </div>
      <div />
    </>
  );
};

RegisterPage.getLayout = getLoginLayout;

const BackButtonWrapper = styled.div`
  margin-bottom: var(--main-margin);
`;

export default RegisterPage;