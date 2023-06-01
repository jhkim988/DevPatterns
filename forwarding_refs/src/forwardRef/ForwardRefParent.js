import React, { useRef } from 'react';
import { ForwardRefChild } from './ForwardRefChild';

export const ForwardRefParent = () => {
    const ref = useRef(null);
    
    const handleClick = () => {
        ref.current.focus();
    }
     
    return (
        <>
            <button onClick={handleClick}>focus</button>
            <ForwardRefChild ref={ref} />
        </>
    )
}