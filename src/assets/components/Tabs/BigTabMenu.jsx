import { useState, useEffect, useRef } from 'react'
import Downarrow from '/src/assets/images/icon-arrow-down.svg'

function BigTabMenu({ Callback, TabOptions, default_tabs ,logCount,favCount }) {
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
                    className='flex gap-2'
                    key={key} 
                    ref={option === default_tabs ? defaultBtnRef : null}
                    onClick={(e) => { 
                        setBtnwidth(e.target.clientWidth)
                        setBtnOffset(e.target.offsetLeft) 
                        Callback(option)
                    }}>{option}
                    {/* <p className='bg-lime-900 w-6 h-6 rounded-full text-sm text-[#CEF739]'>1</p> */}
                    <p className={`bg-lime-900 text-[#CEF739] text-sm rounded-full ${option == 'FAVORITES' || option == 'LOGS' ? 'w-6 h-6 ' : '' } grid place-items-center`}>{option == 'FAVORITES' ? favCount : ''}{option == 'LOGS' ?  logCount : '' }</p>
                    </button>
                })}
                <div style={{ width: btnWidth, left: btnOffset }} className='rounded-2xl transition-all duration-300 absolute h-1 w-17 top-full bg-lime-400'></div>
            </div>
        </>
    )
}

export default BigTabMenu