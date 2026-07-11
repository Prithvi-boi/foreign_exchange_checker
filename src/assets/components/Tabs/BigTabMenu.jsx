import { useState, useEffect, useRef } from 'react'
import Downarrow from '/src/assets/images/icon-arrow-down.svg'

function BigTabMenu({ Callback, TabOptions, default_tabs }) {
    const [btnWidth, setBtnwidth] = useState(0)
    const [btnOffset, setBtnOffset] = useState(0)

    const defaultBtnRef = useRef(null);
    useEffect(() => {
        if (defaultBtnRef.current) {
            setBtnwidth(defaultBtnRef.current.clientWidth);
            setBtnOffset(defaultBtnRef.current.offsetLeft);
        }
    }, []);

    return (
        <>
            <div className='relative border-b-2 border-zinc-800 h-full flex items-center gap-7 px-4'>
                {TabOptions.map((option, key) => {
                    return <button 
                    key={key} 
                    ref={option === default_tabs ? defaultBtnRef : null}
                    onClick={(e) => { 
                        setBtnwidth(e.target.clientWidth)
                        setBtnOffset(e.target.offsetLeft) 
                        Callback(option)
                    }}>{option}</button>
                })}
                <div style={{ width: btnWidth, left: btnOffset }} className='rounded-2xl transition-all duration-300 absolute h-1 w-17 top-full bg-lime-400'></div>
            </div>
        </>
    )
}

export default BigTabMenu