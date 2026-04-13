// Consist exercises unicafe 1.6 to 1.11

import { useState } from 'react'
import './App.css'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Header = (props) => <h1>{props.text}</h1>

const StatisticLine = (props) => {
  if (props.text === "positive") {
      return (
        <tr>
          <th>{props.text}</th>
          <td>{props.value} %</td>
        </tr>
      )
  }
  return ( 
    <tr>
      <th>{props.text}</th>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({stats, allClicks}) => {

  if (allClicks === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <caption>Statistics</caption>
      <tbody>
      {stats.map((sta) => (
        <StatisticLine key={sta.text} text={sta.text} value={sta.value} />
      ))}
      </tbody>
    </table>
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

  const grades = [
    {text: "good", value: good},
    {text: "neutral", value: neutral},
    {text: "bad", value: bad},
    {text: "all", value: allClicks},
    {text: "average", value: average},
    {text: "positive", value: positive}
  ]

  const [stats, setStatistic] = useState(grades)

  const setGoodGrade = () => {
    const numberOfClicks = allClicks + 1
    setAll(numberOfClicks)

    const updateTotal = total + 1
    setTotal(updateTotal)
    setAverage(updateTotal / numberOfClicks )

    const updateGood = good + 1
    setGood(updateGood)

    setPositive((updateGood / numberOfClicks) * 100)
    setStatistic(stats.concat({good: updateGood, average:(updateTotal / numberOfClicks), positive: (updateGood / numberOfClicks) * 100}))
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
    setStatistic(stats.concat({bad: updateBad, average: (updateTotal / numberOfClicks), positive: (good / numberOfClicks) * 100}))
  }

  const setNeutralGrade = () => {
    const numberOfClicks = allClicks + 1
    setAll(numberOfClicks)

    setAverage(total / numberOfClicks )

    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
    
    setPositive((good / numberOfClicks) * 100)
    setStatistic(stats.concat({neutral: updateNeutral, average: (total / numberOfClicks), positive: (good / numberOfClicks) * 100}))
  }

  return (
    <>
      <Header text="Give feedback" />
      <Button onClick={setGoodGrade} text="good" />
      <Button onClick={setNeutralGrade} text="neutral" />
      <Button onClick={setBadGrade} text="bad" />
      <Statistics stats={grades} allClicks={allClicks} />
    </>
  )
}

export default App
