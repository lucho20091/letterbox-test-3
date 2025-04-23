import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
;
import Form from '../components/Form';

function SignUp() {
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
    
    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json', 
      },
      credentials: 'include'
    })
    .then(response => {
      if (response.status === 400) {
        throw new Error('Username already exists');
      }
      if (response.status === 429) {
        throw new Error('Too many requests, please try again after 2 days');
      }
      return response.json();
    })
    .then(() => {
      setLoading(false);
      navigate('/login');
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
        type="signup" 
        handleSubmit={handleSubmit} 
        loading={loading} 
        formData={formData}
        handleChange={handleChange}
    />
  );
}

export default SignUp;
