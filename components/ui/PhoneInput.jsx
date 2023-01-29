import React from 'react'
import InputMask from 'react-input-mask'
import styles from '../../styles/Input.module.scss'

const PhoneInput = ({type, placeholder, onChange, name, ref, minLength, pattern, value}) => {
    return (
        <InputMask mask="+79999999999" value={value} onChange={onChange}>
            {(inputProps) => <input 
                {...inputProps}
                name={name}
                className={styles.input} 
                type={type} 
                placeholder={placeholder}
                onChange={onChange}
                ref={ref}
                minLength={minLength}
                pattern={pattern}/>}
        </InputMask>
        
    )
}

export default PhoneInput

// import React from 'react'
// // import InputMask from 'react-input-mask'
// import styles from '../../styles/Input.module.scss'
// import { useRef } from 'react';
// import { IMaskInput } from 'react-imask';

// const PhoneInput = ({onChange, value, name, placeholder}) => {
//     const ref = useRef(null);
//     const inputRef = useRef(null)
//     return (
//         // <InputMask mask="+79999999999" value={value} onChange={onChange}>
//         //     {(inputProps) => <input 
//         //         {...inputProps}
//         //         name={name}
//         //         className={styles.input} 
//         //         type={type} 
//         //         placeholder={placeholder}
//         //         onChange={onChange}
//         //         ref={ref}
//         //         minLength={minLength}
//         //         pattern={pattern}/>}
//         // </InputMask>
//         <IMaskInput
//             mask='+{7}(000)000-00-00'
//             ref={ref}
//             inputRef={inputRef}  // access to nested input
//             className={styles.input}
//             placeholder={placeholder}
//             onAccept={onChange}
//             value={value}
//             name={name}
//             // DO NOT USE onChange TO HANDLE CHANGES!
//             // USE onAccept INSTEAD
//             unmask={true} // true|false|'typed'
//             // ...and more mask props in a guide
//             // input props also available
//         />
        
//     )
// }

// export default PhoneInput