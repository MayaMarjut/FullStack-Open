// Consist exercises 1.1 and 1.2

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => {
  return (
    <Part part={props.part} exercise={props.exercise} />
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]} </p>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10, 7, 14]

  return (
    <>
      <Header course={course}/>
      <Content part={parts[0]} exercise={exercises[0]} />
      <Content part={parts[1]} exercise={exercises[1]} />
      <Content part={parts[2]} exercise={exercises[2]} />
      <Total exercises={exercises} />
    </>
  )
}

export default App
