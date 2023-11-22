import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CreatePostModel from './Models/CreatePostModel';
import { getUser, logout } from '../redux/action';


const NavBar = ({user}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isopen,setIsOpen] = useState(false)
 
const userLogout = async() =>{
  dispatch(logout)
  window.localStorage.clear()
 localStorage.removeItem('login')
 navigate('/login')
 window.location.reload(false)
}

  return (
    <>
<div className='container-fluid m-0 p-0'>
<div className='d-flex flex-row bg-primary justify-content-evenly'>
   <div className='d-flex flex-row'>
   <h1 className='text-white '>{user.user.fullName}</h1>
    <img className='m-2' src={`http://localhost:8080/upload/${user.user.image}`} alt='User Profile Pic' style={{borderRadius:"50%", height:"45px", width:'45px'}}/>

   </div>
       <h2 className='text-black mt-1'>Daily Though</h2>
    <h3 className='text-black border bg-white border-dark rounded-pill mt-1' onClick={() => setIsOpen(true)}>+</h3>
    <button className='text-black border-0  p-2' onClick={() => userLogout()}>Logout</button>
 </div>
</div>

<CreatePostModel isopen={isopen} setIsOpen={setIsOpen}/>
</>
  )

}

export default NavBar
