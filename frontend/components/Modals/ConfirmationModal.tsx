import { useContext } from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import styled from 'styled-components';

import { ConfirmationContext } from '@/context';

import { Button } from '@/components/Buttons';

export const ConfirmationModal = () => {
  const { confirmation, closeConfirmationModal } = useContext(ConfirmationContext);

  if (!confirmation) {
    return null;
  }

  return (
    <Wrapper
      isOpen={confirmation}
      onDismiss={closeConfirmationModal}
    >
      <Content aria-label='Confirmation modal'>
        <Message>{confirmation.message}</Message>
        <ActionWrapper>
          <Button
            style='white'
            onClick={() => closeConfirmationModal()}
          >
            Cancel
          </Button>
          <Button
            style='danger'
            onClick={() => confirmation.action()}
          >
            Yes
          </Button> 
        </ActionWrapper>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled(DialogOverlay)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: hsla(220, 5%, 40%, 0.8);
`;

const Content = styled(DialogContent)`
  border-radius: var(--radius-large);
  background-color: white;
  width: 45ch;
  max-width: 100%;
  margin: 16px;
  padding: 30px;

  * {
    outline: none;
  }
`;

const Message = styled.p`
  font-size: var(--font-h2);
  max-width: 20ch;
`;

const ActionWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 30px; 
`;