import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectMovies,
  selectStatus,
  selectSearch,
  importMovie,
  searchMovie
} from './homeSlice';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useNavigate, useParams } from 'react-router-dom';
import {selectIsDetailActive, setIdMovie, toogleDetailActive } from '../detail/detailSlice';
import { Box, Grid } from '@mui/material';


export function Home() {
  const movies = useAppSelector(selectMovies);
  const status = useAppSelector(selectStatus);
  const search = useAppSelector(selectSearch);
  const isDetailActive = useAppSelector(selectIsDetailActive);
  const dispatch = useAppDispatch();
  const [inputSearch, setInputSearch] = useState(''); 
  let navigate = useNavigate();
  let { searchUrl } = useParams();


  useEffect(() => {
        if (status === 'idle')
        {
          dispatch(importMovie())
        }

        if (searchUrl != undefined)
        {
          dispatch(searchMovie(searchUrl))
          setInputSearch(searchUrl)
        }
    }, [status]);

  function dynamicSearch(value:string) {
    setInputSearch(value)
    dispatch(searchMovie(value))
    navigate(`/home/${value}`)
  }

  function handleDetail(moovieId : string, title:string) {
    dispatch(toogleDetailActive(true))
    dispatch(setIdMovie(moovieId))
    navigate(`/detail/${inputSearch}/${title}/${moovieId}`)

  }

  return (
    <Grid sx={{marginTop:"20px"}} container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={6}>
        <FormControl onChange={(e:any) => dynamicSearch(e.target.value)} fullWidth>
            <OutlinedInput value={inputSearch} placeholder="  Rechercher un film, une serie" fullWidth />
        </FormControl>
      </Grid>

      <Grid item xs={11}>



        
      {search?.results?.length !== 0 && search?.results?.length !== undefined && !isDetailActive && 
        <Grid container spacing={2} alignItems="flex-start" justifyContent="flex-start">
         {search?.results?.map((el:any) => {
           return (
           
           <Grid item xs={2}>
            <Box onClick={() => handleDetail(el.id, el.original_title)} sx={{cursor:"pointer"}}>
              <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Grid item xs={11}>
                  <img width="150" height="225" src={"https://www.themoviedb.org/t/p/w220_and_h330_face/" + el.poster_path}></img>
                </Grid>
                <Grid item xs={11}>
                  {el.original_title}
                </Grid>
              </Grid>
            </Box>
           
           </Grid>)
         })
         }
         </Grid>
      }
      </Grid>
    </Grid>
  );
}
