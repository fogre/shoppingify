import { useContext } from 'react';
import Portal from "@reach/portal";
import styled from 'styled-components';

import { NotificationContext } from '@/context';

import { CloseIcon } from '@/components/Icons';
import { IconButton } from '@/components/Buttons';

export const NotificationModal = () => {
  const { notification, hideNotification } = useContext(NotificationContext);

  if (!notification || !notification.type) {
    return null;
  }

  return (
    <Portal>
      <Wrapper>
        <ContentWrapper type={notification.type}>
          <IconButton
            size={16}
            onClick={() => hideNotification()}
          >
            <CloseIcon />
          </IconButton>
          <p>{notification.message}</p>
        </ContentWrapper>
      </Wrapper>
    </Portal>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const ContentWrapper = styled.div`
  background-color: ${p => p.type === 'error'
    ? 'var(--color-danger)' : 'var(--color-secondary)'
  };
  border-radius: 10px;
  color: white;
  display: flex;
  gap: 10px;
  font-size: var(--font-small);
  font-weight: 700;
  margin: 5px auto;
  max-width: 50vw;
  padding: 6px;
  width: max-content;
`;