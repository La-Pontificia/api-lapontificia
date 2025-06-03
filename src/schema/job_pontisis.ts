import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { tableId, timestamps } from '../utils'

export const JobPontisis = mysqlTable('job_pontisis', {
  id: tableId('id'),
  status: varchar('status', { length: 255 }).default('processing'),
  // - estado del job, puede ser processing, completed, error

  error: varchar('error', { length: 500 }).default(''),
  // - mensaje de error, si el job falla, se guarda el mensaje de error

  id_fase: int('id_fase'),
  // - fase del cliente potencial, debe ser 4 para convertirse a alumno
  // required

  id_mod_ing: varchar('id_mod_ing', { length: 1 }),
  // - modalidad de ingreso del cliente potencial, se encuentra en Gestion Maestro-> Modalidad de ingreso
  // required

  c_apepat: varchar('c_apepat', { length: 50 }),
  // - apellido paterno del cliente potencial
  // required

  c_apemat: varchar('c_apemat', { length: 50 }),
  // - apellido materno del cliente potencial
  // required

  c_nombres: varchar('c_nombres', { length: 50 }),
  // - nombres del cliente potencial
  // required

  c_tipdoc: varchar('c_tipdoc', { length: 10 }),
  // - codigo del tipo de documento
  // - "DNI, CARNEEXT, PARTNAC, TITULO, PTP, PASPT, CURP, CEDULA"
  // required

  c_numdoc: varchar('c_numdoc', { length: 11 }),
  // - numero de documento del cliente potencial, 8 digitos si el c_tipdoc es DNI
  // required

  c_email: varchar('c_email', { length: 50 }),
  // - correo electronico del cliente potencial
  // required

  c_codfac1: varchar('c_codfac1', { length: 2 }),
  // - codigo del programa academico
  // required

  c_codesp1: varchar('c_codesp1', { length: 5 }),
  // - codigo del programa de estudios
  // required

  c_sedcod: varchar('c_sedcod', { length: 4 }),
  // - codigo de la sede, para Andahuaylas 11, para los demas 1
  // required

  c_codmod: varchar('c_codmod', { length: 2 }),
  // - codigo de la modalidad, se trabaja con 1
  // required

  id_proceso: varchar('id_proceso', { length: 50 }),
  // - codigo del proceso de admision, se encuentra en Gestion Maestro-> admision
  // required

  id_user: varchar('id_user', { length: 50 }),
  // - codigo de usuario que registro al cliente potencial
  // required

  // OPTIONAL FIELDS

  convertir_alumno: varchar('convertir_alumno', { length: 1 }).default('0'),
  // - valor binario para convertir postulante a alumno, 0 no convertir, 1 si convertir
  // required

  d_fecnac: varchar('d_fecnac', { length: 10 }),
  // - fecha de nacimiento del cliente potencial, formato yyyy-mm-dd
  // optional

  c_ubigeo_nac: varchar('c_ubigeo_nac', { length: 6 }),
  // - codigo de ubigeo de nacimiento del cliente potencial, solo si el campo c_paisnac esta como peru
  // optional

  c_ubigeo_dom: varchar('c_ubigeo_dom', { length: 6 }),
  // - codigo de ubigeo de domicilio del cliente potencial
  // optional

  c_dir: varchar('c_dir', { length: 100 }),
  // - direccion de domicilio del cliente potencial
  // optional

  c_fono: varchar('c_fono', { length: 9 }),
  // - telefono del cliente potencial
  // optional

  c_celu: varchar('c_celu', { length: 9 }),
  // - celular del cliente potencial
  // optional

  c_procedencia: varchar('c_procedencia', { length: 100 }),
  // - nombre del colegio de procedencia del cliente potencial
  // optional

  c_colg_ubicacion: varchar('c_colg_ubicacion', { length: 300 }),
  // - direccion del colegio de procedencia del cliente potencial
  // optional

  c_tippro: varchar('c_tippro', { length: 4 }),
  // - tipo de colegio, 0 sin definir, PAR para particular y EST para estatal
  // optional

  c_anoegreso: varchar('c_anoegreso', { length: 4 }),
  // - año de egreso
  // optional

  c_modular: varchar('c_modular', { length: 7 }),
  // - codigo modular del colegio
  // optional

  id_tab_turno: varchar('id_tab_turno', { length: 10 }),
  // - codigo del turno del cliente potencial
  // optional

  id_tab_sitalu: varchar('id_tab_sitalu', { length: 10 }),
  // - codigo de la situacion del cliente potencial, 0 sin definir, ORD ordinario, TEC tecnico, CONVA convalidacion, PRO profesional
  // optional

  c_nomapo: varchar('c_nomapo', { length: 100 }),
  // - nombre apoderado cliente potencial
  // optional

  c_dniapo: varchar('c_dniapo', { length: 11 }),
  // - documento apoderado cliente potencial
  // optional

  c_fonoapo: varchar('c_fonoapo', { length: 30 }),
  // - telefono apoderado cliente potencial
  // optional

  c_celuapo: varchar('c_celuapo', { length: 30 }),
  // - celular apoderado cliente potencial
  // optional

  c_parentescoapo: varchar('c_parentescoapo', { length: 40 }),
  // - parentesco apoderado cliente potencial
  // optional

  c_nomapo_2: varchar('c_nomapo_2', { length: 100 }),
  // - nombre apoderado 2 cliente potencial
  // optional

  c_dniapo_2: varchar('c_dniapo_2', { length: 11 }),
  // - documento apoderado 2 cliente potencial
  // optional

  c_fonoapo_2: varchar('c_fonoapo_2', { length: 30 }),
  // - telefono apoderado 2 cliente potencial
  // optional

  c_celuapo_2: varchar('c_celuapo_2', { length: 30 }),
  // - celular apoderado 2 cliente potencial
  // optional

  c_parentescoapo_2: varchar('c_parentescoapo_2', { length: 40 }),
  // - parentesco apoderado 2 cliente potencial
  // optional

  c_emailapo_1: varchar('c_emailapo_1', { length: 110 }),
  // - correo apoderado 1 cliente potencial
  // optional

  c_emailapo_2: varchar('c_emailapo_2', { length: 110 }),
  // - correo apoderado 2 cliente potencial
  // optional

  id_tab_alu_contact: varchar('id_tab_alu_contact', { length: 10 }),
  // - codigo del como se entero el cliente potencial
  // optional

  c_obs: varchar('c_obs', { length: 300 }),
  // - observacion sobre el cliente potencial
  // optional

  cod_asesor: varchar('cod_asesor', { length: 50 }),
  // - codigo del asesor asignado al cliente potencial, vacio en caso de no tener asignado
  // optional

  c_paisnac: varchar('c_paisnac', { length: 2 }),
  // - codigo del pais de nacimiento del cliente potencial
  // optional

  c_sexo: varchar('c_sexo', { length: 1 }),
  // - codigo del genero del cliente potencial, N no selección, M masculino, F femenino, O otro
  // optional

  c_canales: varchar('c_canales', { length: 10 }),
  // - codigo del canal
  // optional

  c_seguimiento: varchar('c_seguimiento', { length: 10 }),
  // - codigo del seguimiento en llamadas
  // optional

  c_ietnica: varchar('c_ietnica', { length: 10 }),
  // - codigo identidad etnica
  // optional

  c_lengua_nat: varchar('c_lengua_nat', { length: 10 }),
  // - codigo Lengua Nativa
  // optional

  c_idioma_ext: varchar('c_idioma_ext', { length: 10 }),
  // - codigo Idioma Extrajero
  // optional

  c_cond_discap: varchar('c_cond_discap', { length: 10 }),
  // - codigo Condicion discapacidad
  // optional

  c_tip_discap: varchar('c_tip_discap', { length: 10 }),
  // - codigo Tipo Discapacidad
  // optional

  c_codigo_orcid: varchar('c_codigo_orcid', { length: 20 }),
  // - codigo orcid
  // optional

  c_est_civil: varchar('c_est_civil', { length: 10 }),
  // - codigo Estado civil
  // optional

  ...timestamps()
})

export type JobPontisis = typeof JobPontisis.$inferSelect
