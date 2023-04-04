import { createBrowserRouter } from 'react-router-dom';

import { App } from 'App';
import { Editor } from 'Editor';

type SiteConfiguration = {
  perPage: number;
};

export const routes = (config: SiteConfiguration = { perPage: 12 }) => [
  {
    path: '/',
    element: <App perPage={config.perPage} />,
  },
  {
    path: '/edit/:imageId',
    element: <Editor />,
  },
];

export const browserRouter = createBrowserRouter(routes());
