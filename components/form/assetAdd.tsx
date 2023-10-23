import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  ModalFooter,
} from 'react-bootstrap';
import { ReactDOM } from 'react-dom';

export default function AssetAdd({
  show,
  onHide,
  onClose,
  children,
  title,
  cage,
  baseApi,
}) {
  const [isBrowser, setBrowser] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    model: '',
    serial: '',
  });

  useEffect(() => {
    setBrowser(true);
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cageID = cage['_id'];
    const apiData = { ...formData, cage: cageID };
    const apiPath = new URL('/asset', baseApi).toString();
    axios.post(apiPath, apiData).then((res) => {
      location.reload();
    });
  };
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>New Asset</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup className='mb-3'>
              <FormLabel>Product Name</FormLabel>
              <FormControl
                id='name'
                name='name'
                type='text'
                placeholder='Blackmagic Design URSA Mini Pro 12K'
                value={formData.name}
                onChange={handleChange}
              ></FormControl>
            </FormGroup>
            <FormGroup className='mb-3'>
              <FormLabel>Model Number / MFR</FormLabel>
              <FormControl
                id='model'
                name='model'
                type='text'
                placeholder='CINEURSAMUPRO12K'
                value={formData.model}
                onChange={handleChange}
              ></FormControl>
            </FormGroup>
            <FormGroup className='mb-3'>
              <FormLabel>Serial Number</FormLabel>
              <FormControl
                id='serial'
                name='serial'
                type='text'
                placeholder='5423202'
                value={formData.serial}
                onChange={handleChange}
              ></FormControl>
            </FormGroup>
          </Modal.Body>
          <ModalFooter>
            <Button //
              variant='secondary'
              onClick={onClose}
            >
              Close
            </Button>
            <Button type='submit' variant='primary'>
              Create
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
