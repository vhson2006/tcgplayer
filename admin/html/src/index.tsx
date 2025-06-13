import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from "react-ga4";
import App from './App';
import reportWebVitals from 'reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
// import { theme } from './themes/blueberry';
// import { theme } from './themes/handwritten';
import { theme } from './themes/pro-ui';
import "/node_modules/flag-icons/css/flag-icons.min.css";

import 'react-toastify/dist/ReactToastify.css';
  
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// ReactGA.initialize("450096510");
