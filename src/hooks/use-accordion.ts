import { useState } from 'react';

/** One expanded item at a time, by index. */
export const useAccordion = (initialIndex = 0) => {
  const [active, setActive] = useState(initialIndex);

  return { active, isActive: (index: number) => index === active, setActive };
};
