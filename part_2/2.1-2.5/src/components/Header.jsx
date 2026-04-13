const Header = (props) => {
  return (
    <>
      {props.level === 1 ? <h1>{props.name}</h1> : <h2>{props.name}</h2>}
    </>
  )
}

export default Header