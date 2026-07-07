import React, { useEffect, useState, useRef } from 'react'

function Card({ Heading, Contentcolor = 'text-white' }) {
  return (
    <div className='h-full w-full bg-zinc-900 rounded-xl p-3 flex flex-col justify-evenly'>
      <h5 className='text-sm text-[#b5b5b9]'>{Heading}</h5>
      <div className={`text-2xl ${Contentcolor}`}>content</div>
    </div>
  )
}

function HistoryCharts() {
  return(
    <div className='h-72 w-full bg-zinc-800 rounded-2xl'>

    </div>
  )
}

function HistoryChartTabs() {
  const chartOption = ['1D', '1W', '1M', '3M', '1Y', '5Y']
  const [btnActive, setbtnActive] = useState('1D')
  
  const firstBtnRef = useRef(null);
  const containerRef = useRef(null);
  const [highLightProp, sethighLightProp] = useState({
    left: 0,
    width: 0,
    height: 0
  });

  useEffect(() => {
    const btnRect = firstBtnRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
  
    sethighLightProp({left: null,width: btnRect.width,height: btnRect.height});
  }, []);

  const handleonClick = (btnId, posx) => {
    setbtnActive(btnId)
    sethighLightProp({ left: posx.left, width: posx.width , height: posx.height })
  }

  return (
    <div className='row-start-2 w-full grid grid-rows-[3em] grid-cols-1 gap-4 '>
      <div ref={containerRef} className='w-[calc(100%-2em)] flex items-center bg-zinc-900 rounded-lg'>
        {chartOption.map((option,i) => {
          return <button ref={i === 0 ? firstBtnRef : null} key={i} onClick={(e) => { handleonClick(e.target.innerText, e.currentTarget.getBoundingClientRect()) }} className={`${option == btnActive ? 'text-white' : 'text-zinc-700'} text-[0.8rem] h-full w-15 rounded-l transition-colors duration-600 ease-out`}>{option}</button>
        })}
        <div className={` bg-zinc-700 opacity-60 absolute transition-[left] duration-500 rounded-lg`} style={{ left: highLightProp.left ? highLightProp.left : 20, width: highLightProp.width, height: highLightProp.height }}></div>
      </div>
    </div>
  )
}

export default function History() {
  return (
    <div className='w-full grid grid-cols-1 gap-4'>
      <div className='grid grid-cols-2 grid-rows-[5em_5em] gap-3'>
        <Card Heading={'OPEN'} />
        <Card Heading={'LAST'} />
        <Card Heading={'CHANGE'} Contentcolor='text-green-500' />
        <Card Heading={'% CHANGE'} Contentcolor='text-green-500' />
      </div>

      <HistoryChartTabs />
      <HistoryCharts />
    </div>
  )
}