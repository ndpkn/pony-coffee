import React from 'react'
import PageHeader from '../ui/PageHeader'
import styles from '../../styles/Seending.module.scss'
import MainButtonType from '../ui/MainButtonType'
import MainButtonLink from '../ui/MainButtonLink'
import { Checkbox, FormControlLabel } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import ErrorMessage from '../ui/ErrorMessage'
import LoadedMessage from '../ui/LoadedMessage'

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

const SeendingView = ({onSubmit, error, loaded, errors}) => {
    const { register, handleSubmit, control, reset } = useForm();

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


    const spinner = loaded ? <LoadedMessage/> : null
    const content = items

    return (
        <div className={styles.seending}>
            <PageHeader text='Рассылка'/>
                <ErrorMessage textError={errors}/>

                {spinner}
                {content}

            <MainButtonLink buttonName='История рассылки' action='primary' href='/sending/history'/>
        </div>
    )
}

export default SeendingView