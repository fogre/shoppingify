import { useState, useEffect, createContext } from 'react';

interface Notification {
  type: string;
  message: string;
}

interface NotificationContext {
  notification: Notification;
  showNotification: (notif: Notification) => void;
  hideNotification: () => void;
}

export const NotificationContext = createContext<NotificationContext | null>(null);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (notification) {
      const timeOutLength = notification.type === 'error'
        ? 12000 : 4000;
        
      setTimeout(() => {
        setNotification(null);
      }, timeOutLength);
    }
  }, [notification]);

  const showNotification = (notif: Notification) => {
    setNotification({
      ...notif
    });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>  
  );
};

export default NotificationProvider;