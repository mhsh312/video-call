import { clsxMerge } from '../utils';
import { cva } from 'class-variance-authority';
const dividerVariants = cva('bg-slate-200', {
    variants: {
        size: {
            thin: '',
            thick: '',
        },
        direction: {
            horizontal: 'my-4 w-full',
            vertical: 'mx-4 my-1 max-h-screen min-h-full',
        },
    },
    compoundVariants: [
        {
            direction: 'horizontal',
            size: 'thin',
            class: 'h-px',
        },
        {
            direction: 'horizontal',
            size: 'thick',
            class: 'h-[2px]',
        },
        {
            direction: 'vertical',
            size: 'thin',
            class: 'border-l',
        },
        {
            direction: 'vertical',
            size: 'thick',
            class: 'border-l-2',
        },
    ],
});
export function Divider({ size = 'thin', direction = 'horizontal', children, className, ...rest }) {
    return (<div role='separator' className={clsxMerge(dividerVariants({ size, direction }), className)} {...rest}>
      {children}
    </div>);
}
Divider.displayName = 'Divider';
