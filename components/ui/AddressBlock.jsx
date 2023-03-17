const  AddressBlock = ({address}) => {
    return(
        <p style={{
            fontSize:'1.1rem', 
            color: '#0082FF',
            marginRight: '1rem'
            }}>
            Адрес кофейни: 
                    <span style={{
                        color: 'rgba(0, 0, 0, 0.7)', 
                            marginLeft: '1rem',
                            fontWeight:'300'}}>
                        {address}
                    </span>
        </p>
    )
}
export default AddressBlock