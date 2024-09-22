import { cva } from 'class-variance-authority';
import { createContext, useEffect, useState } from 'react';
import { CloseIcon } from '../assets/close-icon';
import { clsxMerge } from '../utils';
import { Button } from './button';
const toastVariants = cva('group fixed right-1/2 z-[1000] inline-flex w-full max-w-xs translate-x-1/2 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium drop-shadow-sm transition-all duration-500 ease-in-out lg:translate-x-0', {
    variants: {
        variant: {
            outlined: 'text-black',
            filled: '',
        },
        color: {
            default: '[&>:first-child>svg]:stroke-blue-700',
            success: '[&>:first-child>svg]:stroke-green-600',
            error: '[&>:first-child>svg]:stroke-red-600',
            warning: '[&>:first-child>svg]:stroke-orange-600',
        },
        placement: {
            'top-right': 'top-5 lg:right-5',
            'top-left': 'top-5 lg:left-5',
            'bottom-right': 'bottom-5 lg:right-5',
            'bottom-left': 'bottom-5 lg:left-5',
        },
        visible: {
            true: 'translate-y-0 opacity-100',
            false: 'invisible opacity-0',
        },
    },
    compoundVariants: [
        {
            variant: 'filled',
            color: 'default',
            class: 'border border-blue-400 bg-blue-50 text-blue-700 [&>:first-child>svg]:stroke-blue-700',
        },
        {
            variant: 'filled',
            color: 'success',
            class: 'border border-green-500 bg-green-50 text-green-700 [&>:first-child>svg]:stroke-green-600',
        },
        {
            variant: 'filled',
            color: 'error',
            class: 'border border-red-400 bg-red-50 text-red-700 [&>:first-child>svg]:stroke-red-600',
        },
        {
            variant: 'filled',
            color: 'warning',
            class: 'border border-orange-400 bg-orange-50 text-orange-700 [&>:first-child>svg]:stroke-orange-600',
        },
        {
            placement: ['bottom-left', 'bottom-right'],
            visible: false,
            class: 'translate-y-10',
        },
        {
            placement: ['top-left', 'top-right'],
            visible: false,
            class: '-translate-y-10',
        },
    ],
});
export function Toast({ variant = 'outlined', color = 'default', placement = 'bottom-right', visible, startAdornment, children, className, onClose, ...rest }) {
    return (<div className={clsxMerge(toastVariants({ variant, color, visible, placement }), className)} {...rest}>
      {startAdornment && <div className='inline-flex size-5 items-center justify-start'>{startAdornment}</div>}
      <div className='inline-flex flex-1 items-center justify-start overflow-hidden'>{children}</div>
      {onClose && (<Button variant='text' size='small' className='h-auto text-slate-500 group-hover:visible group-hover:opacity-100 lg:invisible lg:opacity-0' aria-label='Close' title='Close' iconOnly>
          <CloseIcon className='size-4' onClick={onClose}/>
        </Button>)}
    </div>);
}
Toast.displayName = 'Toast';
export const ToastContext = createContext(null);
export function ToastProvider({ children }) {
    const [toastTimeout, setToastTimeout] = useState();
    const [toastProps, setToastProps] = useState(null);
    const [visible, setVisible] = useState(false);
    const setToast = (props) => {
        if (props === null) {
            setVisible(false);
            // setTimeout used for smooth transition
            const timeout = setTimeout(() => {
                setToastProps(props);
            }, 500);
            setToastTimeout(timeout);
        }
        else {
            clearTimeout(toastTimeout);
            setToastProps({ id: Date.now().toString(), ...props });
            setVisible(true);
        }
    };
    const handleClose = () => {
        setToast(null);
    };
    // auto closing
    useEffect(() => {
        let timeout;
        if (visible && toastProps?.autoClose !== false) {
            timeout = setTimeout(() => {
                setVisible(false);
            }, toastProps?.autoCloseTimeout ?? 3000);
        }
        return () => {
            clearTimeout(toastTimeout);
            clearTimeout(timeout);
        };
    }, [toastProps?.autoClose, toastProps?.autoCloseTimeout, toastProps?.id, toastTimeout, visible]);
    return (<ToastContext.Provider value={{ toast: toastProps, setToast }}>
      {children}
      <Toast {...toastProps} visible={visible} onClose={handleClose}/>
    </ToastContext.Provider>);
}
