import React, { useEffect, useState, useRef } from 'react'
import Staricon from "/src/assets/images/icon-star-filled.svg?react"
import DownArrow from "/src/assets/images/icon-arrow-down.svg"

function FavoriteCard({DATA, index, callback}) {
  if (!DATA[index]) return 
  const [width, setWidth] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(!width);
    }, 100);

    return () => clearTimeout(timer);
  }, []);  

  return(
    <div style={{transform : width ? 'scaleX(1)' : 'scaleX(0)'}} className='transition-all duration-300 overflow-hidden grid grid-cols-[auto_5em_3em] py-2 px-1 bg-zinc-700 border-2 border-zinc-600 rounded-lg'>

      <div className='ml-3 place-items-start flex flex-col justify-center'>
        <h6>{DATA[index][0][0]} {'->'} {DATA[index][0][1]}</h6>
      </div>

      <div className='place-items-end flex flex-col justify-center gap-1 mr-2'>
        <p className='text-lg'>{DATA[index][1]}</p>
        <p className={`text-[0.7em] ${DATA[index][2] > 0 ? 'text-green-500': 'text-red-500'}`}>{DATA[index][2] > 0 ? "▲" : "▼"} {DATA[index][2]}</p>
      </div>

      <button onClick={() => {callback(index, `${DATA[index][0][0]}-${DATA[index][0][1]}`)}} className='m-1 rounded-lg border-[0.1em] border-[#CEF739] flex justify-center items-center'>
        <Staricon className='h-5 text-[#CEF739]' />
      </button>
    </div>
  )
}

function Favorites({pairs, DATA}) {
  let CurrencyData = Object.values(DATA)
  const today = CurrencyData?.at(-1)
  const yesterday = CurrencyData?.at(-2)
  const [tempAry, setTempAry] = useState([])
  const [FavPairlist, setFavPairList] = useState(new Set())
  const [FavCount, setFavCount] = useState(0)

  const favPairRef = useRef(new Set())

  useEffect(() => {
    if (!pairs) return
    const key = `${pairs[0]}-${pairs[1]}`
    if (favPairRef.current.has(key)) return   // real, synchronous check
    favPairRef.current.add(key)  
    setFavPairList(prev => {
      const newSet = new Set(prev);
      newSet.add(key);
      return newSet;
    })
    if (FavPairlist.has(key)) return
    setTempAry(prev => [...prev, [pairs,today?.[pairs[1]] , (((yesterday[pairs[1]] - today[pairs[1]]) / yesterday[pairs[1]])*100).toFixed(4)]])
    setFavCount(val => val + 1)
  }, [pairs])

  const [toggleMore,setToggleMore] = useState(false)
  const [showText, setshowText] = useState('MORE')
  const handleShowMore = ()=>{
    !toggleMore ? setshowText('LESS') : setshowText('MORE')
    setToggleMore(!toggleMore)
  }  

  const removeFav = (i,pair) => {
    FavPairlist.delete(pair)
    tempAry.splice(i,1)
    setFavCount(val => val - 1)
  }

  console.log(FavPairlist);
  

  return (
    <div className='w-full bg-zinc-800 rounded-2xl p-4'>
      <div className='flex items-baseline justify-between'>
        <h4 className='text-[0.9em]'>PINNED PAIRS</h4>
        <p className='text-[0.9em] text-zinc-400'>{FavCount} FAVORITES</p>
      </div>

      <div className={`-z-40 mt-4 flex flex-col gap-2 transition-all duration-300 ${!toggleMore ? 'max-h-80 overflow-scroll' : 'max-h-[1000rem]'}`}>
        {tempAry.map((notUsed, index) => {
          return <FavoriteCard
            key={index}
            DATA={tempAry}
            index={index}
            callback ={removeFav}
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

export default Favorites