import { useState, useRef, useEffect } from "react";
import chevronDownIcon from "/src/assets/images/icon-chevron-down.svg"
import searchIcon from "/src/assets/images/icon-search.svg"
import tickIcon from "/src/assets/images/icon-check.svg"
const flagModules = import.meta.glob("/src/assets/images/flags/*.webp", {eager: true, import: "default",});
// Change the Keys with currency abreviation - ex: 'AU' : '/src/assets....'
export const flags = Object.fromEntries(
    Object.entries(flagModules).map(([path, src]) => {
        const fileName = path.split("/").pop().replace(".webp", "");
        return [fileName.toUpperCase(), src];
    })
);


function Dropdown(
    {
        default_flag, 
        default_currency,
        countriesList,
        countriesNames,
        unselected,
        default_BASE,
        exchangeVar,
        CallbackTo_CheckRate,
    }) {
    
    // ---------------- Dropdown btn code ---------------
    
    let [selected_currency, setselected_currency] = useState(default_currency)
    let [selected_flag, setselected_flag] = useState(default_flag)

    let [dropDown, setDropdown] = useState(true)
    const ToggleDropdown = () => {         
        if (!dropDown) {
            setDropdown(true) 
            setNormalList(true)
        }else{
            setDropdown(false)
            setNormalList(false)
            setSearchList(false)
        }
    }
    
    // ---------------- Dropdown box code --------------- 1. search box
    const [search_input, setsearch_input] = useState(null)
    const [search_results, setsearch_results] = useState(null)
    const handleOnChange = (val) => {
        setsearch_input(val)
        if (!val) {
            setNormalList(true)
            setSearchList(false)
        }else{
            setSearchList(true)
            setNormalList(false)
        }

        const filteredCountries = countriesList.filter((country) =>
            country.toLowerCase().includes(val.toLowerCase())
        );

        setsearch_results(
            filteredCountries.map((country) => {
                return (
                    <li onClick={() => handleClick(country, flags[country[0] + country[1]])} key={country + `1`} className="flex gap-3 items-center shrink-0 p-2 h-10 w-full hover:border-2 hover:border-white rounded-lg">
                        <img className="h-full rounded-full" src={flags[country[0] + country[1]]} alt="countrylogo" />
                        <h6 className="text-white">{country}</h6>
                        <p className="text-sm">{countriesNames[country]}</p>
                    </li>
                )
            })
        )
    }

    // ---------------- Dropdown box code --------------- 2. Lists
    let options
    let populars
    let popularCurrencies = ["USD", "INR", "JPY"]
    const [hideNormalList, setNormalList] = useState(false)
    const [hideSearchList, setSearchList] = useState(false)
    
    const handleClick = (country, countryflag) => {
        setselected_currency(country)
        setselected_flag(countryflag)
        setDropdown(false)
        setNormalList(false)
        setSearchList(false)
        CallbackTo_CheckRate(country) // [4]> send selected currency (BASE) to Check Rate
    }

    if (countriesList) {
        options = countriesList.map((country) => {
            return (
                <li onClick={() => handleClick(country, flags[country[0] + country[1]])} key={country + `1`} className="flex gap-3 items-center shrink-0 p-2 h-10 w-full hover:border-2 hover:border-white rounded-lg">
                    <img className="h-full rounded-full" src={flags[country[0] + country[1]]} alt="countrylogo" />
                    <h6 className="text-white">{country}</h6>
                    <p className="text-sm">{countriesNames[country]}</p>
                    {country == selected_currency ? <img className="ml-auto" src={tickIcon} alt="tickIcon" /> : null}
                </li>
            )
        })
        
        populars = countriesList.map((country) => {
            if (!popularCurrencies.includes(country)) return
            return (
                <li onClick={() => handleClick(country, flags[country[0] + country[1]])} key={country + `1`} className="flex gap-3 items-center shrink-0 p-2 h-10 w-full hover:bg-[#053800] hover:border-2 hover:border-white rounded-lg">
                    <img className="h-full rounded-full" src={flags[country[0] + country[1]]} alt="countrylogo" />
                    <h6 className="text-white">{country}</h6>
                    <p className="text-sm">{countriesNames[country]}</p>
                    {country == selected_currency ? <img className="ml-auto" src={tickIcon} alt="tickIcon" /> : null}
                </li>
            )
        })
    }

    //-------------------------------------------undisplay drop box through whole screen
    if (unselected && dropDown) {
        setDropdown(false)
        setNormalList(false)
        setsearch_results(false)
    }
    
    // ------------------------------------------Sending data to parent component
    useEffect(() => {
        setselected_currency(default_BASE)
        CallbackTo_CheckRate(default_BASE) // [3]> send default base back to App for once 
        setselected_flag(flags[default_BASE.slice(0, 2)]); 
    }, [exchangeVar])

    //------------------------------------------------------ Returns
    return (
        <div className="col-start-3 m-auto relative">

            <button onClick={() => ToggleDropdown()} className="w-full flex gap-2 items-center justify-evenly mr-2 px-2 py-2 text-white bg-zinc-900 border border-zinc-700 rounded">
                <img className="h-5 rounded-full" src={selected_flag ? selected_flag : default_flag} alt="country flag" />
                <p>{selected_currency ? selected_currency : default_currency}</p>
                <img src={chevronDownIcon} alt="drop arrow" />
            </button>

            {dropDown &&
                <div id="Dropdown" className="z-999 absolute mt-1 p-2 h-90 w-70 text-zinc-500 bg-zinc-800 border-2 border-zinc-700 -ml-45 rounded-xl">
                    <div id="search" className="flex gap-3 p-1 pl-3 bg-zinc-900 border-2 border-zinc-600 rounded-lg">
                        <img src={searchIcon} alt="search Icon" />
                        <input onClick={(e) => e.stopPropagation()} onChange={(e) => {handleOnChange(e.target.value)}} className="w-full outline-0" type="text" name="search" id="search" placeholder="Search countries" />
                    </div>

                    {hideNormalList &&
                        <div className="overflow-y-scroll h-70 scrollbar-none">
                            <div className="flex justify-between mb-2 mt-2 p-2">
                                <h3>POPULAR</h3>
                                <p>{popularCurrencies.length}</p>
                            </div>

                            <ul className="flex flex-col gap-2">
                                {populars}
                            </ul>


                            <div className="flex justify-between mb-2 mt-3 p-2">
                                <h3>OTHER CURRENCIES</h3>
                                <p>{options.length}</p>
                            </div>

                            <ul className="flex flex-col gap-2">
                                {options}
                            </ul>
                        </div>
                    }

                    {hideSearchList &&
                        <div className="overflow-y-scroll h-full scrollbar-none">
                            <div className="flex flex-col justify-between mb-2 mt-1 p-2">
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
    )
}

export default Dropdown