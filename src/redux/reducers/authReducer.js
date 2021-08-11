import { createSlice } from "@reduxjs/toolkit";
import {
  signIn as authSignIn,
  signUp as authSignUp,
  //   userInfo as authUserInfo,
  resetPassword as authResetPassword,
} from "../../services/authService";
import { setMessage } from "./messageReducer";

const initialState = {
  user: undefined,
  loading: false,
};

export const slice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { setUser, setLoading } = slice.actions;

export const signIn = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await authSignIn(credentials);
    dispatch(
      setUser({
        id: response.id,
        email: response.email,
        name: response.name,
      })
    );
  } catch (error) {
    dispatch(setMessage({ message: error.message }));
  }
  dispatch(setLoading(false));
};

export const signUp = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await authSignUp(credentials);
    dispatch(
      setUser({
        id: response.id,
        email: response.email,
        name: response.name,
      })
    );
  } catch (error) {
    dispatch(setMessage({ message: error.message }));
  }

  dispatch(setLoading(false));
};

// export const userInfo = () => async (dispatch) => {
//   dispatch(setLoading(true));

//   try {
//     const response = await authUserInfo();

//     if (response) {
//       dispatch(
//         setUser({
//           id: response.id,
//           email: response.email,
//           name: response.name,
//         })
//       );
//     }
//   } catch (error) {}
// };

export const signOut = () => (dispatch) => {
  dispatch(setUser(undefined));
};

export const resetPassword = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await authResetPassword(credentials);

    // Just temporarily
    dispatch(
      setUser({
        email: response.email,
      })
    );
  } catch (error) {
    dispatch(setMessage({ message: error.message }));
  }

  dispatch(setLoading(false));
};

export default slice.reducer;
