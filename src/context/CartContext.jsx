import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'tulasi-printing-cart-v1';

function readStoredItems() {
  if (typeof window === 'undefined') {
    return [];
  }

  let storedValue;
  try {
    storedValue = window.localStorage.getItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Unable to read the cart from this browser.', error);
    return [];
  }

  if (!storedValue) {
    return [];
  }

  try {
    const items = JSON.parse(storedValue);
    if (Array.isArray(items) && items.every((item) => item?.id)) {
      return items;
    }

    console.warn('Saved cart data is invalid and has been ignored.');
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }

    console.warn('Saved cart data could not be read and has been ignored.');
  }

  try {
    window.localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Unable to clear invalid cart data from this browser.', error);
  }
  return [];
}

function createItemId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `cart-item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredItems);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Unable to persist the cart in this browser.', error);
    }
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem(item) {
        const id = createItemId();
        setItems((currentItems) => [...currentItems, { ...item, id }]);
        return id;
      },
      updateItem(id, changes) {
        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === id ? { ...item, ...changes, id } : item,
          ),
        );
      },
      removeItem(id) {
        setItems((currentItems) =>
          currentItems.filter((item) => item.id !== id),
        );
      },
      clearItems() {
        setItems([]);
      },
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('useCart must be used within a CartProvider.');
  }

  return cart;
}
