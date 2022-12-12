import Head from 'next/head'
import { title } from 'process'
import React from 'react'

const Meta = ({title, description }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta 
                name='description'
                content={description}
            />
        </Head>
    )
}

export default Meta