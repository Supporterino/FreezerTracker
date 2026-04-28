import { Burger } from '@mantine/core';

interface MobileNavBurgerProps {
  opened: boolean;
  toggle: () => void;
}

export function MobileNavBurger({ opened, toggle }: MobileNavBurgerProps) {
  return (
    <Burger
      opened={opened}
      onClick={toggle}
      hiddenFrom="sm"
      size="sm"
      aria-label="Toggle navigation"
    />
  );
}
