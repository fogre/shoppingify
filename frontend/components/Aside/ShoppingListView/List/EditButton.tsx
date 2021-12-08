import { useContext } from 'react';

import { ShoppingListContext } from '@/context';

import { IconButton } from '@/components/Buttons';
import { EditIcon } from '@/components/Icons';

const EditButton = () => {
  const { editState, changeEditState } = useContext(ShoppingListContext);

  if (editState) {
    return null;
  }

  return (
    <IconButton
      size={24}
      onClick={() => changeEditState()}
    >
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;