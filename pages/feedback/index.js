import { useEffect } from "react";
import Layout from "../../components/Layout"
import FeedbackView from "../../components/screens/FeedbackView"


const Feedback = () => {	

    return (
        <Layout title='Обратная связь' descr='Оставьте свое мнение о работе нашей кофейни'>
            <FeedbackView/>
        </Layout>
    )
}

export default Feedback