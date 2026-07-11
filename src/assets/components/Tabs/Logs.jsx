import {useState, useEffect} from 'react'
import DownArrow from "/src/assets/images/icon-arrow-down.svg"
import DeleteIcon from "/src/assets/images/icon-delete.svg"

function LogsCard({DATE, DATA, callback}) {
  // console.log(DATA);
  if (!DATA[0]) return
  
  const [del , setDel] = useState(false)
  const deleteMycomp = () => {
    setDel(true)
    callback(DATE)
  }
  if (del) return

  return(
    <div className='grid grid-cols-[auto_4em_3em] py-2 px-2 bg-zinc-700 border-2 border-zinc-600 rounded-lg'>
      <div className='place-items-start flex flex-col justify-center gap-1 mr-2'>
        <p className='text-[0.6em] text-zinc-400'>{DATE}</p>
        <h6>{`${DATA[0]} -> ${DATA[1]}`}</h6>
      </div>

      <div className='place-items-end flex flex-col justify-center gap-1 mr-2'>
        <p>{(DATA[2]).toFixed(2)}</p>
        <p className='text-[1em] text-[#CEF739]'>{(Number(DATA[3])).toFixed(2)}</p>
      </div>

      <button onClick={() => deleteMycomp()} className={`m-1 rounded-lg border-[0.1em] text-zinc-500 flex justify-center items-center`}>
        <img className='h-5' src={DeleteIcon} alt="DeleteIcon" />
      </button>
    </div>
  )
}

export default function Logs({ LogInfos,callback }) {  
  let date = new Date()
  let formatedDATE = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}-${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  
  const [LogsMAP, setLogsMAP] = useState(new Map())
  // console.log(LogsMAP);
  
  useEffect(()=>{
    if (!LogInfos) return
    setLogsMAP(prev => {
      let map = new Map(prev)
      map.set(formatedDATE, LogInfos)
      return map
    })  
  },[LogInfos])  

  const [toggleMore, setToggleMore] = useState(false)
  const [showText, setshowText] = useState('MORE')
  const handleShowMore = () => {
    !toggleMore ? setshowText('LESS') : setshowText('MORE')
    setToggleMore(!toggleMore)
  }

  const handleRemove = (val)=> {
    LogsMAP.delete(val)
  }
  
  useEffect(() => callback(LogsMAP.size),[LogsMAP.size])
  
  return (
    <div className='flex flex-col w-full bg-zinc-800 rounded-2xl p-4'>

      <div className='flex flex-col items-baseline gap-2'>
        <h4 >CONVERSION LOG</h4>
        <div className='flex items-center w-full'>
          <p className='text-[0.9em] text-zinc-400'>{LogsMAP.size} LOGGED</p>
          <button onClick={() => LogsMAP.clear()} className='ml-auto p-2 h-10 w-25 rounded-lg border-2 border-zinc-600 bg-zinc-700 text-sm'>CLEAR ALL</button>
        </div>
      </div>

      <div className={`${LogsMAP.size === 0 ? 'items-center'  : ''} mt-4 flex flex-col gap-2 transition-all duration-300 ${!toggleMore ? 'max-h-80 overflow-scroll' : 'max-h-[1000rem]'}`}>
        {Array.from(LogsMAP).map(([date, data]) => (
          <LogsCard
            key={date}
            DATE={date}
            DATA={data}
            callback={handleRemove}
          />
        ))}
        {LogsMAP.size === 0 ? <p className='text-zinc-500'>No Conversations yet...</p> : ''}
      </div>

      <button onClick={() => handleShowMore()} className='mt-4 ml-auto mr-auto h-10 w-40 rounded-2xl flex justify-center items-center gap-2'>
        SHOW {showText}
        <img className={`invert h-3 mb-1 transition-all ${toggleMore ? 'rotate-180' : ''}`} src={DownArrow} alt="dowrnarrowimg" />
      </button>
    </div>
  )
}