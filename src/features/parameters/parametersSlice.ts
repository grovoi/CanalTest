import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface ParamertersState {
  currentLanguage: string;
  availableLanguage: string[];
  currentServer: string;
  availableServer: string[];
  statusLanguage: 'idle' | 'loading' | 'failed' | 'success';
  statusServer: 'idle' | 'loading' | 'failed' | 'success';
}

const initialState: ParamertersState = {
  currentLanguage: "enUS",
  availableLanguage: [],
  currentServer: 'America/New_York',
  availableServer: [],
  statusLanguage: 'idle',
  statusServer: 'idle',
};

//Retourne la liste des langue supporter par TMDB en tableau de string (ex : ["enUs", "frFR", "deDE" ...])
export const importLanguage = createAsyncThunk(
  'parameters/importLanguage',
  async () => {
    const response = await fetch('https://api.themoviedb.org/3/configuration/languages?api_key=92b418e837b833be308bbfb1fb2aca1e');
    const json = await response.json();
    const language = json;
    return language;
  }
);

//Retourne la liste des timezone supporter par TMDB en tableau de string (ex : ["America/New_York", "Europe/Paris"...])
export const importServer = createAsyncThunk(
  'counter/importServer',
  async () => {
    const response = await fetch('https://api.themoviedb.org/3/configuration/timezones?api_key=92b418e837b833be308bbfb1fb2aca1e');
    const json = await response.json();
    const server = json;
    return server;
  }
);



export const parametersSlice = createSlice({
  name: 'parameters',
  initialState,
  reducers: {
    setCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload
    },
    setCurrentServer:(state, action: PayloadAction<string>) => {
      state.currentServer = action.payload
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(importLanguage.pending, (state) => {
        state.statusLanguage = 'loading';
      })
      .addCase(importLanguage.fulfilled, (state, action) => {
        state.statusLanguage = 'success';
        state.availableLanguage = Object.assign(action.payload);
      })
      .addCase(importServer.pending, (state) => {
        state.statusServer = 'loading';
      })
      .addCase(importServer.fulfilled, (state, action) => {
        state.statusServer = 'success';
        state.availableServer = Object.assign(action.payload);
      })
      
  },
});


export const {setCurrentLanguage, setCurrentServer} = parametersSlice.actions;


export const selectLanguage = (state: RootState) => state.parameters.currentLanguage;
export const selectServer = (state: RootState) => state.parameters.currentServer;
export const selectAvailableLanguage = (state: RootState) => state.parameters.availableLanguage;
export const selectAvailableServer = (state: RootState) => state.parameters.availableServer;
export const selectStatusLanguage = (state: RootState) => state.parameters.statusLanguage;
export const selectStatusServer = (state: RootState) => state.parameters.statusServer;


export default parametersSlice.reducer;

