import { useState, useEffect } from 'react'

function LiveMarkets({BASE, getRatesFromMarket,tabID}) {
  const [TabDateRange, setTabDateRange] = useState(tabID)
  useEffect(()=>{
    setTabDateRange(tabID)
  },[tabID])

  const [rates, setRate] = useState(null);
  const popular_pairs = [
    "JPY",
    "INR",
    "CHF",
    "EUR",
    "GBP",
  ];

  // Usefull range comparison in future implementation
  const today = new Date();
  const ranges = {
    "1D": 1,
    "1W": 7,
    "1M": 1,
    "3M": 3,
    "1Y": 1,
    "5Y": 5,
  };

  const [startDateincreser , setIncreser] = useState(1)
  function getDateRange(range) {
    const end = new Date(today);
    const start = new Date(today);    

    switch (range) {
      case "1D":
        end.setDate(end.getDate() - 1);
        start.setDate(start.getDate() - startDateincreser);
        break;

      case "1W":
        start.setDate(start.getDate() - 7);
        break;

      case "1M":
        start.setMonth(start.getMonth() - 1);
        break;

      case "3M":
        start.setMonth(start.getMonth() - 3);
        break;

      case "1Y":
        start.setFullYear(start.getFullYear() - 1);
        break;

      case "5Y":
        start.setFullYear(start.getFullYear() - 5);
        break;
    }
        
    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    };
  }

  const { start, end } = getDateRange(tabID);

  useEffect(() => {
    async function getMarkets() {
      const APIbase_response = await fetch(`https://api.frankfurter.dev/v1/${start}..${end}?base=${BASE}`);
      
      const ratesList = await APIbase_response.json();
      
      const rates_range = Object.values(ratesList.rates) 
      if (rates_range.length != 2) {
        setIncreser(prev => prev + 1)
        return
      }
      
        
      const data = {rates : rates_range[rates_range.length - 1]}  

      const markets = popular_pairs.map((pair) => {
        const current = rates_range[rates_range.length - 1]?.[pair];
        const previous = rates_range[rates_range.length - 2]?.[pair] ?? current;
        const change   = current - previous;
        const percentChange = (change / previous) * 100;
        
        return {
          pair: `${BASE}/${pair}`,
          current,
          percentChange,
        }}
      );
      setRate(markets);
        
      getRatesFromMarket(data, ratesList.rates ) // 1. Sending rates of today to App.jsx - callback1
    }
    getMarkets();
  }, [BASE, start, end]);

  const [Clicked , setClicked] = useState(false)
  window.addEventListener('mousedown', (event) => {setClicked(true)});
  window.addEventListener('mouseup', (event) => {setClicked(false)});
  
  
  return (
    <>
      <div className='h-10 w-full bg-[#171719] flex '>
        <div className='h-full bg-[#CEF739] grid place-items-center p-2 text-[#171719] text-[0.8rem] shrink-0'>● LIVE MARKETS</div>
        <div className={`${Clicked ? 'cursor-grabbing' : 'cursor-grab'} flex h-full w-full overflow-x-scroll scrollbar-none text-[#171719] text-[0.8rem]`}> {/*Pairs of Currencies; USD/INR*/}
          {rates?.map((rate) => {
            return ( 
              <div key={rate.pair} className='shrink-0 h-full p-2 border-r-2 border-[#2E2E2E] ml-1 text-[#9D9D9D] flex items-center gap-3'>
                <h3>{rate.pair}</h3>
                <p className='text-white'>{rate.current?.toFixed(2)}</p>
                <p className={rate.percentChange >= 0 ? "text-green-500" : "text-red-500"}>
                  {rate.percentChange >= 0 ? "▲" : "▼"}{" "}
                  {(!isNaN(rate.percentChange)) ? Math.abs(rate.percentChange).toFixed(2) : 0}%
                </p>
              </div>
          )})}
        </div>
      </div>
    </>
  )
}

export default LiveMarkets