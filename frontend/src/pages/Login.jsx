import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
;
import Form from '../components/Form';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    fetch('https://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(response => {
      if (response.status === 400) {
        throw new Error('Username or password are incorrect');
      }
      return response.json();
    })
    .then(() => {
      setLoading(false);
      navigate('/');
      window.location.reload();
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
      toast.error(error.message);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  return (
    <Form 
        type="login" 
        handleSubmit={handleSubmit} 
        loading={loading} 
        formData={formData}
        handleChange={handleChange}
    />
  );
}
export default Login;

