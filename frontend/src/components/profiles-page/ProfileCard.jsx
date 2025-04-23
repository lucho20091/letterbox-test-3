import { Link } from 'react-router-dom'
export default function ProfileCard({ profile }) {
    return (
        <Link 
        to={`/profile/${profile.username}`} 
        key={profile._id}>
            <div className="bg-gradient-to-r from-indigo-950 to-violet-950 text-white shadow-lg py-4 flex flex-col items-center justify-center rounded-md shadow-xl h-40">
                <img 
                src={profile.image} 
                alt={`${profile.username} profile}`} 
                className="w-16 h-16 rounded-full mb-2"
                />
                <p className="text-sm font-medium">{profile.username}</p>
            </div>
        </Link>
    )
}   
