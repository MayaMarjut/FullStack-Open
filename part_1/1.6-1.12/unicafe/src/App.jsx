import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Display = (props) => {
  if (props.text === "positive") {
      return (
        <p>{props.text} {props.value} %</p>
      )
  }
  return (  
      <p>{props.text} {props.value}</p>
  )
}

function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const setGoodGrade = () => {
    const numberOfClicks = allClicks + 1
    setAll(numberOfClicks)

    const updateTotal = total + 1
    setTotal(updateTotal)

    setAverage(updateTotal / numberOfClicks )
    const updateGood = good + 1
    setGood(updateGood)
    setPositive((updateGood / numberOfClicks) * 100)
  }

  const setBadGrade = () => {
    const numberOfClicks = allClicks + 1
    setAll(numberOfClicks)

    const updateTotal = total - 1
    setTotal(updateTotal)

    setAverage(updateTotal / numberOfClicks )
    const updateBad = bad + 1
    setBad(updateBad)
    setPositive((good / numberOfClicks) * 100)
  }

  const setNeutralGrade = () => {
    const numberOfClicks = allClicks + 1
    setAll(numberOfClicks)

    setAverage(total / numberOfClicks )
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
    setPositive((good / numberOfClicks) * 100)
  }

  return (
    <>
      <h1>Give feedback</h1>
      <Button onClick={setGoodGrade} text="good" />
      <Button onClick={setNeutralGrade} text="neutral" />
      <Button onClick={setBadGrade} text="bad" />
      <h2>Statistics</h2>
      <Display value={good} text="good"/>
      <Display value={neutral} text="neutral" />
      <Display value={bad} text="bad" />
      <Display value={allClicks} text="all" />
      <Display value={average} text="average" />
      <Display value={positive} text="positive" />
    </>
  )
}

export default App
