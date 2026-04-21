import Person from './Person'

const Contacts = ({persons}) => {
        return (
            <>
                {persons.map(person =>
                <Person key={person.name} name={person.name} number={person.number} />
                )}
            </>
        );

}

export default Contacts;