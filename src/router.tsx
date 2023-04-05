import { createBrowserRouter } from 'react-router-dom';

import { Browse } from 'components/pages/Browse';
import { Edit } from 'components/pages/Edit';

type SiteConfiguration = {
  perPage: number;
};

export const routes = (config: SiteConfiguration = { perPage: 12 }) => [
  {
    path: '/',
    element: <Browse perPage={config.perPage} />,
  },
  {
    path: '/page/:pageNumber',
    element: <Browse perPage={config.perPage} />,
  },
  {
    path: '/edit/:imageId',
    element: <Edit />,
  },
];

export const browserRouter = createBrowserRouter(routes());
