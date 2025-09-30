import { useState } from 'react'

const Button = (props) =>{
  return(  
    <button onClick={props.action}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => (
  <tr>
    <th style={{textAlign: "left", paddingRight: "1rem"}}>{props.text}</th> 
    <td>{props.value}</td>
  </tr>)

const Statistics = (props) =>{
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const allClicks = props.allClicks
  const average = (good - bad)/allClicks
  const positive = 100*good/allClicks + "%"

  if (allClicks != 0){
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="total" value={allClicks}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive}/>   
      </tbody>
    </table>
  )}
  else{
    return(
    <>
      <p>No feedback given</p>
    </>)
  }
}


const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleClickGood = (type) => {
    setGood(good + 1)
    console.log("Good has been clicked! Total good clicks: " + (good+1))
    setAll(allClicks + 1)
    console.log("Total clicks: " + (allClicks+1))       
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    console.log("Neutral has been clicked! Total neutral clicks: " + (neutral+1))   
    setAll(allClicks + 1)
    console.log("Total clicks: " + (allClicks+1))    
  }
  const handleClickBad = () => {
    setBad(bad + 1)
    console.log("Bad has been clicked! Total bad clicks: " + (bad+1)) 
    setAll(allClicks + 1)
    console.log("Total clicks: " + (allClicks+1))      
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        action={handleClickGood}
        text="good"
      />
      <Button 
        action={handleClickNeutral}
        text="neutral"
      />
      <Button 
        action={handleClickBad}
        text="bad"
      />
      
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allClicks={allClicks}
      />
    </div>
  )
}

export default App