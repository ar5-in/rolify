import './bootstrap';
import.meta.glob([
    '../images/**'
]);

import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import Layout from './Shared/Layout';

createInertiaApp({
    title: title => `${title} - Pixel Position`,
    resolve: async (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');
        const page = pages[`./Pages/${name}.jsx`];

        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }

        const component = await page();
        component.default.layout = component.default.layout || (page => <Layout>{page}</Layout>);

        return component;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
}).catch(e => {
    console.error('Inertia setup error:', e);
    document.body.innerHTML = `<div style="color: red; padding: 20px;">
        <h1>Error</h1>
        <pre>${e.message}</pre>
    </div>`;
});
