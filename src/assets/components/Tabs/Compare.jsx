import { use, useState } from 'react'
import { flags } from '../Dropdown'
import Staricon from "/src/assets/images/icon-star.svg"
import DownArrow from "/src/assets/images/icon-arrow-down.svg"

function CompareCard({flagimg,currencyAbre,currencyName,todaysRate,inputVal}) { 
  return(
    <div className='grid grid-cols-[3em_auto_4em_3em] py-2 px-1 bg-zinc-700 border-2 border-zinc-600 rounded-lg'>
      <div className='p-2'>
        <img className='rounded-full border-[0.1em] border-zinc-800' src={flagimg} alt='flagimg' />
      </div>
      <div className='place-items-start flex flex-col justify-center gap-1 mr-2'>
        <h6>{currencyAbre}</h6>
        <p className='text-[0.6em] text-zinc-400'>{currencyName}</p>
      </div>
      <div className='place-items-end flex flex-col justify-center gap-1 mr-2'>
        <p>{(inputVal*(todaysRate?.[currencyAbre])).toFixed(2)}</p>
        <p className='text-[0.6em] text-zinc-400'>@ {todaysRate?.[currencyAbre]}</p>
      </div>
      <button className='m-1 rounded-lg border-[0.1em] border-zinc-500 flex justify-center items-center'>
        <img className='h-5' src={Staricon} alt="StarIcon" />
      </button>
    </div>
  )
}

export default function Compare({BASE, VALUE, DATA, COUNTRIES}) {
  let CurrencyData = Object.values(DATA)
  let flagSrc = Object.values(flags)
  let [toggleMore,setToggleMore] = useState(false)
  const [showText, setshowText] = useState('MORE')
  const handleShowMore = ()=>{
    !toggleMore ? setshowText('LESS') : setshowText('MORE')
    setToggleMore(!toggleMore)
  }
  
  return (
    <div className='flex flex-col w-full bg-zinc-800 rounded-2xl p-4'>
      <div className='flex items-baseline gap-2'>
        <h4 className='text-[0.9em] text-zinc-400'>MULTI-CURRENCY</h4>
        <p>{VALUE ? VALUE : 0} FROM {BASE}</p>
      </div>

      <div className={`mt-4 flex flex-col gap-2 transition-all duration-300 ${!toggleMore ? 'max-h-80 overflow-scroll' : 'max-h-[1000rem]'}`}>
        {flagSrc.map((imgSrc,i) => {
          if (COUNTRIES?.[0]?.[i] == BASE) return
          return <CompareCard key={i} 
          flagimg={imgSrc} 
          currencyAbre={COUNTRIES?.[0]?.[i] ?? ""} 
          currencyName={COUNTRIES?.[1]?.[COUNTRIES?.[0]?.[i]] ?? ""}
          todaysRate={CurrencyData?.at(-1)}
          inputVal={VALUE}
          />
        })}
      </div>
      <button onClick={() => handleShowMore()} className='mt-4 ml-auto mr-auto h-10 w-40 rounded-2xl flex justify-center items-center gap-2'>
        SHOW {showText}
        <img className={`invert h-3 mb-1 transition-all ${toggleMore ? 'rotate-180' : ''}`} src={DownArrow} alt="dowrnarrowimg" />
      </button>
    </div>
  )
}