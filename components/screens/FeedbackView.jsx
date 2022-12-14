import Image from "next/image"
import pony from "../../images/ponyIcon.png"
import styles from '../../styles/Feedback.module.scss'
import { Controller, useForm } from "react-hook-form";
import MainButtonType from "../../components/ui/MainButtonType";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import axios from "axios";
import MainButtonLink from "../../components/ui/MainButtonLink";
const FeedbackView = () => {

    const [coffeePots, setCoffeePots] = useState([])    
    const options = [...coffeePots]
    const { register, handleSubmit, control, reset } = useForm();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/coffeePot/address', {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(({data}) => {
                setCoffeePots(data.data.coffeePots)
            })
    }, [])

    const onSubmit = (data) => {
        console.log('отправлено:', data);

        axios
            .post(
                'http://localhost:8000/api/feedback',
                data,
                { headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log(res.data)
                window.location.href= '/profile/history'
            })
            .catch(error => {console.log(error.data)});

        reset({
            coffeePot: '',
            text: '',
            grade: ''
        })
    }
    return (
        <div className={styles.feedback}>
        <h1 className={styles.header}>Мы всегда на связи <Image src={pony} alt='pony'/></h1>
        <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
            <select className={styles.select} {...register("coffeePot", { required: 'Выберите место' })}>
                {options.map((item, i) => {
                    return <option key={i} value={`${item.id}`}>{`${item.address}`}</option>
                })}
                
            </select>
            <div style={{display:'flex', flexDirection: 'column'}}>
                <textarea 
                    className={styles.textarea}
                    {...register("text", { required: true })}
                    placeholder='Для нас важно ваше мнение'
                    rows='8'
                    >
                </textarea>
                <label style={{marginBottom: '2rem', color:'#0000002B', fontSize:'1.4rem'}} htmlFor="text">Минимум 15 символов</label>
                <Controller
                    control={control}
                    name='grade'
                    defaultValue={0}
                    // {...register("rating", { required: true })}
                    rules={{ required: "Выберите оценку" }}
                    render={({ field: { onChange, value} }) => (
                            <Rating
                                name="simple-controlled"
                                style={{fontSize: '4rem', marginBottom: '1rem'}}
                                value={Number(value)}
                                onChange={onChange}
                            />
                        )}
                />
            </div>
            <MainButtonType buttonName='Отправить' action='confirm' type='submit'/>
            <MainButtonLink buttonName='все обращения' action='confirm' href='/feedback/history'/>
        </form>
    </div>

    )
}

export default FeedbackView