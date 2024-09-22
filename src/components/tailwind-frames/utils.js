import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
export const clsxMerge = (...inputs) => twMerge(clsx(inputs));
export const kebabCase = (value) => value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
export const handleKeyboardEvent = (key, callback) => (event) => {
    const keys = Array.isArray(key) ? key : [key];
    if (keys.includes(event.key)) {
        callback(event);
    }
};
