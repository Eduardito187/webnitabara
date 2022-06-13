import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
export const Validar_LOG = gql `
  mutation validacion_login($Usuario: String!,$Contra: String!) {
    validacion_login(Usuario: $Usuario,Contra: $Contra) {
      estado
      id_cuenta
    }
  }
`;