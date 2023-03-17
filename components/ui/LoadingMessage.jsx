import Image from "next/image"
import pony from '../../images/ponyanim.gif'

const LoadingMessage = () => {
    return (
        <div 
            style={{
                width:'100%',
                display:'flex',
                justifyContent:'center',
                padding:'2rem'
        }}>
            <Image src={pony} alt='pony' width={50}/>
        </div>
    )
    }

export default LoadingMessage