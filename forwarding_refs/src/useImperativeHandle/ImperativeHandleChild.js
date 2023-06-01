import React, { forwardRef, useRef, useImperativeHandle } from 'react';

export const ImperativeHandleChild = forwardRef((props, ref) => {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            focus() {
                inputRef.current.focus();
            },

            blur() {
                inputRef.current.blur();
            },
        }
    }, []);

    return <input ref={inputRef} />
});