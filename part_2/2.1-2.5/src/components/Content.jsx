import Part from './Part'

const Content = ({parts}) => {

    const initialValue = 0
    const total = parts.reduce(
        (sum, part) =>  sum + part.exercises,
        initialValue
    )
  return (
    <>
    <ul>
        {parts.map(part => (
            <Part key={part.id} name={part.name} exercise={part.exercises} />
        ))}
    </ul>
    <strong>total of {total} exercises</strong>
    </>
  )
}

export default Content