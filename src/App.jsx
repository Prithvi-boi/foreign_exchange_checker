import { useState, useEffect } from 'react'
import LiveMarkets from './assets/components/LiveMarkets'
import CheckRate from './assets/components/CheckRate'
import CheckRateBox from './assets/components/CheckRate'

function App() {
  let [size, setSize]                 = useState(null)
  let [countryAbre, setCountryAbre]   = useState(null)
  let [countryNames, setCountryNames] = useState(null)
  let [unselect, setUnselect]         = useState(true)
  let [base, setBASE]                 = useState('USD')
  let [todaysData, settodaysData]     = useState('INR')

  
  useEffect(() => {
    async function getCurrenciesList() {
      const name_res = await fetch(
        "https://api.frankfurter.dev/v1/currencies"
      );

      const countryList = await name_res.json()
      
      setCountryAbre(Object.keys(countryList))
      setCountryNames(countryList)
      setSize(Object.keys(countryList).length)            
    }
    getCurrenciesList()
  }, [])

  const handleCurChangetoMe = (currency) => {
      setBASE(currency)
  };

  const GetTodaysData = (data) =>{
    settodaysData(data)
  }
 
  return (
    <>
      <div onClick={() => unselect ? setUnselect(false) : setUnselect(true)} className='h-dvh w-dvw bg-[#0A0A0A]'>
        <header>
          <div className='flex items-center justify-between shrink-0 p-3'>
            <img className='h-6' src="/src/assets/images/logo.svg" alt="Fx checker logo" />
            <div className='text-[#9D9D9D] text-[0.7rem] min-w-0 truncate'>
              {size} CURRENCIES · EOD · ECB DATA
            </div>
          </div>
        </header>

        <section>
          <LiveMarkets BASE={base} sendDatatoAPP={GetTodaysData}/>
        </section>

        <main>
          <CheckRateBox todaysData={todaysData} onCurChangetoApp={handleCurChangetoMe} countries={countryAbre} countryNames={countryNames} unselected={unselect} />
        </main>
      </div>
    </>
  )
}

export default App
