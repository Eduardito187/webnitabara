import { gql } from '@apollo/client';
export function IrUrlNitabara(a) {
  window.location.href = a;
}
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
          Nombre
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
export const NuevoUsuario = gql `
  mutation Registrar_Usuario(
    $Email: String!
    $Telefono: String!
    $barrio: Int!
    $calle: String!
    $casa: String!
    $ci: String!
    $ciudad: Int!
    $contra: String!
    $documento: Int!
    $materno: String!
    $paterno: String!
    $nombre: String!
    $usuario: String!
    $zona: Int!
    $nacimiento: String!
  ) {
    Registrar_Usuario(
      Email: $Email
      Telefono: $Telefono
      barrio: $barrio
      calle: $calle
      casa: $casa
      ci: $ci
      ciudad: $ciudad
      contra: $contra
      documento: $documento
      materno: $materno
      paterno: $paterno
      nombre: $nombre
      usuario: $usuario
      zona: $zona
      nacimiento: $nacimiento
    ){
      response
    }
  }
`;
export const EditarUsuarioAPI = gql `
  query Usuario($ID: Int!) {
    Usuario(ID: $ID) {
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
          Nombre
        }
        Ciudad {
          ID
          Nombre
        }
        Direccion {
          ID
          Zona {
            ID
            Nombre
          }
          Barrio {
            ID
            Nombre
          }
          Calle
          Casa
        }
      }
    }
  }
`;
export const RolesAPI = gql `
  query Roles {
    Roles {
      ID
      Rol
      RolPermiso {
        ID
        Permiso {
          ID
          Nombre
          Codigo
        }
      }
    }
  }
`;
export const UpdateUsuario = gql `
  mutation Editar_Usuario(
    $ID: Int!
    $Email: String!
    $Telefono: String!
    $barrio: Int!
    $calle: String!
    $casa: String!
    $ci: String!
    $ciudad: Int!
    $documento: Int!
    $materno: String!
    $paterno: String!
    $nombre: String!
    $usuario: String!
    $zona: Int!
    $nacimiento: String!
  ) {
    Editar_Usuario(
      ID: $ID
      Email: $Email
      Telefono: $Telefono
      barrio: $barrio
      calle: $calle
      casa: $casa
      ci: $ci
      ciudad: $ciudad
      documento: $documento
      materno: $materno
      paterno: $paterno
      nombre: $nombre
      usuario: $usuario
      zona: $zona
      nacimiento: $nacimiento
    ){
      response
    }
  }
`;
export const DeleteUsuario = gql `
  mutation Eliminar_Usuario(
    $ID: Int!
  ) {
    Eliminar_Usuario(
      ID: $ID
    ){
      response
    }
  }
`;