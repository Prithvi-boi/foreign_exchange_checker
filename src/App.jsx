import { useState, useEffect } from 'react'
import LiveMarkets from './assets/components/LiveMarkets'
import CheckRate from './assets/components/CheckRate'

function App() {
  let [size, setSize] = useState(null)
  let [countryAbre, setCountryAbre] = useState(null)
  useEffect(() => {
    async function getMarkets() {
      const res1 = await fetch(
        "https://api.frankfurter.dev/v1/latest?base=USD"
      );

      const today = await res1.json();
      
      const size = Object.keys(today.rates).length;
      setCountryAbre(Object.keys(today.rates))
      
      setSize(size)
    }
    getMarkets()
  }, [])
 
  return (
    <>
      <div className='h-dvh w-dvw bg-[#0A0A0A]'>

        <header>
          <div className='flex items-center justify-between shrink-0 p-3'>
            <img className='h-6' src="/src/assets/images/logo.svg" alt="Fx checker logo" />
            <div className='text-[#9D9D9D] text-[0.7rem] min-w-0 truncate'>
              {size} CURRENCIES · EOD · ECB DATA
            </div>
          </div>
        </header>

        <section>
          <LiveMarkets />
        </section>

        <main>
          <CheckRate countries={countryAbre} />
        </main>
      </div>
    </>
  )
}

export default App
