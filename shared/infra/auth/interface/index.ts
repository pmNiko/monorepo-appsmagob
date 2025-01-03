export interface SessionUser {
  n_cont: number;
  denominacion: string;
  cuitcuil: string;
  documento: string;
  tipopersona: string;
  fechanacimiento: string;
  e_mail: string;
  telefono: string;
}

type TargetPath = {
  isNavigate: boolean;
  path: string;
};

export interface SessionState {
  isLogged: boolean;
  token: string | null;
  user: SessionUser | null;
  isBlockModal: boolean;
  modalIsOpen: boolean;
  searchParams: null | {};
  targetPath: null | TargetPath;
}

export type SessionActions = {
  loginUser: (data: SessionUser) => Promise<void>;
  logoutUser: () => void;

  checkAuth: () => Promise<boolean>;

  openModal: () => void;
  closeModal: () => void;
  openBlockedModal: () => void;
  closeBlockedModal: () => void;

  setSearchParams: (params: any) => void;
  setTargetPath: (value: TargetPath) => void;
  cleanTargetPath: () => void;

  clearAllExceptAuthStore: () => void;
};
