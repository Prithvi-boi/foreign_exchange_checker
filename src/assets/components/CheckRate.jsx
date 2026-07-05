import React, { useState, useRef, useEffect, useMemo } from "react";
import Shuffle from "./Shuffle";
import Dropdown from "./Dropdown";
import starFilledIcon from "/src/assets/images/icon-star-filled.svg"

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
            <div className='flex flex-col justify-evenly p-3 h-30 w-full bg-[#202022] border-2 border-[#2E2E2E] rounded-2xl'>
                <h3 className='text-[#C6C6C6]'>{title}</h3>

                <div className='flex items-center justify-between'>

                    {/* Input Number box */}
                    {title == 'SEND' && <input placeholder="0.00" onChange={(e) => { receiveAmtData(e.target.value) }} className="w-45 text-4xl outline-0" type="number" />}
                    {title == 'RECEIVE' && <div style={{ color: num_color }} className="overflow-x-scroll overflow-y-hidden w-45 text-4xl scrollbar-none">{receiveAmtData}</div>}

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
        CallbackFrom_Cklayout(currency)
        setcurrentBASE(currency)
    }; 
    const getRCVEfromDropBOX = (currency) => {setcurrentRCVE(currency)};

    return (
        <>
        <div className='flex flex-col gap-4 items-center justify-evenly mx-4 p-3 w-[calc(90%-0,5rem)] bg-[#171719] rounded-2xl'>
                <CheckRate 
                    title={"SEND"} 
                    default_currency={"USD"} 
                    default_flag={'/src/assets/images/flags/us.webp'} 
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
                    default_flag={'/src/assets/images/flags/in.webp'} 
                    default_BASE={currentRCVE}

                    countryNames={countryNames} 
                    countriesList={countries} 
                    unselected={unselected}

                    receiveAmtData={convertedAmount == 0 ? '0.00' : convertedAmount}
                    rateData={Reciever_rate}
                    exchangeVar={exchange} 
                    CallbackTo_CkRateLayout={getRCVEfromDropBOX} 
                />

                <hr className='h-[0.1px] w-full border-[#222222] border-dashed border-t-2' />

                <p className='text-[0.8rem]'> 1 {currentBASE} = {Reciever_rate || 1} {currentRCVE}</p>
                <div className='flex gap-4'>
                    <button className='flex gap-2 items-center justify-evenly p-3 h-10 font-extrabold text-black bg-[#CEF739] rounded-lg'>
                        <img src={starFilledIcon} alt="star emoji" />
                        <p className='text-[0.8rem]'>FAVORITED</p>
                    </button>

                    <button className='flex items-center p-3 h-10 outline-1 outline-white rounded-lg'>
                        <p className='text-[0.8rem]'>LOG CONVERSATION</p>
                    </button>
                </div>
        </div>
        </>
    )
}

export default CheckRate_layout