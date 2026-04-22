const Countries = ({countries}) => {
    return (
        <>
        {countries.map(country =>
            <p key={country}>{country}</p>
        )}
        </>
    )
}

export default Countries;