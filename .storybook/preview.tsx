import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/index.css';
import { useEffect } from 'react';

const useModalRoot: Decorator = (Story) => {
  useEffect(() => {
    let el = document.getElementById('modal-root');
    if (!el) {
      el = document.createElement('div');
      el.id = 'modal-root';
      el.className = 'pointer-events-none fixed inset-0 z-[20000] flex items-center justify-center';
      document.body.appendChild(el);
    }
  }, []);

  return <Story />;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [useModalRoot],
};

export default preview;
