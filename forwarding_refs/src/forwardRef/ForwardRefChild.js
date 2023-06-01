import React, { forwardRef } from 'react';

export const ForwardRefChild = forwardRef((props, ref) => {
    return <input ref={ref} />
});