const NAME = 'ShoppingifyApp';

export const isServerSide = typeof window === "undefined";

export const getToken = (): string => {
  const token = !isServerSide
    ? localStorage.getItem(NAME)
    : '';
  return token;
};

export const setToken = (value: string): void => {
  if (!isServerSide) {
    localStorage.setItem(
      NAME, value
    );
  }
};

export const removeToken = (): void => {
  if (!isServerSide) {
    localStorage.removeItem(NAME);
  }
};