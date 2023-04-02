import { gql } from '@apollo/client';
export function IrUrlNitabara(a) {
  window.location.href = a;
}
//aqui estan todas las consultas y mutaciones del sistema
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
      id_rol
    }
  }
`;
export const GetExamenes = gql `
query Examenes{
  Examenes {
    ID
    Persona {
      ID
      Nombre
      Paterno
      Materno
      CI
      Correo
      Telefono
      Nacimiento
    }
    Medico {
      ID
      Persona {
        ID
        Nombre
        Paterno
        Materno
        CI
        Correo
        Telefono
        Nacimiento
      }
      Especialidad {
        ID
        Nombre
        Descripcion
      }
      Usuario {
        ID
        Usuario
        State
      }
    }
    Pago {
      ID
      Total
    }
    Descripcion
  }
}
`;
export const GetExamen = gql `
query Examen($ID:Int!){
  Examen(ID:$ID) {
      ID
      Persona {
        ID
        Nombre
        Paterno
        Materno
        CI
        Correo
        Telefono
        Nacimiento
      }
      Medico {
        ID
        Persona {
          ID
          Nombre
          Paterno
          Materno
          CI
          Correo
          Telefono
          Nacimiento
        }
        Especialidad {
          ID
          Nombre
          Descripcion
        }
        Usuario {
          ID
          Usuario
          State
        }
      }
      Pago {
        ID
        Total
      }
      Descripcion
    }
  }
`;
export const GetEspecialidad = gql `
query Especialidades($ID:Int!){
    Especialidades(ID:$ID) {
      ID
      Nombre
    }
  }
`;
export const GetPersonasSelect = gql `
query Personas{
  Personas {
    ID
    Nombre
    Paterno
    Materno
    CI
  }
}
`;
export const GetMedicosSelect = gql `
query Medicos{
  Medicos {
    ID
    Persona {
      ID
      Nombre
      Paterno
      Materno
      CI
    }
  }
}
`;
export const GetEspecialidades = gql `
query Especialidades{
    Especialidades {
      ID
      Nombre
    }
  }
`;
export const CrearNewRol = gql `
  mutation CreateRol(
    $Nombre: String!
    $Permisos: [Int]!
    ) {
      CreateRol(
      Nombre: $Nombre
      Permisos: $Permisos
      ) {
      response
    }
  }
`;
export const MiName =gql`
query Usuario($ID:Int!){
  Usuario(ID:$ID) {
    Persona {
      Nombre
      Paterno
      Materno
    }
  }
}
`;
export const MiFoto =gql`
query Usuario($ID:Int!){
  Usuario(ID:$ID) {
    Perfil {
      ID
      URLPublica
    }
  }
}
`;
export const AsignadoDeRoles = gql `
  mutation AsignadoDeRoles(
    $ID: Int!
    $Roles: [Int]!
    ) {
      AsignadoDeRoles(
      ID: $ID
      Roles: $Roles
      ) {
      response
    }
  }
`;
export const EditarRolAPI = gql `
  mutation EditRolesUsers(
    $ID: Int!
    $Nombre: String!
    $Permisos: [Int]!
    ) {
      EditRolesUsers(
        ID: $ID
        Nombre: $Nombre
        Permisos: $Permisos
      ) {
      response
    }
  }
`;
export const UpdateContraUser = gql `
  mutation UpdateContra(
    $ID: Int!
    $Contra: String!
    ) {
    UpdateContra(
      ID: $ID
      Contra: $Contra
      ) {
      response
    }
  }
`;
export const BloquearUserAPI = gql `
  mutation Bloquear_Usuario(
    $ID: Int!
    $Estado: Boolean!) {
      Bloquear_Usuario(
        ID: $ID
        Estado: $Estado) {
      response
    }
  }
