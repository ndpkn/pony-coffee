import React from 'react'
import PageHeader from '../ui/PageHeader'
import styles from '../../styles/Seending.module.scss'
import MainButtonType from '../ui/MainButtonType'
import MainButtonLink from '../ui/MainButtonLink'
import { Checkbox, FormControlLabel } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import PonyService from '../../services/PonyServices'
import ErrorMessage from '../ui/ErrorMessage'
import LoadedMessage from '../ui/LoadedMessage'

const options = [
    // {
    //     label: 'На почту',
    //     value: 'email',
    //     default: false
    // },
    // {
    //     label: 'На сайт',
    //     value: 'site',
    //     default: false
    // },
    {
        label: 'В Telegram',
        value: 'telegram',
        default: false
    },
]

const SeendingView = () => {
    const { register, handleSubmit, control, reset } = useForm();
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [textError, setTextError] = useState([])


    const ponyService = new PonyService()
    

    const onSubmit = (data) => {
        ponyService.addNotification(data)
                        .then(onNotificationPosted)
                        .catch(onError)
    }

    //успешно отправлено
    const onNotificationPosted = () => {
        setLoaded(true)
        reset({
            text: '',
            email: false,
            telegram: false,
            site: false
        })
    }

    //при загрузке произошла ошибка
    const onError = (err) => {
        const errorMessage = err.response.data.errors.messages
        setTextError(errorMessage)
        setError(true)
        setLoaded(false)
    }

    const checkboxesListRender = options.map((singleOption, i) => {
        return <FormControlLabel
                    key={i}
                    control={<Controller
                        defaultValue={singleOption.default}
                        name={singleOption.value}
                        control={control}
                        render={({ field }) => <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }} {...field} />}
                    />}
                    label={singleOption.label}
                    />
    })
    const items = 
        <form 
            className={styles.seending_form}
            method='post'
            onSubmit={handleSubmit(onSubmit)}>   
            <textarea 
                className={styles.seending_textarea}
                name="textarea" 
                rows={5}
                placeholder='Введите текст рассылки'
                {...register("text", { required: true })}
                >
            </textarea>

            {checkboxesListRender}
            
            <MainButtonType buttonName='Отправить' action='confirm' type='submit'/>
        </form>


    const errorMessage = error ? <ErrorMessage textError={textError}/>: null
    const spinner = loaded ? <LoadedMessage/> : null
    const content = items

    return (
        <div className={styles.seending}>
            <PageHeader text='Рассылка'/>
                {errorMessage}
                {spinner}
                {content}
            <MainButtonLink buttonName='История рассылки' action='primary' href='/seending/history'/>
        </div>
    )
}

export default SeendingView