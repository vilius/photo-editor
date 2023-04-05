import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { Browse } from 'components/pages/Browse';
import { Edit } from 'components/pages/Edit';

const routes = [
  {
    path: '/',
    name: 'browse',
    element: <Browse />,
  },
  {
    path: '/page/:pageNumber',
    name: 'browsePage',
    element: <Browse />,
  },
  {
    path: '/edit/:imageId',
    name: 'editImage',
    element: <Edit />,
  },
] as const;

type Names = typeof routes[number]['name'];
type Paths = {
  [key in `${Names}Path`]: (...args: unknown[]) => string;
};

/**
 * Create path helpers from routes.
 * Use 'name' property to generate { [`name${Path}`]: (args) => string] }
 */
export const paths = routes.reduce((acc, route) => {
  acc[`${route.name}Path`] = (...args: unknown[]) =>
    route.path.replaceAll(/:\w+/g, () => String(args.shift()) || '');

  return acc;
}, {} as Paths);

export const reactRouterRoutes: RouteObject[] = routes.map((route) => {
  const obj: RouteObject & { name?: string } = route;
  delete obj.name;
  return obj;
});

export const browserRouter = createBrowserRouter(reactRouterRoutes);
