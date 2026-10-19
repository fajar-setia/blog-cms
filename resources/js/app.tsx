import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob<{
            default: React.ComponentType;
        }>('./feature/**/pages/**/*.tsx', {
            eager: true,
        });

        const page = pages[`./feature/${name}.tsx`];

        if (!page) {
            throw new Error(`Page ${name} not found`);
        }

        return page;
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});