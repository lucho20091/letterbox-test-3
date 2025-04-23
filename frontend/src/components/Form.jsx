import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Form({ type, handleSubmit, loading, formData, handleChange }) {
    
    return (
        <div className="grow grid place-items-center">
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-3 md:p-12 p-6 rounded-lg shadow-2xl w-[90%] max-w-md border-2 border-gray-300">
            <h1 className="text-2xl font-bold text-center">{type === 'login' ? 'Login' : 'Sign Up'}</h1>
            <div className="flex flex-col">
                <label htmlFor="username" className="">Username</label>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    className="rounded-md p-2 bg-sky-100"
                    />
            </div>
            <div className="flex flex-col">
                <label htmlFor="password" className="">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    className="rounded-md p-2 bg-sky-100"
                />
            </div>
            <button 
                type="submit" 
                disabled={loading} 
                className="rounded-md p-2 bg-blue-500 text-white">
                    {type === 'login' ? 'Login' : 'Sign Up'}
            </button>
            <div className="flex justify-center items-center gap-2">
                <p className="text-sm text-gray-500">{type === 'login' ? "Don't have an account?" : 'Already have an account?'}</p>
                <Link to={type === 'login' ? '/signup' : '/login'} className="text-sm text-blue-500">{type === 'login' ? 'Sign up' : 'Login'}</Link>
            </div>
            <ToastContainer />
        </form>
    </div>
    )
}
