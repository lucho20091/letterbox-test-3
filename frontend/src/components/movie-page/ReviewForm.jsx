import { IoSendSharp } from 'react-icons/io5';
export default function ReviewForm({ userAuthenticated, formData, handleChange, handleSubmit }) {
    return (
        <div className="mt-4 md:mt-8 max-w-screen-lg mx-auto">
            <form className="bg-gradient-to-r from-indigo-950 to-violet-950 p-4 rounded-xl shadow-lg border border-indigo-800/50 backdrop-blur-lg" onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 w-full">
                    {userAuthenticated && <img src={userAuthenticated.image} alt={`${userAuthenticated.username} profile picture`} className="hidden md:block w-10 h-10 rounded-full border-4 border-purple-400" />}
                    <input 
                    type="text" 
                    placeholder="Write a comment..." 
                    className="flex-1 min-w-36 p-2 bg-indigo-800 rounded-lg text-white placeholder-indigo-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:cursor-not-allowed" 
                    value={formData.comment}
                    onChange={handleChange}
                    disabled={!userAuthenticated}
                    name="comment"
                    />
                    <select 
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="py-2 text-white bg-indigo-800 rounded-lg"
                    >
                        <option value="10">5.0</option>
                        <option value="9">4.5</option>
                        <option value="8">4.0</option>
                        <option value="7">3.5</option>
                        <option value="6">3.0</option>
                        <option value="5">2.5</option>
                        <option value="4">2.0</option>
                        <option value="3">1.5</option>
                        <option value="2">1.0</option>
                        <option value="1">0.5</option>
                    </select>
                    <button className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg hover:from-indigo-500 hover:to-violet-500">
                        <IoSendSharp/>
                    </button>
                </div>
            </form>
        </div>
    )   
}
