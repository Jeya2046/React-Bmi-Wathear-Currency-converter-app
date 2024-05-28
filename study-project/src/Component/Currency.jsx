import { useEffect } from 'react';
import './currency.css';
import { useState } from 'react';
import axios from 'axios';

export const Currency = () => {

    const [amout, setAmount] = useState(1)
    const [tocurrency, setToCurrency] = useState("USD")
    const [fromcurrency, setFromCurrency] = useState("IND")
    const [convercurrency, setConvertedCurrency] = useState(null);
    const [excahngerate, setExchangeRate] = useState(null);

    useEffect(() => {
        const getCurrecyData = async () => {
            try {
                let url = `https://api.exchangerate-api.com/v4/latest/USD${fromcurrency}`;
                const res = await axios.get(url);
                setExchangeRate(res.data.rates[tocurrency])
                console.log(res);
            } catch (error) {
                console.log("Error Fetching Excenge Rate : ", error);
            }
        }
        getCurrecyData()
    },[fromcurrency, tocurrency])

    useEffect(() =>{
        if(excahngerate !== null){
            setConvertedCurrency((amout * excahngerate).toFixed(2))
        }
    },[amout, excahngerate])

    const handleAmountChange = (e) => {
        const value1 = parseFloat(e.target.value);
        setAmount(isNaN(value1) ? 0 : value1);
    }

    return (

        <>
            <div className="currency-converter">
                <div className="box"></div>
                <div className="data">
                    <h1>Currency Converter</h1>
                    <div className="input-container">
                        <label htmlFor='Amt' >Amount : </label>
                        <input type='number' value={amout} onChange={handleAmountChange} id='amt' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='to-currency'>From-Currency </label>
                        <select id='from-currency' value={fromcurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                            <option value="USD">USD - United States Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound Sterling</option>
                            <option value="JPY">JPY - Japanese Yen</option>
                            <option value="AUD">AUD - Australian Dollar</option>
                            <option value="CAD">CAD - Canadian Dollar</option>
                            <option value="CNY">CNY - Chinese Yuan</option>
                            <option value="INR">INR - Indian Rupee</option>
                            <option value="BRL">BRL - Brazilian Real</option>
                            <option value="ZAR">ZAR - South African Rand</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <label htmlFor='to-currency'>To-Currency </label>
                        <select id='to-currency' value={tocurrency} onChange={(e) => setToCurrency(e.target.value)}>
                            <option value="USD">USD - United States Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound Sterling</option>
                            <option value="JPY">JPY - Japanese Yen</option>
                            <option value="AUD">AUD - Australian Dollar</option>
                            <option value="CAD">CAD - Canadian Dollar</option>
                            <option value="CNY">CNY - Chinese Yuan</option>
                            <option value="INR">INR - Indian Rupee</option>
                            <option value="BRL">BRL - Brazilian Real</option>
                            <option value="ZAR">ZAR - South African Rand</option>
                        </select>
                    </div>
                    <div className="result">
                        <p>{amout} {fromcurrency} Equal To {convercurrency} {tocurrency}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

