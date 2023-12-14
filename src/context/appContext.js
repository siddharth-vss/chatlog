/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useContext, useEffect } from 'react';
import reducer from './reducer';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,

  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,

  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,

  LOGOUT_USER,


} from './actions'
import axios from 'axios';
import { useState } from 'react';


export const initialState = {
  showSidebar: false,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: '',
  id: '',
  name: '',
  pic: '',
  email: '',
};





const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [selectedChat, setSelectedChat] = useState();

  // const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(()=>{
    console.log(localStorage.getItem('userInfo'));
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const sp = axios.create({
    baseURL: 'https://talk-a-live-sp.onrender.com',
    headers: {
      Authorization: `Bearer ${state.user}`,
    },
  });
  // response interceptor
  sp.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.user}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response interceptor
  sp.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );


  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT,
    });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };


  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await sp.post('/users', currentUser);
      const { email, name, pic, token, _id } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          email, name, pic, token, _id

        },
      });

    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {

    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await sp.post('/users/login', currentUser);

      const { email, name, pic, token, _id } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          email, name, pic, token, _id

        }
      });
     
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.error },
      });
    }
    clearAlert();
  };


  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
  }


  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logoutUser,
        selectedChat,
        setSelectedChat,
        // notification,
        // setNotification,
        chats,
        setChats,
        sp,
        windowSize,


      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};



export default AppProvider;