import { useState } from 'react';

/**
 * Open/closed state. Pass `resetKey` (e.g. the pathname) to close
 * automatically whenever it changes, without an effect.
 */
export const useDisclosure = (initialOpen = false, resetKey?: string) => {
  const [state, setState] = useState({ open: initialOpen, key: resetKey });
  const isOpen = state.open && state.key === resetKey;

  const open = () => setState({ open: true, key: resetKey });
  const close = () => setState({ open: false, key: resetKey });
  const toggle = () => (isOpen ? close() : open());

  return { isOpen, open, close, toggle };
};
