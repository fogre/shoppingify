import { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useMutation } from 'urql';
import styled from 'styled-components';

import { COLORS } from '@/constants';
import { ShoppingListContext, NotificationContext } from '@/context';
import { StatusEnum, ShoppingListSaveDocument } from '@/graphql/generated';
import { parseList } from '@/utils/shoppingListUtils';

import { Button } from '@/components/Buttons';

interface FormValues {
  name: string;
}

const validateForm = (values: FormValues) => {
  const errors: { [field: string]: string } = {};

  if (!values.name || values.name.length < 3) {
    errors.name = 'Name is required';
  }
  return errors;
};

const SaveShoppingListForm = () => {
  const { openList, changeEditState, changeStatus } = useContext(ShoppingListContext);
  const { showNotification } = useContext(NotificationContext);
  const [, saveShoppingList] = useMutation(ShoppingListSaveDocument);

  const initialValues: FormValues = {
    name: openList?.name  || ''
  };

  const handleSubmit = async (name: string) => {
    const shoppingListInput = parseList({
      ...openList,
      name: name
    });

    const result = await saveShoppingList({
      input: shoppingListInput
    });
    
    if (result.error) {
      showNotification({
        type: 'error',
        message: result.error.message
      });
    }

    if (result.data?.shoppingListSave) {
      changeEditState();
      changeStatus(StatusEnum.Saved);
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validate={values => validateForm(values)}
      onSubmit={async (values) => {
        await handleSubmit(values.name);
      }}
    >
      {({ isValid, values }) => {
        return (
          <StyledForm style={{
            '--color': isValid ? COLORS.primary : COLORS.grey[74]
          } as React.CSSProperties}>
              <Input
                id='name'
                name='name'
                placeholder='Enter a name'
              />
              <Button
                buttonType='primary'
                type='submit'
                disabled={
                  !isValid ||
                  !values.name ||
                  !openList.list.length
                }
              >
                save
              </Button>
            </StyledForm>
        );
      }}
    </Formik>
  );
};

const StyledForm = styled(Form)`
  --radius-right: calc(var(--radius-normal) + 4px);
  border-radius:
    var(--radius-normal)
    var(--radius-right)
    var(--radius-right)
    var(--radius-normal);
  border: 2px solid var(--color);
  display: flex;
`;

const Input = styled(Field)`
  border: none;
  outline: none;
  padding: 0 17px;
  border-radius: var(--radius-normal);
  width: 100%;

  & ::placeholder {
    font-size: var(--font-small);
    color: var(--color-grey-74);
  }
`;

export default SaveShoppingListForm;