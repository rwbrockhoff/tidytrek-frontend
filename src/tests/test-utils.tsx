import type { ReactElement } from 'react';
import { render as baseRender } from './utilities';
import { createStore } from '../redux/store';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

type RenderOptions = Parameters<typeof render>[1];

export const render: typeof baseRender = (
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

  return baseRender(Component, { ...options, wrapper: Wrapper });
};
