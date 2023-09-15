export const Filter = ({filterContacts}) => {
    const handleChange = ({ target: {value} }) => {
        filterContacts(value);
    };
    
    return ( 
        <>
        <h4>Find contacts by name</h4>
        <input
            type="text"
            name="filter"
            onChange={handleChange}
        />
        </>
    );
}