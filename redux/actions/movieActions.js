// actions/movieActions.js

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const fetchMoviesRequest = (apiUrl) => async (dispatch) => {
    dispatch({ type: FETCH_MOVIES_REQUEST });

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        dispatch({ type: FETCH_MOVIES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_MOVIES_FAILURE, payload: error.message });
    }
};
