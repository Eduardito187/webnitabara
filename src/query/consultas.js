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
export const Consulta_Cuenta = gql `
  query Usuario(
    $ID: Int!
    ) {
      Usuario(
        ID: $ID
      ) {
      ID
      Usuario
      Persona {
        ID
        Nombre
        Paterno
        Materno
        Correo
        Telefono
        Nacimiento
        TipoDocumento
        Direccion
        Ciudad
        Usuario
        FechaCreado
        FechaActualizado
        FechaEliminado
      }
      Perfil {
        ID
        URLPublica
        Direccion
        Peso
        Formato
        FechaCreado
        FechaActualizado
        FechaEliminado
      }
    }
  }
`;
export const Consulta_Cuenta_Roles = gql `
  query Usuario(
    $ID: Int!
    ) {
      Usuario(
        ID: $ID
      ) {
      ID
      Roles {
        ID
        Rol {
          ID
          Rol
        }
      }
    }
  }
`;