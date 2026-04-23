
const Filter = ({filter, onChange}) => {
        return (
            <p>find countries<input value={filter} onChange={onChange}/></p>
        );

}

export default Filter;