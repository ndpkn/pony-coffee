import Image from "next/image"
import Layout from "../../components/Layout"
import pony from "../../images/ponyIcon.png"
import styles from '../../styles/Feedback.module.scss'
import { Controller, useForm } from "react-hook-form";
import MainButtonType from "../../components/ui/MainButtonType";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import axios from "axios";


const Feedback = () => {	

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
        reset({
            place: '',
            review: '',
            rating: ''
        })

    }

    return (
        <Layout title='Обратная связь' descr='Оставьте свое мнение о работе нашей кофейни'>
            <div className={styles.feedback}>
                <h1 className={styles.header}>Мы всегда на связи <Image src={pony} alt='pony'/></h1>
                <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                    <select className={styles.select} {...register("place", { required: 'Выберите место' })}>
                        {options.map((item, i) => {
                            return <option key={i} value={`${item.address}`}>{`${item.address}`}</option>
                        })}
                        
                    </select>
                    <div className="textarea-overlay">
                        <textarea 
                            className={styles.textarea}
                            {...register("review", { required: true })}
                            placeholder='Для нас важно ваше мнение'
                            rows='8'
                            >
                        </textarea>
                        

                        {/* <Controller
                            control={control}
                            name="ReactDatepicker"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                            <ReactDatePicker
                                onChange={onChange}
                                onBlur={onBlur}
                                selected={value}
                            />
                            )}
                        /> */}
                        <Controller
                            control={control}
                            name='rating'
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
                </form>
            </div>
        </Layout>
    )
}

export default Feedback