import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import styled from 'styled-components';

import { UserDocument } from '@/graphql/generated';
import { AsideView, AsideContext, NotificationContext } from '@/context';
import { removeToken } from '@/utils/tokenUtils';

import { Button, BackIconButton } from '@/components/Buttons';
import { BottomActions, Scrollable, ScrollContent } from '../LayoutHelpers';

const UserView = () => {
  const router = useRouter();
  const { changeView, hideAsideView } = useContext(AsideContext);
  const { showNotification } = useContext(NotificationContext);

  const [result] = useQuery({
    query: UserDocument,
    requestPolicy: 'cache-only'
  });

  const handleClick = () => {
    changeView(AsideView.List);
    hideAsideView();
  };

  const handleLogout = () => {
    removeToken();
    router.push('/login')
      .catch(e => console.log(e));
  };

  if (result.fetching || result.error || !result.data) {
    if (result.error) {
      showNotification({
        type: 'error',
        message: result.error.message
      });
    }
    return <p>Loading...</p>;
  }

  return (
    <Scrollable>
      <BackIconButton
        onClick={() => handleClick()}
      />
      <ScrollContent margin={30}>
        <h2>Hi {result.data.user.email},</h2>
        <TextWrapper>
          <p><strong>Shoppingify</strong> is your shopping list on the go!</p>
          <p>Please add items to your shoppinglist by clicking the items name.</p>
          <p>You can add more pcs or remove item by clicking the pcs button.</p>
          <p>Save the list, and you can check-out items (so cool!)</p>
          <p>
            Complete or cancel the list, and it&apos;s added to your history,
            so you can always remember what you bought.
          </p>
          <p>If list is completed, see the amazing statistic the from statistics page.</p>
          <p>Br,<br/><strong>Shoppingify.</strong></p>
        </TextWrapper>
        <BottomActions>
          <Button
            buttonType='secondary'
            onClick={() => handleLogout()}
          >
            Logout
          </Button>  
        </BottomActions>
      </ScrollContent>
    </Scrollable>
  );
};

const TextWrapper = styled.div`
  p {
    margin-top: 30px;
  }
`;

export default UserView;