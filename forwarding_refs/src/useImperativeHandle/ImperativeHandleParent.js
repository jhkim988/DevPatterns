import React, { useRef } from 'react';
import { ImperativeHandleChild } from './ImperativeHandleChild';

export const ImperativeHandleParent = () => {
    const ref = useRef(null);

    const handleFocus = () => {
        ref.current.focus();
    }

    const handleBlur = () => {
        ref.current.blur();
    }

    return (
        <>
            <button onClick={handleFocus}>focus</button>
            <button onClick={handleBlur}>blur</button>
            <ImperativeHandleChild ref={ref}/>
        </>
    )
}