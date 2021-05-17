import { Chip } from '@material-ui/core';
import axios from 'axios';
import { useEffect } from 'react';

const Geners = ({selectedGeners,setSelectedGeners,normalGeners,setNormalGeners,setPage,type}) =>{

    const fetchGeners = async () =>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setNormalGeners(data.genres)
    }

    useEffect(()=>{
        fetchGeners()
        return ()=>{setNormalGeners([])}
        // eslint-disable-next-line
    },[]);

    

    const handleAdd = (genre) =>{
        setSelectedGeners([...selectedGeners,genre])
        setNormalGeners(normalGeners.filter((g)=>g.id !== genre.id))
        setPage(1)
    }
    const handleRemove = (genre) =>{
        setSelectedGeners(selectedGeners.filter((g)=>g.id!==genre.id))
        setNormalGeners([...normalGeners,genre])
        setPage(1)
    }

    return(
        <>
            <span className='Geners' style={{padding:'6px 0'}}>
                {
                    normalGeners.map((gen)=><Chip label={gen.name} style={{margin:2}} size='small' key={gen.id} clickable onClick={()=>handleAdd(gen)} />)
                }            
                {
                    selectedGeners.map((gen)=><Chip label={gen.name} style={{margin:2}} size='small' color='primary' key={gen.id} clickable onDelete={()=>handleRemove(gen)} />)
                }            
            </span>
        </>
    )
}

export default Geners;