import React, { useEffect, useState } from 'react'
import instance from '../CommonUrl/URL'

const Empty = () => {
    const [post, setPost] = useState([])
const allData = async() =>{
    const {data} = await instance.get('post/all')
    setPost(data.post)
}
    useEffect(() =>{
        allData()
    },[])
  return (
    <div className="row justify-content-center">
    {post.length > 0 && post.map((el, index) => (
      <div key={index} className='bg-white border-bottom col-4 col-center m-5 text-center rounded overflow-hidden'>
        <div className=" p-4 ">
    <img className='m-2' src={`https://gathwal-memories-2.onrender.com/upload/${el.owner.image}`} alt='User Profile Pic' style={{borderRadius:"50%", height:"45px", width:'45px'}}/>

          <h3 className='word-wrap'>{el.title}</h3>
          <p className='text-truncate ms-2'>{el.description}</p>
          <div className="d-flex">
           
            <span title='name' className='me-2 ms-2'>
              <b>{el.owner.fullName}</b></span>
            <span title='email' className='me-2 ms-2'>
            <b>
            {el.owner.email}

            </b>
            </span>
            <span title='phone'  className='me-2 ms-2'>
            <b>

            {el.owner.phone}
            </b>
            </span>
          </div>
        </div>
      </div>
    ))}
    </div>
  )
}

export default Empty
