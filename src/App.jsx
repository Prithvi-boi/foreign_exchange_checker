import { useState, useEffect, Component } from 'react'
// Image Imports
import logo from "/src/assets/images/logo.svg"

// Components Imports
import LiveMarkets from './assets/components/LiveMarkets'
import CheckRate_layout from './assets/components/CheckRate'
import TabsMenu from './assets/components/Tabs/TabsMenu'
import BigTabMenu from './assets/components/Tabs/BigTabMenu'
import History from './assets/components/Tabs/History'
import Compare from './assets/components/Tabs/Compare'
import Favorites from './assets/components/Tabs/Favorites'
import Logs from './assets/components/Tabs/Logs'

function App() {
  let [currencyNames, setcurrencyNames] = useState(null)
  let [currencyAbrev, setcurrencyAbrev] = useState(null)
  let [total_Currencies, settotal_Currencies] = useState(null)

  let [unselect, setUnselect] = useState(true)
  let [base, setBASE] = useState('USD')
  let [pair, setpair] = useState(['USD', 'INR'])
  let [todaysData, settodaysData] = useState('INR')
  let [rangedata, setRangedata] = useState({})
  let [inputAmt, setinputAmt] = useState(0)
  let [favonly, setfavonly] = useState(false)

  const getRates_Today = (data, rates_ranges) => { settodaysData(data), setRangedata(rates_ranges) }; // 3. getting rates of today from getRatesFromMarket- callback3
  // [7]> Set selected currency (BASE)
  const handleCurrencyChange = (bse, rve, input, fav) => { setBASE(bse), setpair([bse, rve]), setinputAmt(input), setfavonly(fav) };

  // fetch currencies only once using useEffect hook
  useEffect(() => {
    async function get_CurrenciesList() {
      const APIresponse = await fetch("https://api.frankfurter.dev/v1/currencies");
      const APIlist = await APIresponse.json()

      setcurrencyNames(APIlist)
      setcurrencyAbrev(Object.keys(APIlist))
      settotal_Currencies(Object.keys(APIlist).length)
    }
    get_CurrenciesList()
  }, [])

  const [selectedTab, setSelectedTab] = useState("HISTORY");
  const options = [
    "HISTORY",
    "COMPARE",
    "LOGS",
    "FAVORITES",
  ];

  const CallbackFrom_Tabs = (option) => { setSelectedTab(option) };
  const [tabID, setTabID] = useState('1D')

  const [favTog, setFavTog] = useState(false)
  const CallbackFrom_Compare = (pairAry, fav, FavToggle) => {
    setpair(pairAry)
    setfavonly(fav)
    setFavTog(FavToggle)
  }

  const [LogInfos , setLogInfos] = useState([])
  const [logToggle , setlogToggle] = useState(false)
  const handleLogClick = (currentBASE,currentRCVE,amount,convertedAmount) =>{
    setLogInfos([currentBASE,currentRCVE,amount,convertedAmount])
    setlogToggle(true)
  }

  const [ResponsiveTabFlag, setResponsiveTabFlag] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setResponsiveTabFlag(window.innerWidth > 640);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [favCount, setfavCount] = useState(0)
  const favCounter = (count) => {
    setfavCount(count)
  }
  const [logCount, setlogCount] = useState(0)
  const LogCounter = (count) => {
    setlogCount(count)
  }
  return (
    <>
      <div className='h-vh w-dvw bg-[#0A0A0A]' onClick={() => unselect ? setUnselect(false) : setUnselect(true)} >

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
            tabID={tabID}
          />
        </section>

        <main className='grid gap-y-4 grid-cols-[20px_auto_20px] lg:grid-cols-[120px_auto_120px]'>
          <CheckRate_layout
            countries={currencyAbrev}
            countryNames={currencyNames}
            unselected={unselect}
            ratesOftoday={todaysData} // 4. sending rates of today to CheckRateBox- props1
            CallbackFrom_Cklayout={handleCurrencyChange}
            CallbackForLOGS={handleLogClick}
          />

          <nav className={`col-start-2 h-14 z-999`}>
            {ResponsiveTabFlag ? 
              <BigTabMenu logCount={logCount} favCount={favCount} Callback={CallbackFrom_Tabs} TabOptions={options} default_tabs={selectedTab} />
              : <TabsMenu logCount={logCount} favCount={favCount} Callback={CallbackFrom_Tabs} TabOptions={options} default_tabs={selectedTab} />
            }
          </nav>

          <section className='col-start-2'>
            {selectedTab === "HISTORY" && (<History rangedata={rangedata} Currency_pairs={pair} callbackFrom_History={(val) => { setTabID(val) }} />)}
            <div className={selectedTab === "COMPARE" ? "block" : "hidden"}>
              <Compare
                callbacktoApp={CallbackFrom_Compare}
                BASE={base}
                VALUE={inputAmt}
                COUNTRIES={[currencyAbrev, currencyNames]}
                DATA={rangedata}
              />
            </div>

            <div className={selectedTab === "FAVORITES" ? "block" : "hidden"}>
              <Favorites
                pairs={favonly ? pair : undefined}
                DATA={rangedata}
                favToggle={favTog}
                callback={favCounter}
              />
            </div>

            <div className={selectedTab === "LOGS" ? "block" : "hidden"}>
              <Logs
                LogInfos = {logToggle ? LogInfos : undefined}
                callback = {LogCounter}
              />
            </div>
          </section>

          <footer className='col-start-2 h-10 w-full text-zinc-700 uppercase text-sm'>
            Designed by Prithvi beldar
          </footer>
        </main>

      </div>
    </>
  )
}

export default App
