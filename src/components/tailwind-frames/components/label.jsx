import { clsxMerge } from '../utils';
import { cva } from 'class-variance-authority';
const labelVariants = cva('font-medium leading-none transition-colors duration-300 ease-in-out peer-disabled:opacity-70', {
    variants: {
        size: {
            large: 'text-lg',
            medium: 'text-sm',
            small: 'text-xs',
        },
    },
});
export function Label({ size = 'medium', className, htmlFor, ...rest }) {
    return <label className={clsxMerge(labelVariants({ size }), className)} htmlFor={htmlFor} {...rest}/>;
}
Label.displayName = 'Label';
