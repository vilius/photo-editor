import { createBrowserRouter } from 'react-router-dom';

import { Browse } from 'pages/Browse';
import { Edit } from 'pages/Edit';

type SiteConfiguration = {
  perPage: number;
};

export const routes = (config: SiteConfiguration = { perPage: 12 }) => [
  {
    path: '/',
    element: <Browse perPage={config.perPage} />,
  },
  {
    path: '/edit/:imageId',
    element: <Edit />,
  },
];

export const browserRouter = createBrowserRouter(routes());
