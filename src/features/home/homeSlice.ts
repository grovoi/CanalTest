import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import configData from "../../app/config.json";

export interface HomeState {
  movies: any;
  search: any;
  status: 'idle' | 'loading' | 'failed' | 'success';
}

const initialState: HomeState = {
  movies: [],
  search:[],
  status: 'idle',
};

export const importMovie = createAsyncThunk(
  'home/Movie',
  async () => {
    const response = await fetch(configData.API_URL + 'discover/tv?api_key=' + configData.API_KEY + '&language=enUS&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false');
    // The value we return becomes the `fulfilled` action payload
    const json = await response.json();
    const movies = json;
    return movies;
  }
);


export const searchMovie = createAsyncThunk(
  'home/searchMovie',
  async (keyword:string) => {
    const response = await fetch(configData.API_URL + 'search/movie?api_key=' + configData.API_KEY + '&language=enUS&include_adult=true&page=1&query=' + keyword);
    // The value we return becomes the `fulfilled` action payload
    const json = await response.json();
    const movies = json;
    return movies;
  }
);


export const homeSlice = createSlice({
  name: 'home',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(importMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(importMovie.fulfilled, (state, action) => {
        state.status = 'success';
        state.movies = Object.assign(action.payload);
      })
      .addCase(searchMovie.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(searchMovie.fulfilled, (state, action) => {
        // state.status = 'success';
        state.search = Object.assign(action.payload);
      })
      
  },
});

export const {} = homeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMovies = (state: RootState) => state.home.movies;
export const selectSearch = (state: RootState) => state.home.search;
export const selectStatus = (state: RootState) => state.home.status;

export default homeSlice.reducer;
