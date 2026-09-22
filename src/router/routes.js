export const routes = [
    {
        name: 'landing',
        path: '/',
        component: 'landing-page',
        action: () => import('../pages/landing-page.js'),
    },
];
