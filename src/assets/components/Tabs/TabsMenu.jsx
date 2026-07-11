import {useState} from 'react'
import Downarrow from '/src/assets/images/icon-arrow-down.svg'

function TabsMenu({Callback, TabOptions, default_tabs,favCount,logCount}) {
  let [dropDown, setDropdown] = useState(false)
  let [TabHeading, setTabHeadind] = useState(default_tabs)
  const ToggleDropdown = (option) =>{
    dropDown ? setDropdown(false) : setDropdown(true)
    if (option) {
      setTabHeadind(option)
      Callback(option)
    }
  }

  let options = TabOptions
  return (
    <>
    <div className='relative'>
      <button onClick={() => ToggleDropdown(null)} className="absolute z-2 w-full flex gap-2 items-center justify-between mr-2 px-4 py-2 text-white bg-zinc-900 border border-zinc-700 rounded-xl">
        <div className='flex gap-3'>
          <h4>{TabHeading}</h4>
          {TabHeading == 'FAVORITES' || TabHeading == 'LOGS' ? <p className='bg-lime-900 text-[#CEF739] text-sm rounded-full w-7 h-7 grid place-items-center'>{TabHeading === 'FAVORITES'? favCount : logCount}</p> : ''}
        </div>
        <img style={{width: `${!dropDown ? 20 : 0}px`}} className='transition-[width] h-3 invert' src={Downarrow}/>
      </button>

      <div style={{height: `${dropDown ? '130px' : '0px'}`}} className='top-8 absolute transition-[height] duration-75 w-full h-40 px-4 py-2 text-white bg-zinc-900 border border-zinc-700 rounded-b-2xl'>
        {options.map((option, i)=>{
          if (option === TabHeading) return 
          return(
            <div className='flex gap-2' key={i}>
              <p onClick={(e)=> ToggleDropdown(e.target.innerText)} key={option} style={{fontSize: `${dropDown ? '1em' : '0px'}`}} className='mt-3 transition-[font-size] duration-100'>{option}</p>
              {dropDown ? <p className={`bg-lime-900 text-[#CEF739] text-sm rounded-full ${option == 'FAVORITES' || option == 'LOGS' ? 'w-5 h-5 ' : '' } grid place-items-center mt-4`}>{option == 'FAVORITES' ? favCount : ''}{option == 'LOGS' ?  logCount : '' }</p> : ''}
            </div>
          )
        })}
      </div>

    </div>
    </>
  )
}

export default TabsMenu