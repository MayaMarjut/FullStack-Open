
const Filter = ({filter, addFilter}) => {
        return (
            <div>filter shown with<input value={filter} onChange={addFilter}/></div>
        );

}

export default Filter;