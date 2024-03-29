import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

//Conexion con la api GRAPHQL
const client = new ApolloClient({
  uri: 'http://nitabara.grazcompany.com',
  cache: new InMemoryCache()
});

//ApolloProvider es el contenedor de toda el sistema WEB
//client={client} es la conexion por defecto del proyecto a la API
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();