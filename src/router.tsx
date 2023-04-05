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
  [key in `${Names}Path`]: (...args: any[]) => string;
};

/**
 * Create path helpers from routes.
 * Use 'name' property to generate { [`name${Path}`]: (args) => string] }
 */
export const paths = routes.reduce((paths, route) => {
  paths[`${route.name}Path`] = (...args: string[]) => {
    return route.path.replaceAll(/:\w+/g, () => String(args.shift()) || '');
  };
  return paths;
}, {} as Paths);

export const reactRouterRoutes: RouteObject[] = routes.map((route) => {
  const obj: RouteObject & { name?: string } = route;
  delete obj.name;
  return obj;
});

export const browserRouter = createBrowserRouter(reactRouterRoutes);
