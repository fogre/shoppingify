import { useRef } from 'react';
import { useQuery } from 'urql';
import styled from 'styled-components';

import { Category, CategoriesDocument } from '@/graphql/generated';

import { UnstyledButton } from '@/components/Buttons';
import { ErrorMessage, FieldWrapper, Label, Input } from '@/components/Forms';

interface CategoryFieldIF {
  catValue: string;
  setFieldValue: (key: string, val: string) => void;
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
  const scrollRef = useRef<HTMLDivElement | undefined>();
  const [result] = useQuery({
    query: CategoriesDocument
  });

  const handleFocus = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 500);
  };

  if (!result.data || !result.data.categories.length) {
    return <CategoryInput
      error={error}
      touched={touched}
      handleFocus={handleFocus}
    />;
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
      <div ref={scrollRef} />
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