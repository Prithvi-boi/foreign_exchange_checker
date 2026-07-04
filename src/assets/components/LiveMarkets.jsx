import { useState, useEffect } from 'react'

function LiveMarkets() {
  const date = new Date()
  const [rate, setRate] = useState(null);
  const pairs = [
    "JPY",
    "INR",
    "CHF",
    "EUR",
    "GBP",
  ];

  useEffect(() => {
    async function getMarkets() {
      const res1 = await fetch(
        "https://api.frankfurter.dev/v1/latest?base=USD"
      );

      const res2 = await fetch(
        `https://api.frankfurter.dev/v1/2026-07-${String(date.getDate() - 2).padStart(2, "0")}?base=USD`
      );

      const today = await res1.json();
      const yesterday = await res2.json();

      const markets = pairs.map((pair) => {
        const current = today.rates[pair];
        const previous = yesterday.rates[pair];
        const change = current - previous;
        const percentChange = (change / previous) * 100;

        return {
          pair: `USD/${pair}`,
          current,
          previous,
          percentChange,
        };
      });

      setRate(markets);
    }

    getMarkets();
  }, []);

  return (
    <>
      <div className='h-10 w-full bg-[#171719] flex '>
        <div className='h-full grid place-items-center p-2 bg-[#CEF739] text-[#171719] text-[0.8rem] shrink-0'>● LIVE MARKETS</div>

        <div className='flex h-full w-full overflow-x-scroll scrollbar-none text-[#171719] text-[0.8rem]'>

          {rate?.map((r) => {
            return (
              <div key={r.pair} className='shrink-0 h-full p-2 border-r-2 border-[#2E2E2E] ml-1 text-[#9D9D9D] flex items-center gap-3'>
                <h3>{r.pair}</h3>
                <p className='text-white'>{r.current.toFixed(2)}</p>
                <p className={r.percentChange >= 0 ? "text-green-500" : "text-red-500"}>
                  {r.percentChange >= 0 ? "▲" : "▼"}{" "}
                  {Math.abs(r.percentChange).toFixed(2)}%
                </p>
              </div>
            )})}
        </div>
      </div>
    </>
  )
}

export default LiveMarkets