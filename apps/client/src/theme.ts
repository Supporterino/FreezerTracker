import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
  fontFamily: 'Inter, sans-serif',
  components: {
    Card: { defaultProps: { withBorder: true, shadow: 'sm', radius: 'md' } },
    Modal: { defaultProps: { centered: true, overlayProps: { blur: 3 } } },
  },
});
