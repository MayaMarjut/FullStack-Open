const Countries = ({countries, showCountry}) => {
    return (
        <>
        {countries.map(country =>
            <p key={country}>{country}<button onClick={() => showCountry(country)}>Show</button></p>
        )}
        </>
    )
}

export default Countries;