`;
export const GetStateUser = gql `
  query Usuario($ID: Int!) {
    Usuario(ID: $ID) {
      ID
      State
    }
  }`;
export const Consulta_Cuenta = gql `
  query Usuario($ID: Int!) {
      Usuario(ID: $ID) {
      ID
      Usuario
      State
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
export const Nuevo_Medico = gql `
  mutation Registrar_Medico(
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
    $especialidad: Int!
    $nacimiento: String!
  ) {
    Registrar_Medico(
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
      especialidad: $especialidad
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
      State
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
export const SoloRoles = gql`
query Roles{
  Roles {
    ID
    Rol
  }
}
`;
export const RolesUsers = gql`
query Usuario($ID: Int!){
  Usuario(ID:$ID) {
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
export const PermisosAll = gql `
  query Permisos{
    Permisos{
      ID
      Nombre
      Codigo
    }
  }
`;
export const GetRolID = gql `
  query Rol($ID: Int!) {
    Rol(ID: $ID) {
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
export const Consultas = gql`
query Consultas{
  Consultas {
    ID
    Persona {
      ID
      Nombre
      Paterno
      Materno
      CI
      Correo
      Telefono
      Nacimiento
    }
    Medico {
      ID
      Persona {
        ID
        Nombre
        Paterno
        Materno
        CI
        Correo
        Telefono
        Nacimiento
      }
      Especialidad {
        ID
        Nombre
        Descripcion
      }
      Usuario {
        ID
        Usuario
        State
      }
    }
    Pago {
      ID
      Descripcion
      Total
    }
    Descripcion
    Hora
  }
}
`;
export const Consulta = gql`
query Consulta($ID: Int!){
  Consulta(ID:$ID) {
    ID
    Persona {
      ID
      Nombre
      Paterno
      Materno
      CI
      Correo
      Telefono
      Nacimiento
    }
    Medico {
      ID
      Persona {
        ID
        Nombre
        Paterno
        Materno
        CI
        Correo
        Telefono
        Nacimiento
      }
      Especialidad {
        ID
        Nombre
        Descripcion
      }
      Usuario {
        ID
        Usuario
        State
      }
    }
    Pago {
      ID
      Descripcion
      Total
    }
    Descripcion
    Hora
  }
}
`;
export const Cirugias = gql`
query Cirugias{
  Cirugias {
    ID
    Descripcion
    Persona {
      ID
      Nombre
      Paterno
      Materno
      CI
      Correo
      Telefono
      Nacimiento
    }
    Medico {
      ID
      Persona {
        ID
        Nombre
        Paterno
        Materno
        CI
        Correo
        Telefono
        Nacimiento
      }
      Especialidad {
        ID
        Nombre
        Descripcion
      }
      Usuario {
        ID
        Usuario
        State
      }
    }
    PersonaCirugia {
      ID
      HoraAtencion
    }
    Pago {
      ID
      Total
    }
  }
}
`;
export const Cirugia = gql`
query Cirugia($ID: Int!){
  Cirugia(ID:$ID) {
    ID
    Descripcion
    Persona {
      ID
      Nombre
      Paterno
      Materno
      CI
      Correo
      Telefono
      Nacimiento
    }
    Medico {
      ID
      Persona {
        ID
        Nombre
        Paterno
        Materno
        CI
        Correo
        Telefono
        Nacimiento
      }
      Especialidad {
        ID
        Nombre
        Descripcion
      }
      Usuario {
        ID
        Usuario
        State
      }
    }
    PersonaCirugia {
      ID
      HoraAtencion
    }
    Pago {
      ID
      Total
    }
  }
}
`;
export const CreateCirugia = gql `
  mutation CreateCirugia(
    $Usuario: Int!
    $Paciente: Int!
    $Medico: Int!
    $Descripcion: String!
    $Hora: String!
    $Precio: Float!
  ) {
    CreateCirugia(
      Usuario: $Usuario
      Paciente: $Paciente
      Medico: $Medico
      Descripcion: $Descripcion
      Hora: $Hora
      Precio: $Precio
    ){
      response
    }
  }
`;
export const NitaEditCirugia = gql `
  mutation EditCirugia(
    $ID: Int!
    $Usuario: Int!
    $Paciente: Int!
    $Medico: Int!
    $Descripcion: String!
    $Hora: String!
    $Precio: Float!
  ) {
    EditCirugia(
      ID: $ID
      Usuario: $Usuario
      Paciente: $Paciente
      Medico: $Medico
      Descripcion: $Descripcion
      Hora: $Hora
      Precio: $Precio
    ){
      response
    }
  }
`;
export const CreateConsulta = gql `
  mutation CreateConsulta(
    $Usuario: Int!
    $Paciente: Int!
    $Medico: Int!
    $Descripcion: String!
    $Hora: String!
    $Precio: Float!
  ) {
    CreateConsulta(
      Usuario: $Usuario
      Paciente: $Paciente
      Medico: $Medico
      Descripcion: $Descripcion
      Hora: $Hora
      Precio: $Precio
    ){
      response
    }
  }
`;
export const NitaEditConsulta = gql `
  mutation EditConsulta(
    $ID: Int!
    $Usuario: Int!
    $Paciente: Int!
    $Medico: Int!
    $Descripcion: String!
    $Hora: String!
    $Precio: Float!
  ) {
    EditConsulta(
      ID: $ID
      Usuario: $Usuario
      Paciente: $Paciente
      Medico: $Medico
      Descripcion: $Descripcion
      Hora: $Hora
      Precio: $Precio
    ){
      response
    }
  }
`;
export const CreateExamen = gql `
  mutation CreateExamen(
    $Usuario: Int!
    $Paciente: Int!
    $Medico: Int!
    $Descripcion: String!
    $Precio: Float!
  ) {
    CreateExamen(
      Usuario: $Usuario
      Paciente: $Paciente
      Medico: $Medico
      Descripcion: $Descripcion
      Precio: $Precio
    ){
      response
    }
  }
`;
export const NitaEditExamen = gql `
  mutation EditExamen(
    $ID: Int!
    $Usuario: Int!
    $Paciente: Int!
    $Medico: Int!
    $Descripcion: String!
    $Precio: Float!
  ) {
    EditExamen(
      ID: $ID
      Usuario: $Usuario
      Paciente: $Paciente
      Medico: $Medico
      Descripcion: $Descripcion
      Precio: $Precio
    ){
      response
    }
  }
`;
export const DeleteCirugia = gql `
mutation DeleteCirugia(
  $ID: Int!
  ) {
    DeleteCirugia(
      ID: $ID
    ) {
    response
  }
}
`;
export const DeleteConsulta = gql `
mutation DeleteConsulta(
  $ID: Int!
  ) {
    DeleteConsulta(
      ID: $ID
    ) {
    response
  }
}
`;
export const DeleteExamen = gql `
mutation DeleteExamen(
  $ID: Int!
  ) {
    DeleteExamen(
      ID: $ID
    ) {
    response
  }
}
`;
export const MultipleDeleteCirugia = gql `
mutation ListDeleteCirugia(
  $ID: [Int]!
  ) {
    ListDeleteCirugia(
      ID: $ID
    ) {
    response
  }
}
`;
export const MultipleDeleteConsulta = gql `
mutation ListDeleteConsulta(
  $ID: [Int]!
  ) {
    ListDeleteConsulta(
      ID: $ID
    ) {
    response
  }
}
`;
export const MultipleDeleteExamen = gql `
mutation ListDeleteExamen(
  $ID: [Int]!
  ) {
    ListDeleteExamen(
      ID: $ID
    ) {
    response
  }
}
`;
export const ValidarPermisoRango = gql`
query ValidarPermisoRango(
  $ID: Int!
  $Codigo: String!
  $Rol: Int!
  ){
  ValidarPermisoRango(
    ID:$ID
    Codigo:$Codigo
    Rol:$Rol
    ) {
      response
  }
}
`;
export const MultipleListDeleteUsers = gql `
mutation ListDeleteUsers(
  $ID: [Int]!
  ) {
    ListDeleteUsers(
      ID: $ID
    ) {
    response
  }
}
`;
export const MultipleListDeleteRoles = gql `
mutation ListDeleteRoles(
  $ID: [Int]!
  ) {
    ListDeleteRoles(
      ID: $ID
    ) {
    response
  }
}
`;


export const CirugiasFilter = gql`
query CirugiasFiltro(
  $Busqueda: String!
  $Filtro: String!
){
  CirugiasFiltro(
    Busqueda:$Busqueda
    Filtro:$Filtro
  ) {
    ID
    Descripcion
    Persona {
      ID
      Nombre
      Paterno
      Materno
      CI
      Correo
      Telefono
      Nacimiento
    }
    Medico {
      ID
      Persona {
        ID
        Nombre
        Paterno
        Materno
        CI
        Correo
        Telefono
        Nacimiento
      }
      Especialidad {
        ID
        Nombre
        Descripcion
      }
      Usuario {
        ID
        Usuario
        State
      }
    }
    PersonaCirugia {
      ID
      HoraAtencion
    }
    Pago {
      ID
      Total
    }
  }
}
`;
export const ConsultasFilter = gql`
query ConsultasFiltro(
  $Busqueda: String!
  $Filtro: String!
){
  ConsultasFiltro(
    Busqueda:$Busqueda
    Filtro:$Filtro
  ) {
    ID
    Persona {
      ID
      Nombre
      Paterno
      Materno
      CI
      Correo
      Telefono
      Nacimiento
    }
    Medico {
      ID
      Persona {
        ID
        Nombre
        Paterno
        Materno
        CI
        Correo
        Telefono
        Nacimiento
      }
      Especialidad {
        ID
        Nombre
        Descripcion
      }
      Usuario {
        ID
        Usuario
        State
      }
    }
    Pago {
      ID
      Descripcion
      Total
    }
    Descripcion
    Hora
  }
}
`;
export const ExamenesFilter = gql `
query ExamenesFiltro(
  $Busqueda: String!
  $Filtro: String!
){
  ExamenesFiltro(
    Busqueda:$Busqueda
    Filtro:$Filtro
  ) {
    ID
    Persona {
      ID
      Nombre
      Paterno
      Materno
      CI
      Correo
      Telefono
      Nacimiento
    }
    Medico {
      ID
      Persona {
        ID
        Nombre
        Paterno
        Materno
        CI
        Correo
        Telefono
        Nacimiento
      }
      Especialidad {
        ID
        Nombre
        Descripcion
      }
      Usuario {
        ID
        Usuario
        State
      }
    }
    Pago {
      ID
      Total
    }
    Descripcion
  }
}
`;