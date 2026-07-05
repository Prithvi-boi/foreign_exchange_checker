import {useState} from "react"
import exchangeVerticalIcon from "/src/assets/images/icon-exchange-vertical.svg"

function Shuffle({ex, callback, base, rcve}) {
    let [exchange, setexchange]     = useState(false)
    const handleExchange = () => {
        !ex ? setexchange(true) : setexchange(false)
        callback(base,rcve)
    }
    return(
        <div onClick={() => handleExchange()} className='flex flex-col justify-evenly p-3 h-12 w-12 bg-[#202022] border-2 border-[#2E2E2E] rounded-lg'>
            <img src={exchangeVerticalIcon} alt="exchange vertical icon" />
        </div>
    )
}

export default Shuffle