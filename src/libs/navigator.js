import { useNavigate } from "react-router";

const navigate = useNavigate()

export const navigator = () => {
    if(!localStorage.getItem('token')){
        navigate('/')
    }
}