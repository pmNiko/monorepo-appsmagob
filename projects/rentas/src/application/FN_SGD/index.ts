/** -------- Funciones para el módulo de Rentas ---------- */
export const FN_SGD = {
  // Validación de tributo
  Validar_Tributo: "fnwsrecibosvalidartributo",

  // Listar tributos
  Recibos_Listar: "fnapprcblistado",

  // Adhesión al recibo por email
  Adhesion_Listar: "fnappgettributosxtribunserie",
  Adhesion_Solicitud: "fntremailadhesionmasiva",
  Adhesion_Confirmar: "fntrconfirmaradhesionmasiva",

  // Comprobantes de pago
  ComprobanteDePago_Selector_Tributos:
    "fnrcblistadocomprobantesdepagocmbtributos",
  ComprobanteDePago_Selector_Periodos: "fnrcblistadocomprobantesdepagocmbanio",
  ComprobanteDePago_Listar: "fnrcblistadocomprobantesdepago",

  // Tarifaria
  Tarifaria_Valores_Puntos: "fnvalvalorespuntos",
} as const;
