import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import configData from "../../app/config.json";

export interface DetailState {
  moviesDetail: any;
  isDetailActive: boolean;
  status: 'idle' | 'loading' | 'failed' | 'success';
  idMovie:string
}

const initialState: DetailState = {
  moviesDetail: [],
  isDetailActive: false,
  status: 'idle',
  idMovie:""
};

export const searchMovieDetail = createAsyncThunk(
  'detail/searchMovieDetail',
  async (idMoovie:string) => {
    const response = await fetch(configData.API_URL + '/movie/' + idMoovie + '?api_key=' + configData.API_KEY + '&language=enUS');
    const json = await response.json();
    const moviesDetail = json;
    return moviesDetail;
  }
);


export const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    toogleDetailActive: (state, action: PayloadAction<boolean>) => {
        state.isDetailActive = action.payload;
      },
    setIdMovie:(state, action: PayloadAction<string>) =>{
      state.idMovie = action.payload
    }
      
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovieDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMovieDetail.fulfilled, (state, action) => {
        state.status = 'success';
        state.moviesDetail = action.payload;
      })
  },
});

export const {toogleDetailActive, setIdMovie} = detailSlice.actions;

export const selectMoviesDetail = (state: RootState) => state.detail.moviesDetail;
export const selectIsDetailActive = (state: RootState) => state.detail.isDetailActive;
export const selectStatusDetail = (state: RootState) => state.detail.status;
export const selectIdMovie = (state: RootState) => state.detail.idMovie;




export default detailSlice.reducer;
