import {useState, useEffect} from "react"
import exchangeVerticalIcon from "/src/assets/images/icon-exchange-vertical.svg"
import exchangeHorizontalIcon from "/src/assets/images/icon-exchange.svg"

function Shuffle({ex, callback, base, rcve}) {
    const [width, setWidth] = useState(window.innerWidth);

     useEffect(() => {
        window.addEventListener('resize', () => {setWidth(window.innerWidth)});
    }, []);    

    let [exchange, setexchange]     = useState(false)
    const handleExchange = () => {
        !ex ? setexchange(true) : setexchange(false)
        callback(base,rcve)
    }
    return(
        <div onClick={() => handleExchange()} className='flex flex-col justify-evenly p-3 h-12 w-12 sm:w-30 sm:h-15 bg-[#202022] border-2 border-[#2E2E2E] rounded-lg'>
            <img src={width > 640 ? exchangeHorizontalIcon : exchangeVerticalIcon} className="sm:h-7" alt="exchange vertical icon" />
        </div>
    )
}

export default Shuffle