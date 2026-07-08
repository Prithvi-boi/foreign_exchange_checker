import React, { useEffect, useState, useRef } from 'react'
// --------------- Line Chart imports ------------------
import {
  Chart as ChartJS,
  Title,
  Legend,
  LineElement,    // Line
  CategoryScale,  // X-axis
  LinearScale,    // Y-axis
  PointElement,   // Line Points
  Tooltip,   
  Filler     
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  Title,
  Legend,
  LineElement,    // Line
  CategoryScale,  // X-axis
  LinearScale,    // Y-axis
  PointElement,   // Line Points
  Tooltip,  
  Filler
)

//------------------------------------------------------

function HistoryCharts({pairs,rangedata,callbackdata}) {
  // console.log(pairs);
  
  const labels = Object.keys(rangedata);
  useEffect(()=>{
    callbackdata(Object.values(rangedata).map((val) => val[pairs[1]]))
  },[rangedata, pairs])

  function setData(range) {
    return {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: Object.values(rangedata).map((val) => val[pairs[1]]),
      borderColor: "#CEF739",      // Line color
      borderWidth: 3,               // Thickness
      tension: 0,                 // Curved line
      fill: true,                   // Fill below line
      pointRadius: 0,       // Hide points

      backgroundColor: (context) => {
        const { ctx, chartArea } = context.chart;
        if (!chartArea) return;

        const gradient = ctx.createLinearGradient(
          0,
          chartArea.top,
          0,
          chartArea.bottom
        );

        gradient.addColorStop(0, "rgba(206,247,57,0.4)");
        gradient.addColorStop(1, "rgba(206,247,57,0)");

        return gradient;
      },
    }]
  };
  }

  const data = setData(rangedata)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };


  return(
    <div className='h-72 w-full bg-zinc-800 rounded-2xl p-5 grid grid-cols-1 grid-rows-[30px_auto]'>
      <div className='flex justify-between'>
        <h4>{pairs[0]}/{pairs[1]}</h4>
        <p className='text-zinc-500'>Last · Date · CET</p>
      </div>
      <div className='h-full w-full rounded-2xl'>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default function History({rangedata,Currency_pairs, callbackFrom_History}) { 
  const callbackFrom_ChartTab = (tabID) => {callbackFrom_History(tabID)}
  const [DatafromCharts, setDatafromCharts] = useState(null)
  // console.log(DatafromCharts);
  let open = DatafromCharts ? DatafromCharts[0] : ''
  let close = DatafromCharts ? DatafromCharts[1] : ''
  let differnce = DatafromCharts ? close-open : ''
  let isDiffNan = isNaN(differnce)

  return (
    <div className='w-full grid grid-cols-1 gap-4'>
      <div className='grid grid-cols-2 grid-rows-[5em_5em] gap-3'>
        <Card Heading={'OPEN'} Content={open} />
        <Card Heading={'LAST'} Content={close}/>
        <Card Heading={'CHANGE'} Content={`${DatafromCharts ? (differnce > 0 ? '+' : '') : ''} ${DatafromCharts ? `${isDiffNan ? 0 : differnce.toFixed(4)}` : ''}`} Contentcolor={DatafromCharts ? differnce > 0 ? 'text-green-500': 'text-red-500' : ''} />
        <Card Heading={'% CHANGE'} Content={`${DatafromCharts ? (differnce > 0 ? "▲" : "▼") : ''} ${DatafromCharts ? (differnce > 0 ? '+' : '') : ''}${DatafromCharts ? (isDiffNan ? 0 : (((differnce)/open)*100).toFixed(2)) : ''}`} Contentcolor={DatafromCharts ? differnce > 0 ? 'text-green-500': 'text-red-500' : ''} />
      </div>

      <HistoryChartTabs callback={callbackFrom_ChartTab} />
      <HistoryCharts pairs={Currency_pairs} rangedata={rangedata} callbackdata={(data) => {setDatafromCharts(data)}} />
    </div>
  )
}

function Card({ Heading, Contentcolor = 'text-white', Content }) {
  return (
    <div className='h-full w-full bg-zinc-900 rounded-xl p-3 flex flex-col justify-evenly'>
      <h5 className='text-sm text-[#b5b5b9]'>{Heading}</h5>
      <div className={`text-2xl ${Contentcolor}`}>{Content}</div>
    </div>
  )
}

function HistoryChartTabs({callback}) {
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
    callback(btnActive)
    
    sethighLightProp({left: null,width: btnRect.width,height: btnRect.height});
  }, []);

  const handleonClick = (btnId, posx) => {
    setbtnActive(btnId)
    callback(btnId)
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