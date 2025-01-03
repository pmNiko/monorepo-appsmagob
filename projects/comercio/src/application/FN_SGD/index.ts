/** -----------  Funciones para el Comercio  ----------- */
export const FN_SGD = {
  // Adhesión al recibo por email
  Adhesion_Solicitud: "fntremailadhesionmasiva",

  // Accione de Declaración Jurada
  DDJJ_Selector_Empleados: "fndjcmbempleados",
  DDJJ_Selector_Superficie: "fndjcmbsuperficie",
  DDJJ_Listar: "fndjporcontribuyente",
  DDJJ_Insert: "fndjdeclaracionjuradainsert",
  DDJJ_Reenviar_Acuse_Recibo: "fndjacuserecibo",

  // Acciones para trámites de Pecas
  Licencia_Tramite_Pecas_Buscar: "GetTramiteDePECAS",
  Licencia_Tramite_Pecas_Listar_Movimientos: "GetMovimentosTramitePECAS",
} as const;
