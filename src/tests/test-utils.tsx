import type { ReactElement } from 'react';
import { render as renderComponent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore } from '../redux/store';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

type RenderOptions = Parameters<typeof renderComponent>[1];

export const wrapper = ({ children }: PropsWithChildren) => {
  const store = createStore();
  return (
    <MemoryRouter>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );
};

export const basicRender = (ui: ReactElement, options?: RenderOptions) => {
  return {
    ...renderComponent(ui, options),
    user: userEvent.setup(),
  };
};

export const wrappedRender: typeof basicRender = (
  Component: ReactElement,
  options?: RenderOptions,
) => {
  const store = createStore();

  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  };

  return basicRender(Component, { ...options, wrapper: Wrapper });
};
