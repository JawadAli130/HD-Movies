import React,{useEffect,useState} from 'react';
import axios from 'axios';
import CustomPagination from '../../components/customPagination/CustomPagination';
import SingleContent from '../../components/singleContent/SingleContent';
import Geners from '../../components/Geners';
import useGenre from '../../hooks/GenreHook';

const Series = () =>{

    const [page,setPage] = useState(1); 
    const [content,setContent] = useState([]); 
    const [numOfPages,setNumOfPages] = useState(0);
    const [selectedGeners,setSelectedGeners] = useState([]);
    const [normalGeners,setNormalGeners] = useState([]);
    const genreURL = useGenre(selectedGeners);


    const fetchMovies = async () =>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    useEffect(()=>{
        fetchMovies()
        window.scroll(0,0)
        // eslint-disable-next-line
    },[page,genreURL]);

    return(
        <>
            <span className='pageTitle'>Series</span>
            <Geners type='movie' setPage={setPage} selectedGeners={selectedGeners} setSelectedGeners={setSelectedGeners} normalGeners={normalGeners} setNormalGeners={setNormalGeners} />
            <div className='trending' >
                {
                    content?content.map(c=><SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type='tv' vote_average={c.vote_average} />):console.log('nope')
                }
            </div>
            {numOfPages >1 && (<CustomPagination setPage={setPage} numberOfPages={numOfPages} />)}
        </>
    )
}

export default Series;