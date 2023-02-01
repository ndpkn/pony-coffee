import Image from "next/image"
import pony from "../../images/ponyIcon.png"
import styles from '../../styles/Feedback.module.scss'
import { Controller, useForm } from "react-hook-form";
import MainButtonType from "../../components/ui/MainButtonType";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import axios from "axios";
import MainButtonLink from "../../components/ui/MainButtonLink";
import PonyService from "../../services/PonyServices";

const FeedbackView = () => {

    const [coffeePots, setCoffeePots] = useState([])    
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const options = [...coffeePots]
    const { register, handleSubmit, control, reset } = useForm();

    const ponyService = new PonyService()

    useEffect(() => {
        ponyService.getCoffeePot()
                        .then(onCoffeePotsLoaded)
                        .catch(onError)
        },[])
    
    //данные загружены успешно
    const onCoffeePotsLoaded = (coffeePotList) => {
        setCoffeePots(coffeePotList, coffeePotList.unshift({id: 0, address:'Выберите место для отзыва'}))
        setLoading(false)
    }

    //при загрузке произошла ошибка
    const onError = () => {
        setError(true)
        setLoading(false)
    }
    
    const items =   options.map((item, i) => {
                        return <option key={i} value={item.id}>{item.address}</option>
                    })

    const errorMessage = error ? <option>Ошибка загрузки данных</option> : null
    const spinner = loading ? <option>Загрузка ...</option> : null
    const content = !(loading || error) ? items : null

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
                window.location.href= '/feedback/history'
            })
            .catch(errors => {
                setErrors(errors.response.data.errorss.messages)
            })
            

        reset({
            text: '',
            grade: ''
        })
    }
    return (
        <div className={styles.feedback}>
        <h1 className={styles.header}>Мы всегда на связи <Image src={pony} alt='pony'/></h1>
        <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
            <select className={styles.select} {...register("coffee_pot_id")}>
                {errorMessage}
                {spinner}
                {content}
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
            <Error errors={errors}/>
            <MainButtonType buttonName='Отправить' action='confirm' type='submit'/>
            <MainButtonLink buttonName='все обращения' action='confirm' href='/feedback/history'/>
        </form>
    </div>
    )
}


const Error = ({errors}) => {
    return (
        <div>
            {errors.map((item, i) => {
                return (<p key={i}
                            style={{
                                color:'red',
                                marginBottom:'1rem'
                            }}>
                                {item}
                        </p>)
            })}
        </div>
    )
}

export default FeedbackView