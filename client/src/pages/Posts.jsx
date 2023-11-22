import React, { useEffect, useState } from 'react'
import { MdEdit, MdDelete, MdViewInAr } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import instance from '../CommonUrl/URL'
import { Form } from 'react-bootstrap'
import { editPost } from '../redux/action';


const Postes = () => {
  const dispatch = useDispatch()

  const [post, setPost] = useState([])


  const [modalShow, setModalShow] = useState(false);
  const [edit,setedit] = useState(false)

  const [value, setValue] = useState();
  const [showModel, setViewModel] = useState(false);
  const [delId, setdelID] = useState(false);
  const [inpots, setInputs] = useState([])
  const handelChange = async (e) => {
    setInputs({ ...inpots, [e.target.name]: e.target.value })
  }
  const allPosts = async () => {
    const { data } = await instance.get(`post/post`);
    setPost(data.post)
  }
  const userData = async () => {
    dispatch(editPost(inpots))
  }
  useEffect(() => {
    allPosts()
  }, [])

  const alertMessage = (id) =>{
    if(id) {
      setModalShow(true)
      setdelID(id)
    }
    else return
  }
  const viewPost = (el) =>{
    if(el) {
      setViewModel(true)
      setValue(el)
    }
    else return
  }
  const editPosts = (el) =>{
    if(el) {
      setedit(true)
      setInputs(el)

    }
    else return
  }

  const deletPost = async(id) =>{
    if(id) {
    const {data} = await instance.delete(`post/post?id=${id}`);
    if(data.status == true){
      setModalShow(false)
      allPosts()
    }
    }
    else return
  }
 
 
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="mg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
           Do you want Delete this <b>{delId.name}</b> Post
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant="primary" onClick={() => deletPost(delId.id)} >
              Delete
            </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function ViewModel( props) {
  
    return (
      <Modal
      fullscreen='xxl-down'
   {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {value._id}
          </Modal.Title>
         

        </Modal.Header>
        
       <h1 className='text-center p-3'> {value.title}</h1>
        <Modal.Body>
          <p className='text-center p-3'>
          {value.description}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <div className="row justify-content-center">
        {post.length > 0 && post.map((el, index) => (
          <div key={index} className='bg-white border-bottom col-4 col-center m-5 text-center rounded overflow-hidden'>
            <div className=" p-4 ">
              <h3 className='word-wrap'>{el.title}</h3>
              <p className='text-truncate ms-2'>{el.description}</p>
              <div className="d-flex">
                <span className='flex-fill modal-header'>
                  {el.createdAt.slice(0, 10)}
                </span>
                <span title='View' className='me-2 ms-2' onClick={() => viewPost(el)}>
                  <MdViewInAr /></span>
                <span title='Edit' className='me-2 ms-2' onClick={() => editPosts(el)}>
                  <MdEdit />
                </span>
                <span title='Delete' onClick={() => alertMessage({id:el._id, name : el.title})} className='me-2 ms-2'>
                  <MdDelete />
                </span>
              </div>
            </div>
          </div>
        ))}
        {modalShow && 
          <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />}
        {showModel && 
          <ViewModel
          show={showModel}
          onHide={() => setViewModel(false)}
        />}

{edit &&
  <Modal show={edit} onHide={() => setedit(false)}
      className="mt-5 pt-5">
      <Modal.Header closeButton>
        <Modal.Title>Add a Post</Modal.Title>
      </Modal.Header>
      <form onSubmit={userData}>
        <Modal.Body>
          <Form.Control
            className='border-end-0 border-start-0 border-top-0 form-control ml-5 mt-4 p-3'
            type="text"
            placeholder='title'
            name='title'
            value={inpots.title}
            onChange={handelChange}
            required
          />
          <Form.Control
            className='border-end-0 border-start-0 border-top-0 form-control ml-5 mt-4 p-3'
            type="textarea"
            rows="4" 
            cols="50"
            placeholder='description'
            name='description'
            value={inpots.description}
            onChange={handelChange}
            required
          />

        </Modal.Body>
        <Modal.Footer>
          <Form.Control className="bg-primary form-control hover-zoom p-3 rounded-2 text-center text-white" type='submit' value="Save Post" />
        </Modal.Footer>
      </form>



     </Modal>
}


      </div>
    </>
  )
}

export default Postes
