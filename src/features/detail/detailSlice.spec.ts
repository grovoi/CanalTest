import detailReducer, {
  DetailState,

} from './detailSlice';

describe('counter reducer', () => {
  const initialState: DetailState = {
    moviesDetail: [],
    isDetailActive:false,
    status: 'idle',
    idMovie:""
  };
  it('should handle initial state', () => {
    expect(detailReducer(undefined, { type: 'unknown' })).toEqual({
      moviesDetail: [],
      isDetailActive: false,
      status: 'idle',
      idMovie: ""
    });
  });
});
