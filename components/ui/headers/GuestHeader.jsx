import Link from 'next/link'
import React from 'react'

const GuestHeader = () => {
    return (
        <header>
            <h2>Меню для гостя</h2>
            <Link href="/">Главная</Link>
            <br />
            <Link href="/addUser">Добавить пользователя</Link>
            <br />
            <Link href="/auth">Войти</Link>
            <br />
            <Link href="/register">Зарегистрироваться</Link>
        </header>
    )
}

export default GuestHeader