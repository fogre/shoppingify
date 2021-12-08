import { useRef } from 'react';
import { useQuery } from 'urql';
import styled from 'styled-components';

import { Category, CategoriesDocument } from '@/graphql/generated';

import { UnstyledButton } from '@/components/Buttons';
import { ErrorMessage, FieldWrapper, Label, Input } from '@/components/Forms';

interface CategoryFieldIF {
  catValue: string;
  setFieldValue: () => void;
  error: string | undefined;
  touched: boolean;
}

interface InputIF {
  error: string | undefined;
  touched: boolean;
  handleFocus: () => void;
}

const CategoryInput = ({ handleFocus, error, touched }: InputIF) => (
  <FieldWrapper>
    <Label>Category</Label>
    <Input
      id='category'
      name='category'
      placeholder='Enter a category'
      onFocus={() => handleFocus()}
    />
    {error && touched &&
      <ErrorMessage>{error}</ErrorMessage>
    }
  </FieldWrapper>
);

const CategoryField = ({ catValue, setFieldValue, error, touched }: CategoryFieldIF) => {
  const categoriesListRef = useRef();
  const [result] = useQuery({
    query: CategoriesDocument,
    requestPolicy: 'cache-only'
  });

  const handleFocus = () => {
    //eslint-disable-next-line @typescript-eslint/no-unsafe-call
    categoriesListRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  if (!result.data || !result.data.categories.length) {
    return <CategoryInput />;
  }

  //filter the categories by catValue
  let filtered: Category[] = [];
  if (catValue.length) {
    for (const cat of result.data.categories) {
      //if catVal is exactly the name of a category, dont't show list
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
        handleFocus={handleFocus}
      />
      {showList && <CategoriesList>
        {filtered.map(c =>
          <CategoryButton
            key={c.name}
            onClick={() => setFieldValue('category', c.name)}
          >
            {c.name}
          </CategoryButton>
        )}
      </CategoriesList>}
      <div ref={categoriesListRef} />
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