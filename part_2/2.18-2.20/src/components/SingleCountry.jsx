const SingleCountry = ({countryData}) => {
    if (!countryData?.name?.common) {
        return null
    }

    return (
        <>
            <h1>{countryData.name.common}</h1>
            <dl>
                <dt>Capital:</dt>
                <dd>{countryData.capital}</dd>
                <dt>Area:</dt>
                <dd>{countryData.area}</dd>
            </dl>
            <h2>Languages</h2>
            <ul>
                {Object.values(countryData.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img src={countryData.flags.png} alt={countryData.flags.alt}></img>
        </>
    )
}

export default SingleCountry;