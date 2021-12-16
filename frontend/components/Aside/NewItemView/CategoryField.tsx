import { useRef } from 'react';
import { useQuery } from 'urql';
import styled from 'styled-components';

import { Category, CategoriesDocument } from '@/graphql/generated';

import { UnstyledButton } from '@/components/Buttons';
import {
  ErrorMessage,
  FieldWrapper,
  handleFocus,
  Label,
  Input
} from '@/components/Forms';

interface CategoryFieldIF {
  catValue: string; //value of the category input
  setFieldValue: (key: string, val: string) => void;
  error: string | undefined;
  touched: boolean;
}

interface InputIF {
  error: string | undefined;
  touched: boolean;
}

const CategoryInput = ({ error, touched }: InputIF) => {
  const categoryRef = useRef<HTMLDivElement | undefined>();

  return (
    <FieldWrapper ref={categoryRef}>
      <Label>Category</Label>
      <Input
        id='category'
        name='category'
        placeholder='Enter a category'
        onFocus={() => handleFocus(categoryRef?.current)}
      />
      {error && touched &&
        <ErrorMessage>{error}</ErrorMessage>
      }
    </FieldWrapper>
  );
};

const CategoryField = ({ catValue, setFieldValue, error, touched }: CategoryFieldIF) => {
  const [result] = useQuery({
    query: CategoriesDocument
  });

  if (!result.data || !result.data.categories.length) {
    return <CategoryInput
      error={error}
      touched={touched}
    />;
  }

  //filter the categories by catValue
  let filtered: Category[] = [];
  if (catValue.length) {
    for (const cat of result.data.categories) {
      //if catVal is the name of a category, dont't show list
      const nameLowerCase = cat.name.toLowerCase();
      const valueLowerCase = catValue.toLowerCase();
      if (nameLowerCase === valueLowerCase) {
        filtered = [];
        break;
      }
      if (nameLowerCase.includes(valueLowerCase)) {
        filtered.push(cat);
      }
    }
  } else {
    filtered = result.data.categories;
  }
  const showList = filtered.length ? true : false;

  return(
    <CategoryFieldWrapper>
      <CategoryInput
        error={error}
        touched={touched}
      />
      {showList && <CategoriesList>
        {filtered.map(c =>
          <CategoryButton
            type='button'
            key={c.name}
            onFocus={() => setFieldValue('category', c.name)}
          >
            <p>
              {c.name}
            </p>
          </CategoryButton>
        )}
      </CategoriesList>}
    </CategoryFieldWrapper>
  );
};

const CategoryFieldWrapper = styled.div`
`;

const CategoriesList = styled.div`
  background-color: white;
  border-radius: var(--radius-normal);
  border: 1px solid var(--color-grey-74);
  padding: 7px;
  display: none;

  &:focus {
    border-color: pink;
  }

  ${CategoryFieldWrapper}:focus-within & {
    display: block;
  }
 `;

const CategoryButton = styled(UnstyledButton)`
  width: 100%;
  border-radius: var(--radius-normal);
  padding: 11px 22px;

  & :nth-child(2n) {
    background-color: var(--color-grey-95);
  }

  & :hover {
    background-color: var(--color-secondary);
  }
`;


export default CategoryField;