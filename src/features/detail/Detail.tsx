import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import styles from './Counter.module.css';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useNavigate, useParams } from 'react-router-dom';
import { searchMovieDetail, selectIdMovie, selectIsDetailActive, selectMoviesDetail, selectStatusDetail, toogleDetailActive } from '../detail/detailSlice';
import { Box, Grid } from '@mui/material';

// import Paper from '@mui/material/P aper';
// import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';


export function Detail() {

  const isDetailActive = useAppSelector(selectIsDetailActive);
  const detailMoovie  = useAppSelector(selectMoviesDetail);
  const idMovie = useAppSelector(selectIdMovie);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  let { movie, searchUrl, moovieId } = useParams();
  const [status, setStatus] = useState(true);
  const statusDetail = useAppSelector(selectStatusDetail)


  useEffect(() => {

      if (moovieId !== undefined && status)
      {
        dispatch(searchMovieDetail(moovieId))
        setStatus(false)
        dispatch(toogleDetailActive(true))
      }
    });


  function handleDetail() {
    dispatch(toogleDetailActive(false))
    navigate(`/home/${searchUrl}`)
  }

  console.log(detailMoovie)

  return (
    <div>
      {statusDetail === "success" && 
      <Grid sx={{marginTop:"10px"}} container spacing={2} alignItems="flex-start" justifyContent="center">
        <Grid item xs={11}>
          {isDetailActive && 
            <Box sx={{cursor:"pointer"}} onClick={() => handleDetail()}>Back to home </Box>
          }
        </Grid>
        <Grid item xs={11}>
          <Grid sx={{marginTop:"10px"}} container spacing={2} alignItems="flex-start" justifyContent="flex-start">
            <Grid item xs={4}>
              <img width="300" height="450" src={"https://www.themoviedb.org/t/p/w300_and_h450_face/" + detailMoovie.poster_path}></img>
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={2} alignItems="flex-start" justifyContent="flex-start">
                <Grid item xs={12}>
                  {detailMoovie.title}
                </Grid>
                <Grid item xs={12}>
                  {detailMoovie.overview}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid sx={{textAlign:"center"}} container spacing={2} alignItems="flex-start" justifyContent="flex-start">
                <Grid item xs={12} >
                  {detailMoovie.vote_average} / 10 ({detailMoovie.vote_count} vote)
                </Grid>
                <Grid item xs={12}>
                  
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    }
  </div>
  );
}
