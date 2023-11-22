import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { createPost } from '../../redux/action';
const CreatePostModel = ({ isopen, setIsOpen }) => {
  const dispatch = useDispatch()
  const [inpots, setInputs] = useState({
    title: "", description: "",
  })
  const handelChange = async (e) => {
    setInputs({ ...inpots, [e.target.name]: e.target.value })
  }
 
  const userData = async () => {
    dispatch(createPost(inpots))
  }

  return (
    <Modal show={isopen} onHide={() => setIsOpen(false)}
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
  )
}

export default CreatePostModel
