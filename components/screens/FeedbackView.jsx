import Image from "next/image"
import pony from "../../images/ponyIcon.png"
import styles from '../../styles/Feedback.module.scss'
import { Controller, useForm } from "react-hook-form";
import MainButtonType from "../../components/ui/MainButtonType";
import { Rating } from "@mui/material";
import MainButtonLink from "../../components/ui/MainButtonLink";

const FeedbackView = ({options, error, loading, onSubmit, errors}) => {
    const { register, handleSubmit, control } = useForm();
    
    const items =   
        options.map((item, i) => {
            return <option key={i} value={item.id}>{item.address}</option>
        })

    const errorMessage = error ? <option>Ошибка загрузки данных</option> : null
    const spinner = loading ? <option>Загрузка ...</option> : null
    const content = !(loading || error) ? items : null

    return (
        <div className={styles.feedback}>
        <h1 className={styles.header}>Мы всегда на связи <Image src={pony} alt='pony'/></h1>
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <select className={styles.select} {...register("coffee_pot_id")}>
                {errorMessage}
                {spinner}
                {content}
            </select>
            <div style={{display:'flex', flexDirection: 'column'}}>
                
                <textarea 
                    className={styles.feedback_textarea}
                    name="textarea" 
                    rows={5}
                    placeholder='Введите текст рассылки'
                    {...register("text", { required: true })}
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