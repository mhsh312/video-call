import { clsxMerge } from '../utils';
import { forwardRef, useId } from 'react';
import { cva } from 'class-variance-authority';
import { Label } from './label';
const inputContainerVariants = cva('inline-flex w-full flex-col items-start gap-1.5 stroke-black transition-colors duration-300 ease-in-out ' +
    'focus-within:stroke-blue-700', {
    variants: {
        error: {
            true: 'stroke-red-500 focus-within:stroke-red-500',
            false: '',
        },
        disabled: {
            true: 'stroke-slate-400 text-slate-400',
            false: '',
        },
    },
});
const inputVariants = cva('w-full rounded-lg border border-slate-200 px-3 text-sm font-medium placeholder-slate-400 outline-none transition-all duration-300 ease-in-out ' +
    'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:placeholder-slate-400' +
    'focus:border-blue-600', {
    variants: {
        size: {
            large: 'py-2.5',
            medium: 'py-2',
        },
        error: {
            true: 'border-red-500 text-red-500 ring-1 ring-red-500 focus:border-red-500 focus:text-black focus:ring-red-500 focus:ring-offset-0',
            false: '',
        },
        startAdornment: {
            true: 'pl-10',
            false: '',
        },
        endAdornment: {
            true: 'pr-10',
            false: '',
        },
        helperText: {
            true: 'mb-0.5',
            false: '',
        },
    },
});
const inputHelperTextVariants = cva('max-w-full text-xs font-medium leading-none text-slate-500 transition-colors duration-300 ease-in-out', {
    variants: {
        error: {
            true: 'text-red-500',
            false: '',
        },
    },
});
const inputLabelVariants = cva('whitespace-nowrap', {
    variants: {
        disabled: {
            true: 'text-slate-400',
            false: 'text-black',
        },
    },
});
export const Input = forwardRef(({ size = 'medium', error = false, disabled = false, className, containerClassName, label, startAdornment, endAdornment, helperText, ...rest }, ref) => {
    const inputId = useId();
    const helperTextId = useId();
    return (<div className={clsxMerge(inputContainerVariants({ error, disabled }), containerClassName)}>
        {label && (<Label htmlFor={rest.id ?? inputId} size='small' className={clsxMerge(inputLabelVariants({ disabled }))}>
            {label}
          </Label>)}
        <div className='relative w-full'>
          {startAdornment && (<div className='pointer-events-none absolute left-6 top-1/2 w-5 -translate-x-1/2 -translate-y-1/2'>
              {startAdornment}
            </div>)}
          <input ref={ref} className={clsxMerge(inputVariants({
            error,
            size,
            startAdornment: Boolean(startAdornment),
            endAdornment: Boolean(endAdornment),
            helperText: Boolean(helperText),
        }), className)} disabled={disabled} aria-disabled={disabled} aria-describedby={helperText ? helperTextId : undefined} id={rest.id ?? inputId} {...rest}/>
          {endAdornment && (<div className='absolute right-0 top-1/2 w-5 -translate-x-1/2 -translate-y-1/2'>{endAdornment}</div>)}
        </div>
        {helperText && (<p id={helperTextId} className={clsxMerge(inputHelperTextVariants({ error }))}>
            {helperText}
          </p>)}
      </div>);
});
Input.displayName = 'Input';
