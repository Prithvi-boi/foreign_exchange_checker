import React, { useState, useRef, useEffect, useMemo } from "react";
const flagModules = import.meta.glob(
    "/src/assets/images/flags/*.webp",
    {
        eager: true,
        import: "default",
    }
);
const flags = Object.fromEntries(
    Object.entries(flagModules).map(([path, src]) => {
        const fileName = path.split("/").pop().replace(".webp", "");
        return [fileName.toUpperCase(), src];
    })
);
import tickIcon from "/src/assets/images/icon-check.svg"
import searchIcon from "/src/assets/images/icon-search.svg"
import exchangeVerticalIcon from "/src/assets/images/icon-exchange-vertical.svg"
import starFilledIcon from "/src/assets/images/icon-star-filled.svg"
import chevronDownIcon from "/src/assets/images/icon-chevron-down.svg"

function CheckRate({ countries, title, countryNames, default_currency, default_flag, unselected, text_col = 'white', onCurChangetobox, exchangeVar, cur, rateData, receiveAmtData, receiveAmt }) {
    const [search_input, setsearch_input] = useState(null)
    const [hideList, sethideList] = useState(false)
    let [dropDown, setDropdown] = useState(false)
    let [selected_currency, setselected_currency] = useState(default_currency)
    let [selected_flag, setselected_flag] = useState(default_flag)
    let [search_results, setsearch_results] = useState(null)

    let inputNum = useRef(null)
    let options
    let populars
    let popularCurrencies = ["USD", "INR", "JPY"]
    if (unselected && dropDown) {
        setDropdown(false)
        sethideList(false)
        setsearch_results(false)
    }

    useEffect(() => {
        setselected_currency(cur)
        onCurChangetobox(cur)
        setselected_flag(flags[cur.slice(0, 2)]);
    }, [exchangeVar])

    const handleClick = (country, countryflag) => {
        setselected_currency(country)
        setselected_flag(countryflag)
        onCurChangetobox(country)
        setDropdown(false)
        sethideList(false)
        setsearch_results(false)
    }

    const handleOnChange = (val) => {
        setsearch_input(val)
        !val ? sethideList(false) : sethideList(true)

        const filteredCountries = countries.filter((country) =>
            country.toLowerCase().includes(val.toLowerCase())
        );

        setsearch_results(
            filteredCountries.map((country) => {
                return (
                    <li onClick={() => handleClick(country, flags[country[0] + country[1]])} key={country + `1`} className="shrink-0 p-2 h-10 w-full hover:border-2 hover:border-white rounded-lg flex items-center gap-3">
                        <img className="rounded-full h-full" src={flags[country[0] + country[1]]} alt="countrylogo" />
                        <h6 className="text-white">{country}</h6>
                        <p className="text-sm">{countryNames[country]}</p>
                    </li>
                )
            })
        )
    }

    if (countries) {
        options = countries.map((country) => {
            return (
                <li onClick={() => handleClick(country, flags[country[0] + country[1]])} key={country + `1`} className="shrink-0 p-2 h-10 w-full hover:border-2 hover:border-white rounded-lg flex items-center gap-3">
                    <img className="rounded-full h-full" src={flags[country[0] + country[1]]} alt="countrylogo" />
                    <h6 className="text-white">{country}</h6>
                    <p className="text-sm">{countryNames[country]}</p>
                    {country == selected_currency ? <img className="ml-auto" src={tickIcon} alt="tickIcon" /> : null}
                </li>
            )
        })

        populars = countries.map((country) => {
            if (!popularCurrencies.includes(country)) return
            return (
                <li onClick={() => handleClick(country, flags[country[0] + country[1]])} key={country + `1`} className="shrink-0 p-2 h-10 w-full hover:border-2 hover:bg-[#053800] hover:border-white rounded-lg flex items-center gap-3">
                    <img className="rounded-full h-full" src={flags[country[0] + country[1]]} alt="countrylogo" />
                    <h6 className="text-white">{country}</h6>
                    <p className="text-sm">{countryNames[country]}</p>
                    {country == selected_currency ? <img className="ml-auto" src={tickIcon} alt="tickIcon" /> : null}
                </li>
            )
        })
    }

    return (
        <>
            <div className='h-30 w-full rounded-2xl bg-[#202022] p-3 flex flex-col justify-evenly border-[#2E2E2E] border-2'>
                <h3 className='text-[#C6C6C6]'>{title}</h3>

                <div className='flex items-center justify-between'>

                    {/* Input Number box */}
                    {title == 'SEND' && <input placeholder="0.00" onChange={(e) => { receiveAmtData(e.target.value) }} className="text-4xl w-45 outline-0" type="number" />}

                    {title == 'RECEIVE' && <div style={{ color: text_col }} className="text-4xl w-45 overflow-x-scroll overflow-y-hidden scrollbar-none">{receiveAmtData}</div>}

                    {/* Dropbox + Search */}
                    <div className="relative">
                        <button onClick={() => { dropDown ? setDropdown(false) : setDropdown(true) }} className="bg-zinc-900 text-white border border-zinc-700 rounded mr-2 px-3 py-2 flex justify-evenly items-center gap-2">
                            <img className="rounded-full h-5" src={selected_flag ? selected_flag : default_flag} alt="country flag" />
                            <p>{selected_currency ? selected_currency : default_currency}</p>
                            <img src={chevronDownIcon} alt="drop arrow" />
                        </button>

                        {dropDown &&
                            <div id="Dropdown" className="z-999 w-70 h-90 bg-zinc-800 border-zinc-700 border-2 absolute mt-1 -ml-45 rounded-xl p-2 text-zinc-500">
                                <div id="search" className="flex gap-3 bg-zinc-900 border-2 border-zinc-600 p-1 pl-3 rounded-lg">
                                    <img src={searchIcon} alt="search Icon" />
                                    <input onClick={(e) => e.stopPropagation()} onChange={(e) => handleOnChange(e.target.value)} className="w-full outline-0" type="text" name="search" id="search" placeholder="Search countries" />
                                </div>

                                {!hideList &&
                                    <div className="overflow-y-scroll h-70 scrollbar-none">
                                        <div className="mt-2 mb-2 p-2 flex justify-between">
                                            <h3>POPULAR</h3>
                                            <p>{popularCurrencies.length}</p>
                                        </div>

                                        <ul className="flex flex-col gap-2">
                                            {populars}
                                        </ul>


                                        <div className="mt-3 mb-2 p-2 flex justify-between">
                                            <h3>OTHER CURRENCIES</h3>
                                            <p>{options.length}</p>
                                        </div>

                                        <ul className="flex flex-col gap-2">
                                            {options}
                                        </ul>
                                    </div>
                                }

                                {search_results &&
                                    <div className="overflow-y-scroll h-full scrollbar-none">
                                        <div className="mt-1 mb-2 p-2 flex justify-between flex-col">
                                            <h3 className="mb-3">Search Result</h3>
                                            <ul className="flex flex-col gap-2">
                                                {search_results}
                                            </ul>
                                        </div>

                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

function CheckRateBox({ countries, countryNames, unselected, onCurChangetoApp, todaysData }) {
    let [curBase, setCurBase] = useState('USD')
    let [curRev, setCurRev] = useState('INR')
    let [exchange, setexchange] = useState(false)
    let [receiveAmt, setreceiveAmt] = useState(null)

    const receiveAmtData = (amt) => {
        setreceiveAmt(Number(amt))
    }

    const handleBasetoApp = (currency) => {
        onCurChangetoApp(currency)
        setCurBase(currency)
    };

    const handleBasetoApp2 = (currency) => {
        setCurRev(currency)
    };

    const handleExchange = () => {
        !exchange ? setexchange(true) : setexchange(false)
        setCurBase(curRev)
        setCurRev(curBase)
        console.log(exchange, "Box");
    }

    let rate = todaysData?.rates?.[curRev];
    const amount = Number(receiveAmt);
    const convertedAmount =
        amount && rate != null
            ? (amount * rate).toFixed(2)
            : amount;

    return (
        <>
            <h1 className='text-xl p-4 mt-4'>CHECK THE RATE</h1>
            <div className='w-[calc(90%-0,5rem)] rounded-2xl bg-[#171719] mx-4 p-3 flex flex-col items-center justify-evenly gap-4'>
                <CheckRate receiveAmtData={receiveAmtData} rateData={rate} cur={curBase} exchangeVar={exchange} onCurChangetobox={handleBasetoApp} unselected={unselected} countryNames={countryNames} countries={countries} title={"SEND"} default_currency={"USD"} default_flag={'/src/assets/images/flags/us.webp'} />
                <div onClick={() => handleExchange()} className='h-12 w-12 rounded-lg bg-[#202022] p-3 flex flex-col justify-evenly border-[#2E2E2E] border-2'>
                    <img src={exchangeVerticalIcon} alt="exchange vertical icon" />
                </div>
                <CheckRate receiveAmtData={convertedAmount == 0 ? '0.00' : convertedAmount} rateData={rate} cur={curRev} exchangeVar={exchange} onCurChangetobox={handleBasetoApp2} text_col={"#CEF739"} unselected={unselected} countryNames={countryNames} countries={countries} title={"RECEIVE"} default_currency={"INR"} default_flag={'/src/assets/images/flags/in.webp'} />

                <hr className='h-[0.1px] w-full border-t-2 border-dashed border-[#222222]' />
                <p className='text-[0.8rem]'> 1 {curBase} = {rate || 1} {curRev}</p>
                <div className='flex gap-4'>

                    <button className='rounded-lg h-10 p-3 bg-[#CEF739] text-black font-extrabold flex items-center justify-evenly gap-2'>
                        <img src={starFilledIcon} alt="star emoji" />
                        <p className='text-[0.8rem]'>FAVORITED</p>
                    </button>

                    <button className='rounded-lg h-10 flex items-center p-3 outline-1 outline-white'>
                        <p className='text-[0.8rem]'>LOG CONVERSATION</p>
                    </button>
                </div>
            </div>
        </>
    )
}


export default CheckRateBox