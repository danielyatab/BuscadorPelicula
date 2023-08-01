import { useState } from "react"

export const SearchMovie = () => {

  const url = 'https://api.themoviedb.org/3/search/movie';
  const API_KEY = '3f5e79b3f256f2da5a5cbad0be649b89';

  const [movie, setMovie] = useState('');
  const [movies, setMovies] = useState([]);

  const getFetch = async () => {
    try {
      const response = await fetch(`${url}?query=${movie}&api_key=${API_KEY}`)
      const data = await response.json();
      if (!response.ok || data.results.length === 0) throw { status: response.status, statusText: response.statusText };
      setMovies(data.results)
    } catch (error) {
      let message = error.statusText || ", Ocurrio un error";
      alert('La pelicula no existe ', message)
    }
  }
  const onInputChange = (e) => {
    setMovie(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (movie.length > 0) getFetch();
  }

  return (
    <>
      <h1 className="font-semibold text-3xl pt-4">Search Movies</h1>
      <div className="container mx-auto flex justify-center p-8">
        <form onSubmit={onSubmit} className="flex justify-between">
          <input
            type="text"
            className="px-2 py-1 rounded-md text-black"
            value={movie}
            onChange={onInputChange}
          />
          <button className="mx-2 bg-blue-600 px-2 py-1 rounded-md hover:bg-blue-500 transition-all duration-700 ease" type="submit">Search</button>
        </form>
      </div>
      <div className="grid grid-flow-row gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((el) => 
          <div key={el.id} className="background-card p-4 rounded-md border border-white flex justify-between items-center flex-col">
            <img className="bg-red-900 p-1 rounded-md" src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} alt={el.tile}/>
            <p className="font-semibold text-lg px-2 py-1 mt-2 rounded-md">{el.title}</p>
            <p className="font-semibold text-lg flex rounded-md">{el.vote_average}🔆</p>
          </div>
        )}
      </div>
    </>
  )
}
