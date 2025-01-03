export interface ItemSection {
  posicion: number;
  titulo: string;
  resumen: string;
  descripcion: string;
  icono: string;
  ruta: string;
  idmenu: number;
  sector: string;
  externo: boolean;
  navlink: boolean;
  iconname: string;
  iconcolor: null;
  iconfontsize: null;
  destacado: number;
  auth: boolean;
  goTo: () => void;
}

export interface ItemsGridCards {
  sector: string;
  items: ItemSection[];
}

export interface ItemsAdapter {
  headerCards: ItemSection[];
  gridCards: ItemsGridCards[];
}
