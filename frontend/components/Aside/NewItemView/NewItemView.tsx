import { useContext } from 'react';
import { useMutation } from 'urql';
import { Formik, Form } from 'formik';
import styled from 'styled-components';

import { AsideContext, NotificationContext } from '@/context';
import { ItemAddOneDocument } from '@/graphql/generated';

import { Button } from '@/components/Buttons';
import { ErrorMessage, FieldWrapper, Label, Input } from '@/components/Forms';
import CategoryField from './CategoryField';
import { BottomActions, Scrollable, ScrollContent } from '../LayoutHelpers';


interface ValuesIF {
  name: string;
  note: string;
  image: string;
  category: string;
}

const DEFAULT_VALUE = {
  name: '',
  category: '',
  note: '',
  image: ''
};

const validateForm = (values: ValuesIF) => {
  const errors: { [field: string]: string } = {};
  if (!values.name.length) {
    errors.name = 'Name is required';
  }
  if (!values.category.length) {
    errors.category = "Category is required";
  }
  return errors;
};

const NewItemView = () => {
  const { changeView } = useContext(AsideContext);
  const { showNotification } = useContext(NotificationContext);

  const [, addItem] = useMutation(ItemAddOneDocument);

  const handleSubmit = async (values: ValuesIF) => {
    const res = await addItem({ input: {
      ...values,
      category: {
        name: values.category
      }
    }});

    if (res.error) {
      showNotification({
        type: 'error',
        message: res.error.message
      });
    } else {
      changeView('SHOPPING_LIST');
    }
  };

  return (
    <Scrollable>
      <h2>Add a new item</h2>
      <Formik
        initialValues={DEFAULT_VALUE}
        validate={values => validateForm(values)}
        onSubmit={values => handleSubmit(values)}
      >
        {({ errors, touched, isValid, values, setFieldValue }) => {
          return (
            <StyledForm>
              <ScrollContent>
                <FieldWrapper>
                  <Label>Name</Label>
                  <Input
                    id='name'
                    name='name'
                    placeholder='Enter a name'
                  />
                  {errors.name && touched.name &&
                    <ErrorMessage>{errors.name}</ErrorMessage>
                  }
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Note (optional)</Label>
                  <Input
                    id='note'
                    name='note'
                    placeholder='Enter a note'
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Image (optional)</Label>
                  <Input
                    id='image'
                    name='image'
                    placeholder='Enter a image'
                  />
                </FieldWrapper>
                <CategoryField
                  touched={touched.category}
                  error={errors.category}
                  catValue={values.category}
                  setFieldValue={setFieldValue}
                />
              </ScrollContent>
              <BottomActions grey={true}>
                <Button
                  style='white'
                  onClick={() => changeView('SHOPPING_LIST')}
                >
                  cancel
                </Button>
                <Button
                  disabled={!isValid}
                  style='primary'
                  type='submit'
                >
                  Add item
                </Button>
              </BottomActions>
            </StyledForm>
          );
        }}
       </Formik>
    </Scrollable>
  );
};

const StyledForm = styled(Form)`
  margin-top: 30px;
`;

export default NewItemView;