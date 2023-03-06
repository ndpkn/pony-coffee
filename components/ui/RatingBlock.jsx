import { Rating } from '@mui/material'


const  RatingBlock = ({grade}) => {
    return(
        <p style={{fontSize:'1.1rem', color: '#0082FF'}}>
            Оценка: 
                <Rating
                    name="read-only"
                    style={{fontSize: '1rem', marginLeft: '1rem'}}
                    value={Number(grade)}
                    readOnly
                />
        </p>
    )
}

export default RatingBlock