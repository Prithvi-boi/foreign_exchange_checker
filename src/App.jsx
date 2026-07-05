import { useState, useEffect } from 'react'
import logo from "/src/assets/images/logo.svg"
import LiveMarkets from './assets/components/LiveMarkets'
import CheckRate_layout from './assets/components/CheckRate'

function App() {
  let [currencyNames,    setcurrencyNames]    = useState(null)
  let [currencyAbrev,    setcurrencyAbrev]    = useState(null)
  let [total_Currencies, settotal_Currencies] = useState(null)

  let [unselect,         setUnselect]         = useState(true)
  let [base,             setBASE]             = useState('USD')
  let [todaysData,       settodaysData]       = useState('INR')

  const getRates_Today      = (data)     => {settodaysData(data)}; // 3. getting rates of today from getRatesFromMarket- callback3
  // [7]> Set selected currency (BASE)
  const handleBASEchange    = (currency) => {setBASE(currency)}; 

  // fetch currencies only once using useEffect hook
  useEffect(() => {
    async function get_CurrenciesList() {
      const APIresponse = await fetch("https://api.frankfurter.dev/v1/currencies");
      const APIlist     = await APIresponse.json()
      
      setcurrencyNames(APIlist)
      setcurrencyAbrev(Object.keys(APIlist))
      settotal_Currencies(Object.keys(APIlist).length)            
    }
    get_CurrenciesList()
  }, [])

  return (
    <>
      <div className='h-dvh w-dvw bg-[#0A0A0A]' onClick={() => unselect ? setUnselect(false) : setUnselect(true)} >
    
        <header>
          <div className='flex items-center justify-between shrink-0 p-3'>
            <img className='h-6' src={logo} alt="App-logo" />
            <div className='min-w-0 text-[#9D9D9D] text-[0.7rem] truncate'>{total_Currencies} CURRENCIES · EOD · ECB DATA</div>
          </div>
        </header>

        <section>
          <LiveMarkets 
              BASE={base} // [8]> Send new currency (BASE) to Live Market
              getRatesFromMarket={getRates_Today} // 2. getting rates of today from LiveMarket.jsx - callback2
          />
        </section>

        <main>
          <h1 className='mt-4 p-4 text-xl'>CHECK THE RATE</h1>
          <CheckRate_layout 
              countries={currencyAbrev} 
              countryNames={currencyNames} 
              unselected={unselect} 
              ratesOftoday={todaysData} // 4. sending rates of today to CheckRateBox- props1
              CallbackFrom_Cklayout={handleBASEchange} 
          />
        </main>

      </div>
    </>
  )
}

export default App
