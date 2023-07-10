import { useRef, forwardRef } from 'react';
import './input.css';

export const RefInput = forwardRef(function RefInput({label, placeholder='', btn=null}, ref) {
    return (
        <>
        <label>{label}</label>
            <div className='input-wrapper space-below'>
            <input type='text' placeholder={placeholder} ref={ref} className='input'/>
        </div>
        </>
    )
})

export function Input({label, placeholder='', btn=null}) {
    const inputRef = useRef();

    return (
        <>
        <label>{label}</label>
            <div className='input-wrapper space-below'>
            <input type='text' placeholder={placeholder} ref={inputRef} className='input'/>
            {btn && <button onClick={()=>btn.callback(inputRef.current?.value)} className='btn-callback'>{btn.label}</button>}
        </div>
        </>
    )
}