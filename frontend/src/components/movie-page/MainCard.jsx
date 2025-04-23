export default function MainCard({ movie, comments}) {


    function numberFormat(number){
        if (Number.isInteger(number)){
          return number;
        } else {
          return number.toFixed(1);
        }
      }
    
    return (
        <div className="p-4 md:p-0 md:h-80 md:overflow-hidden rounded-lg shadow-lg md:shadow-lg md:bg-gradient-to-br from-indigo-950 to-violet-950
         mt-4 md:mt-8 max-w-screen-lg mx-auto">
            <div className="group flex flex-col md:flex-row">
                    <img 
                        src={movie.image} 
                        alt={movie.title} 
                        className="h-96 md:h-full md:w-auto object-cover object-top mx-auto md:mx-0 rounded-xl md:rounded-none" 
                    />
                <div className="rounded-xl md:rounded-none bg-gradient-to-r from-indigo-950 to-violet-950 p-4 mt-4 md:mt-0 md:p-8 flex flex-col items-start md:items-start">
                    <h1 className="text-white text-2xl font-bold mb-2">{movie.titleYear}</h1>
                    <div className="flex items-center mb-2">
                        <p className="text-white font-bold text-2xl mr-2">Mine:</p>
                        <div className="flex items-center">
                            {Array.from({ length: Math.floor(movie.rating/2)}).map((_,index) => (
                                <span 
                                    key={index} 
                                    className="text-yellow-500 text-3xl group-hover:text-yellow-300 group-hover:animate-[star_0.3s_ease-out_forwards]"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    >★</span>
                            ))}
                            <span className="text-white font-bold text-2xl ml-2">{movie.rating/2}/5</span>
                        </div>
                    </div>
                    {comments?.length > 0 && (
                        <div className="flex items-center mb-2">
                            <p className="text-white font-bold text-2xl mr-2">People:</p>
                            <div className="flex items-center">
                               {Array.from({ length: Math.floor(Number(comments.reduce((acc, comment) => acc + Math.floor(comment.rating/2), 0)/comments.length)) }).map((_, index) => (
                                <span 
                                    key={index} 
                                    className="text-yellow-500 text-3xl group-hover:animate-[star_0.3s_ease-out_forwards] group-hover:text-yellow-300"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    >★</span>
                               ))}
                               <span className="text-white font-bold text-2xl ml-2">
                               {numberFormat(Number(comments.reduce((acc, comment) => acc + Math.floor(comment.rating/2), 0)/comments.length))}/5
                               </span>
                            </div>
                        </div>
                    )}
                    <h2 className="hidden md:block text-white text-xl font-bold mb-2">Overview</h2>
                    <p className="text-gray-200 line-clamp-3">{movie.description}</p>
                </div>
            </div>
        </div>
    )
}
