import tailwindForms from '@tailwindcss/forms';
import tailwindScrollbar from 'tailwind-scrollbar';
const config = {
    content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './stories/**/*.{js,ts,jsx,tsx,mdx}'],
    plugins: [tailwindForms(), tailwindScrollbar],
};
export default config;
