import AdminHeader from './AdminHeader'
import GuestHeader from './GuestHeader'
import BaristaHeader from './BaristaHeader'
import UserHeader from './UserHeader'
import { useState } from 'react'

function GetHeader({role}) {    
    console.log(state);
    const headerChange = () => {
        switch (role) {
        case "admin": return <AdminHeader/>
        case "guest": return <GuestHeader/>
        case "barista": return <BaristaHeader/>
        case "user": return <UserHeader/>
        default: return <GuestHeader/>
        }
    }
    return (
        <>
            {headerChange()}
        </>
    )
}
export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/userRole')
    const role = await res.json()
    return {
        props: {
            role,
        }, // will be passed to the page component as props
    }
}

export default GetHeader
