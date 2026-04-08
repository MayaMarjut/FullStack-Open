// Consist exercises 1.1 and 1.5

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    props.part.map(value => <Part key={value.name} name={value.name} exercises={value.exercises} /> )
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises} </p>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
      name: 'Using props to pass data',
      exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
    ]
}

  return (
    <>
      <Header course={course.name}/>
      <Content part={course.parts} />
      <Total exercises={course.parts} />
    </>
  )
}

export default App
