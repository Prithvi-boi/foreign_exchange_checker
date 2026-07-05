import { useState, useEffect } from 'react'

function LiveMarkets({BASE, getRatesFromMarket}) {
  const [rates, setRate] = useState(null);
  const popular_pairs = [
    "JPY",
    "INR",
    "CHF",
    "EUR",
    "GBP",
  ];

  // Usefull range comparison in future implementation
  const start = new Date();
  const end = new Date();
  start.setDate(end.getDate() - 7);

  const endDate = end.toISOString().split("T")[0];
  const startDate = start.toISOString().split("T")[0];

  useEffect(() => {
    async function getMarkets() {
      const APIbase_response = await fetch(`https://api.frankfurter.dev/v1/${startDate}..${endDate}?base=${BASE}`);

      const ratesList = await APIbase_response.json();
      const rates_range = Object.values(ratesList.rates)   
      const data = {rates : rates_range[rates_range.length - 1]}  

      const markets = popular_pairs.map((pair) => {
        const current  = rates_range[rates_range.length - 1][pair];
        const previous = rates_range[rates_range.length - 2][pair];
        const change   = current - previous;
        const percentChange = (change / previous) * 100;
        
        return {
          pair: `${BASE}/${pair}`,
          current,
          percentChange,
        }}
      );
      setRate(markets);
      getRatesFromMarket(data) // 1. Sending rates of today to App.jsx - callback1
    }
    getMarkets();
  }, [BASE]);

  return (
    <>
      <div className='h-10 w-full bg-[#171719] flex '>
        <div className='h-full bg-[#CEF739] grid place-items-center p-2 text-[#171719] text-[0.8rem] shrink-0'>● LIVE MARKETS</div>
        <div className='flex h-full w-full overflow-x-scroll scrollbar-none text-[#171719] text-[0.8rem]'> {/*Pairs of Currencies; USD/INR*/}
          {rates?.map((rate) => {
            return (
              <div key={rate.pair} className='shrink-0 h-full p-2 border-r-2 border-[#2E2E2E] ml-1 text-[#9D9D9D] flex items-center gap-3'>
                <h3>{rate.pair}</h3>
                <p className='text-white'>{rate.current?.toFixed(2)}</p>
                <p className={rate.percentChange >= 0 ? "text-green-500" : "text-red-500"}>
                  {rate.percentChange >= 0 ? "▲" : "▼"}{" "}
                  {Math.abs(rate.percentChange).toFixed(2)}%
                </p>
              </div>
          )})}
        </div>
      </div>
    </>
  )
}

export default LiveMarkets