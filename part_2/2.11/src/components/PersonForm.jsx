
const PersonForm = ({name, number, addNumber, addPerson, addContact}) => {

        return (
        <form>
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