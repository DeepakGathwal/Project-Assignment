import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser, login } from '../../redux/action'

const Login = () => {
    const [inpots, setInputs] = useState({
     email: "",  password: ""
    })
    const already = window.localStorage.getItem('Login')

  useEffect(() =>{
 if(already == "false"){
 console.log("dsdb");
    navigate('/')}

  },[already])
    
    
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const message = useSelector((state) => state.login)
   
    const handelChange = async (e) => {
        setInputs({ ...inpots, [e.target.name]: e.target.value })
    }
    // Login Function
    const userLogin = async (e) => {
        e.preventDefault()
        
        dispatch(login(inpots))
    }
   
    // If Login or Regsitation Success then it will navigate on nextPage
    if (message.loading == false && message.login.success == true) {
     
        dispatch(getUser);
        navigate('/')
       return window.localStorage.setItem("Login",message.loading)
    }

const relocate =() => {
    navigate('/register')
}
    return (
        <div className='container-fluid bg-primary p-3'>
        <div className='d-flex justify-content-center flex-row bg-white m-5 p-5 rounded'>
            <h1 className='text-black text-center p-5'>Login</h1>
            <form onSubmit={userLogin}>
                <input
                    className='form-control border border-warning  mt-4 p-2'
                    type="email"
                    placeholder='Enter Your Email'
                    name='email'
                  
                    aria-describedby="emailHelp"
                    value={inpots.email}
                    onChange={handelChange} />
                <input
                    className='form-control border border-warning mt-4 p-2 '
                    type="password"
                    aria-describedby="passwordHelpBlock"
                    placeholder='Enter Your Password'
            
                    name='password'
                    value={inpots.password}
                    onChange={handelChange}
                />
                <input className=" blockquote m-5 p-3 rounded-pill toast-header text-white bg-primary ms-auto hover-zoom" type='submit' value="Login" />

            </form>
        </div>
        <button className='pe-auto text-black border-0 rounded-pill bg-white text-center p-2' onClick={() => relocate()} >Create Profile</button>
        </div>
    )
}

export default Login
