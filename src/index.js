import React from 'react';
import ReactDOM from 'react-dom/client';
import WrapComponent from './WrapComponent';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import topModal from './reducer/topModal';
import addressSearch from './reducer/addressSearch';
import address from './reducer/address';
import signIn from './reducer/signIn';
import messageModal from './reducer/messageModal';
import confirmModal from './reducer/confirmModal';
import signUpModal from './reducer/signUpModal';
import signUpData from './reducer/signUpData';
import viewProduct from './reducer/viewProduct';
import viewProductIsFlag from './reducer/viewProductIsFlag';
import quickMenuViewProduct from './reducer/quickMenuViewProduct';
import cartReducer from './reducer/cartReducer';
import adminSignUpModal from './reducer/adminSignUpModal';
import adminsignIn from './reducer/adminsignIn';
import signOut from './reducer/signOut';


const store = configureStore({
  reducer: {
    topModal,
    addressSearch,
    address,
    signIn,
    messageModal,
    confirmModal,
    signUpModal,
    signUpData,
    viewProduct,
    viewProductIsFlag,
    quickMenuViewProduct,
    cartReducer,
    adminSignUpModal,
    adminsignIn,
    signOut
  }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WrapComponent />
    </Provider>
  </React.StrictMode>
);
