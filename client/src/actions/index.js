import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS
} from './type';
import streams from '../apis/streams';
import history from '../history';

export const signIn = (userId) => ({type: SIGN_IN, payload: userId});

export const signOut = () => ({type: SIGN_OUT});

export const createStream = (formValues) => async (dispatch, getState) => {
    const response = await streams.post(
        '/streams',
        { ...formValues, userId: getState().auth.userId }
    );
    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/');
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({type: FETCH_STREAM, payload: response.data});
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({type: EDIT_STREAM, payload: response.data});
  history.push('/');
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({type: DELETE_STREAM, payload: id});
  history.push('/');
};

