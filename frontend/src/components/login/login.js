import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Login = ({ setLoginUser}) => {

    const history = useHistory()

    const [ user1, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user1,
            [name]: value
        })
    }

    const login = () => {
        axios.post(`${REACT_APP_BASE_URL}/login`, user1)
        .then(res => {
            alert(res.data.message)
            setLoginUser(res.data.user)
            history.push("/")
        })
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user1.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user1.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="buttonlogin" onClick={login}>Login</div>
            <div>or</div>
            <div className="buttonregister" onClick={() => history.push("/register")}>Register</div>
        </div>
    )
}

export default Login