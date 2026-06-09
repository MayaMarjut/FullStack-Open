import Person from './Person'

const Contacts = ({persons, deleteContact}) => {
        return (
            <>
                {persons.map(person =>
                <div key={person.id} style={{display: 'flex'}}>
                <Person name={person.name} number={person.number} />
                <button onClick={() => deleteContact(person.id)}style={{marginLeft: '1rem'}}>Delete</button>
                </div>
                )}
            </>
        );

}

export default Contacts;