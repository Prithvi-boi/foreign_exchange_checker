import React, { useState, useRef, useEffect, useMemo } from "react";
import Shuffle from "./Shuffle";
import Dropdown from "./Dropdown";
import starFilledIcon from "/src/assets/images/icon-star-filled.svg"
import { flags } from "./Dropdown";

//-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x

function CheckRate(
    { 
        title,
        num_color = 'white',
        receiveAmtData, 
        rateData, // X
        receiveAmt, // X

        // Goes to Dropbox
        default_currency, 
        default_flag,
        default_BASE,
        countriesList, 
        countryNames, 
        unselected, 
        exchangeVar, 
        CallbackTo_CkRateLayout, 
    }) {

    let inputNum = useRef(null)
    const Callbackfrom_Dropbox = (BASE) => {CallbackTo_CkRateLayout(BASE)}  // [5]> send selected currency (BASE) to Check Rate Layout

    return (
        <>
            <div className='grid-cols-1 grid-rows-[1fr_3fr] grid p-3 h-30 w-full bg-[#202022] border-2 border-[#2E2E2E] rounded-2xl'>
                <h3 className='text-[#C6C6C6]'>{title}</h3>

                <div className='grid grid-cols-[1fr_1rem_8rem]'>

                    {/* Input Number box */}
                    {title == 'SEND' && <input placeholder="0.00" onChange={(e) => { receiveAmtData(e.target.value) }} className="mr-auto my-auto w-full text-4xl outline-0" type="number" onWheel={(e) => (e) => e.currentTarget.blur()} />}
                    {title == 'RECEIVE' && <div style={{ color: num_color }} className="mr-auto my-auto overflow-x-scroll overflow-y-hidden w-full text-4xl scrollbar-none">{receiveAmtData}</div>}

                    {/* Dropdown + Search */}
                    <Dropdown
                        default_flag     ={default_flag}
                        default_currency ={default_currency}
                        countriesList    ={countriesList}
                        countriesNames   ={countryNames}
                        unselected       ={unselected}
                        default_BASE     ={default_BASE} // [2]> send default base to Dropbox
                        exchangeVar      ={exchangeVar}
                        CallbackTo_CheckRate={Callbackfrom_Dropbox}
                    />
                </div>
            </div>
        </>
    )
}

function CheckRate_layout({ratesOftoday, countries, countryNames, unselected, CallbackFrom_Cklayout,  }) {
    let [currentBASE, setcurrentBASE] = useState('USD')
    let [currentRCVE, setcurrentRCVE] = useState('INR') // RCVE means Reciever currency
    // console.log(currentBASE, currentRCVE);
    
    let [exchange, setexchange]     = useState(false)
    let [receiveAmt, setreceiveAmt] = useState(null)

    const Reciever_rate = ratesOftoday?.rates?.[currentRCVE]; // get rate of receiver country
    const amount = Number(receiveAmt);
    const convertedAmount = amount && Reciever_rate != null ? (amount * Reciever_rate).toFixed(2) : amount;

    const CallbackFrom_Shuffle = (BASE, RCVE) => {
        !exchange ? setexchange(true) : setexchange(false)
        setcurrentBASE(RCVE)
        setcurrentRCVE(BASE)
    }

    const receiveAmtData = (amt) => {setreceiveAmt(Number(amt))}
    // [6]> send selected currency (BASE) to App and Changes its own BASE
    const handleBasetoApp = (currency) => {
        setcurrentBASE(currency)
        CallbackFrom_Cklayout(currency, currentRCVE)
    }; 
    const getRCVEfromDropBOX = (currency) => {
        CallbackFrom_Cklayout(currentBASE, currency)
        setcurrentRCVE(currency)
    };

    return (
        <>
        <h1 className='col-start-2 mt-4 text-xl  '>CHECK THE RATE</h1>
        <div className='col-start-2 w-full grid grid-cols-[0.9rem_1fr_0.9rem] grid-rows-[2fr_2.5rem_6rem] sm:grid-rows-[2fr_2.5rem_3rem]  p-3 bg-[#171719] rounded-2xl'>
                <section className="row-start-1 col-start-2 flex flex-col sm:flex-row items-center gap-5">
                    <CheckRate
                        title={"SEND"}
                        default_currency={"USD"}
                        default_flag={flags["US"]}
                        default_BASE={currentBASE} // [1]> send default base to Checkrate

                        countryNames={countryNames}
                        countriesList={countries}
                        unselected={unselected}

                        receiveAmtData={receiveAmtData}
                        rateData={Reciever_rate}
                        exchangeVar={exchange}
                        CallbackTo_CkRateLayout={handleBasetoApp}
                    />

                    <Shuffle ex={exchange} callback={CallbackFrom_Shuffle} base={currentBASE} rcve={currentRCVE} />

                    <CheckRate
                        title={"RECEIVE"}
                        num_color={"#CEF739"}
                        default_currency={"INR"}
                        default_flag={flags["IN"]}
                        default_BASE={currentRCVE}

                        countryNames={countryNames}
                        countriesList={countries}
                        unselected={unselected}

                        receiveAmtData={convertedAmount == 0 ? '0.00' : convertedAmount}
                        rateData={Reciever_rate}
                        exchangeVar={exchange}
                        CallbackTo_CkRateLayout={getRCVEfromDropBOX}
                    />
                </section>

                <hr className='m-auto row-start-2 col-start-2 h-[0.1px] w-full border-[#222222] border-dashed border-t-2' />
                <section className="sm:flex-row flex flex-col justify-center items-center gap-4 row-start-3 col-start-2">
                    <p className='text-[0.8rem]'> 1 {currentBASE} = {Reciever_rate || 1} {currentRCVE}</p>
                    <div className='sm:ml-auto flex gap-4'>
                        <button className='flex gap-2 items-center justify-evenly p-3 h-10 font-extrabold text-black bg-[#CEF739] rounded-lg'>
                            <img src={starFilledIcon} alt="star emoji" />
                            <p className='text-[0.8rem]'>FAVORITED</p>
                        </button>

                        <button className='flex items-center p-3 h-10 outline-1 outline-white rounded-lg'>
                            <p className='text-[0.8rem]'>LOG CONVERSATION</p>
                        </button>
                    </div>
                </section>
        </div>
        </>
    )
}

export default CheckRate_layout