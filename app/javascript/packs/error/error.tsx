import * as React from 'react';

export const Error = (props: {msg: string}) => {
    return(
        <div className='py-5'>
            <p className="text-danger">{props.msg}</p>
        </div>
    )
}