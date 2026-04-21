
const PersonForm = ({name, number, addNumber, addPerson, addContact}) => {

        return (
        <form>
            <h2>Add a new</h2>
            <div>
            name: <input value={name} onChange={addPerson} />
            </div>
            <div>
            number: <input value={number} onChange={addNumber} />
            </div>
            <div>
            <button type="submit" onClick={addContact}>add</button>
            </div>
        </form>
        );

}

export default PersonForm;