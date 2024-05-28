import { useState } from 'react'
import './Bmi.css'

export const Bmi = () => {

    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [bmi, setBmi] = useState(null)
    const [bmistatus, setBmistatus] = useState("")
    const [errorMessage, seterrorMessage] = useState("")

    const bmiCal = () => {
        const isValidHeight = /^\d+$/.test(height);
        const isValidWeight = /^\d+$/.test(weight);
        if (isValidWeight && isValidHeight) {
            const heightInMeters = height / 100;
            const bmiValue = weight / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(2));
            if (bmiValue < 18.5) {
                setBmistatus("Under Weight")
            }
            else if (bmiValue >= 18.5 && bmiValue < 24.9) {
                setBmistatus("Nomal Value")
            } 
            else if (bmiValue >= 25 && bmiValue < 29.9) {
                setBmistatus("Over Weight")
            }
            else{
                setBmistatus("Obese")
            }
            seterrorMessage("")
        } else {
            setBmi(null);
            setBmistatus("")
            seterrorMessage("Please Enter Numeric Values")
        }
    }

    const clear = () =>{
        setBmi(null);
        setHeight("")
        setWeight("")
        setBmistatus("")
    }

    return (
        <>
            <div className="Bmi-calculater">               
                <div className="box"></div>
                <div className="data">
                    <h1>BMI CAlULATER</h1>
                    {seterrorMessage && <p className='error'>{errorMessage}</p>}
                    <div className="input-container">
                        <label htmlFor='height'>Height (cm)</label>
                        <input type='text' value={height} onChange={(e) => setHeight(e.target.value)} id='height' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='weight'>Weight (km)</label>
                        <input type='text' value={weight} onChange={(e) => setWeight(e.target.value)} id='weight' />
                    </div>
                    <button onClick={bmiCal}>Calculate BMI</button>
                    <button onClick={clear}>Clear</button>
                    {bmi !== null && (
                        <div className="result">
                        <p>Your Bmi is: {bmi}</p>
                        <p>Status : {bmistatus}</p>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}
