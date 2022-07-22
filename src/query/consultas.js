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
  query Usuario($ID: Int!) {
      Usuario(ID: $ID) {
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
  query Usuario($ID: Int!) {
      Usuario(ID: $ID) {
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
export const UsuariosLista = gql `
  query Usuarios {
    Usuarios{
      ID
      Usuario
      Persona {
        ID
        Nombre
        Paterno
        Materno
        CI
        Correo
        Telefono
        Nacimiento
        TipoDocumento {
          ID
          Tipo
        }
      }
    }
  }
`;
export const Ciudades = gql `
  query Ciudades {
    Ciudades {
      ID
      Nombre
    }
  }
`;
export const Zonas = gql `
  query Zonas {
    Zonas {
      ID
      Nombre
    }
  }
`;
export const Barrios = gql `
  query Barrios {
    Barrios {
      ID
      Nombre
    }
  }
`;
export const TiposDocumentos = gql `
  query TipoDocumentos {
    TipoDocumentos {
      ID
      Nombre
    }
  }
`;