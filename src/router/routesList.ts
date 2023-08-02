import loadable from '@loadable/component';
// import { Login, ResetPassword, OrderManager, ItemManager, Report, Customers } from '../pages';
// import TestPage from '../pages/TestPage';

export const routes = [
  {
    id: '01',
    path: '/login',
    element: () => loadable(() => import('pages/Login')),
    loginRequired: false,
  },
  {
    id: '02',
    path: '/dashboard',
    element: () => loadable(() => import('pages/Dashboard')),
    loginRequired: true,
  },
  {
    id: '03',
    path: '/user/:id',
    element: () => loadable(() => import('pages/Item/Display')),
    loginRequired: false,
  },
  {
    id: '04',
    path: '/',
    element: () => loadable(() => import('pages/Landing/Landing')),
    loginRequired: false,
  },
  {
    id: '05',
    path: '/invite/:token',
    element: () => loadable(() => import('pages/Signup/Signup')),
    loginRequired: false,
  },
];

//
// {
//   path: '/resetpassword/:token',
//   element: () => loadable(() => ResetPassword),
// },
// {
//   path: '/orders',
//   element: () => loadable(() => OrderManager),
// },
// {
//   path: '/easem',
//   element: () => loadable(() => ItemManager),
// },
// {
//   path: '/report',
//   element: () => loadable(() => Report),
// },
// {
//   path: '/customers',
//   element: () => loadable(() => Customers),
// },
