import React from 'react'
import PageHeader from '../ui/PageHeader'
import styles from '../../styles/Seending.module.scss'
import MainButtonType from '../ui/MainButtonType'
import MainButtonLink from '../ui/MainButtonLink'
import { Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import PonyService from '../../services/PonyServices'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'

const options = [
    {
        label: 'На почту',
        value: 'email',
        default: false
    },
    {
        label: 'На сайт',
        value: 'site',
        default: false
    },
    {
        label: 'В Telegram',
        value: 'telegram',
        default: false
    },
]

const SeendingView = () => {
    const { register, handleSubmit, control, reset } = useForm({
        email: false,
        telegram: true,
        site: true
    });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const ponyService = new PonyService()
    

    const onSubmit = (data) => {
        ponyService.addNotification(data)
                        .then(onNotificationPosted)
                        .catch(onError)
        console.log('отправлено:', data);
    }

    const onNotificationPosted = (res) => {
        console.log(res);
        setLoading(true)
    }

    //при загрузке произошла ошибка
    const onError = () => {
        setError(true)
        setLoading(false)
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


    const errorMessage = error ? <ErrorMessage/>: null
    const spinner = loading ? <LoadingMessage/> : null
    const content = !(loading || error) ? items : null

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