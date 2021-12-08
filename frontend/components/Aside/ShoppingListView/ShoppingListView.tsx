import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'urql';

import { ShoppingListContext,
  ConfirmationContext,
  NotificationContext
} from '@/context';
import { StatusEnum, ShoppingListFinishDocument } from '@/graphql/generated';
import { parseList } from '@/utils/shoppingListUtils';

import { Button } from '@/components/Buttons';
import { SaveShoppingListForm } from '@/components/Forms';
import AsideCard from './AsideCard';
import List from './List';
import { BottomActions, Scrollable, ScrollContent } from '../LayoutHelpers';

const BottomComponent = () => {
  const router = useRouter();
  const { editState, changeEditState, openList } = useContext(ShoppingListContext);
  const { showConfirmationModal, closeConfirmationModal } = useContext(ConfirmationContext);
  const { showNotification } = useContext(NotificationContext);
  const [, shoppingListFinish] = useMutation(ShoppingListFinishDocument);

  const handleFinish = async (status: StatusEnum) => {
    const shoppingListInput = parseList({
      ...openList,
      status
    });

    const result = await shoppingListFinish({ input: {
      list: shoppingListInput.list,
      date: shoppingListInput.date,
      status: shoppingListInput.status
    }});

    if (result.error) {
      showNotification({
        type: 'error',
        message: result.error.message
      });
    }

    if (result.data?.shoppingListFinish) {
      changeEditState();
      closeConfirmationModal();
      await router
        .push(`/history`)
        .catch(e => console.log(e));
    }
  };

  if (editState) {
    return <SaveShoppingListForm />;
  }

  return (
    <>
      <Button
        style={'white'}
        onClick={() => showConfirmationModal({
          message: 'Are you sure that you want to cancel this list?',
          action: () => handleFinish('CANCELLED')
        })}
      >
        cancel
      </Button>
      <Button
        style={'secondary'}
        onClick={()=> handleFinish('COMPLETED')}
      >
        complete
      </Button>
    </>
  );
};

const ShoppingListView = () => {
  return (
    <Scrollable>
      <AsideCard />
      <ScrollContent>
        <List />
      </ScrollContent>
      <BottomActions>
        <BottomComponent />
      </BottomActions>
    </Scrollable>
  );
};

export default ShoppingListView;