import { Button } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/router'

const GoBackButton = () => {
    const router = useRouter()
    return (
        <div>
            <Button
                color='primary'
                size='large'
                onClick={() => {
                    router.back()
                }}
                >
                <ArrowBackIosIcon/>
                назад
            </Button>
        </div>
    )
}

export default GoBackButton