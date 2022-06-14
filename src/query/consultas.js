import { gql } from '@apollo/client';
//mutacion que valida el login
export const Validar_LOG = gql `
  mutation validacion_login(
    $Usuario: String!
    $Contra: String!
    ) {
    validacion_login(
      Usuario: $Usuario
      Contra: $Contra
      ) {
      estado
      id_cuenta
    }
  }
`;