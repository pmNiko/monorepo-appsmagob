import { useState } from "react";
import { useQueryState } from "usequerymunisma";
import { formatterOptions, useAuthStore } from "@shared/infra";
import { FN_SGD } from "#application/FN_SGD";
import { useDDJJStore } from "../store";
import { DDJJResponse } from "../interfaces";
import { ddjjAdapter } from "../adapters";

export const useHandlerTable = () => {
  const userSession = useAuthStore((state) => state.user);
  const [isOpenEmailModal, setIsOpenEmailModal] = useState(true);
  const [isOpenInsertModalResponse, setIsOpenInsertModalResponse] = useState(
    false
  );

  const modalToDeclareIsOpen = useDDJJStore(
    (state) => state.modalToDeclareIsOpen
  );
  const toggleModalToDeclare = useDDJJStore((state) => state.toggleModal);
  const year = useDDJJStore((state) => state.year);
  const setSelectorEmployees = useDDJJStore(
    (state) => state.setSelectorEmployees
  );
  const setSelectorSurface = useDDJJStore((state) => state.setSelectorSurface);
  const setDeclarations = useDDJJStore((state) => state.setDeclarations);
  const resetDeclare = useDDJJStore((state) => state.resetDeclare);
  const toDeclare = useDDJJStore((state) => state.toDeclare);

  const handlerInsert = useQueryState<{ resultado: number }>(
    FN_SGD.DDJJ_Insert,
    {
      singleObject: true,
      runAfter: {
        execute() {
          handlerInsert.containsData && setIsOpenInsertModalResponse(true);
        },
      },
    }
  );

  const handlerDDJJ = useQueryState<DDJJResponse[]>(FN_SGD.DDJJ_Listar, {
    dependsOn: year | handlerInsert.data?.resultado!,
    searchParams: { n_cont: userSession?.n_cont, ano: year },
    runAfter: {
      execute() {
        if (handlerDDJJ.containsData) {
          const ddjjDraft = ddjjAdapter(handlerDDJJ.data!, year);
          setDeclarations(ddjjDraft);
        }
      },
    },
  });

  const handlerSelectorEmployees = useQueryState<
    {
      idcantempl: number;
      descripcion: string;
    }[]
  >(FN_SGD.DDJJ_Selector_Empleados, {
    auto: true,
    runAfter: {
      execute() {
        setSelectorEmployees(formatterOptions(handlerSelectorEmployees.data!));
      },
    },
  });

  const handlerSelectorSurface = useQueryState<
    {
      idsuperficie: number;
      descripcion: string;
    }[]
  >(FN_SGD.DDJJ_Selector_Superficie, {
    auto: true,
    runAfter: {
      execute() {
        setSelectorSurface(formatterOptions(handlerSelectorSurface.data!));
      },
    },
  });

  const declareConfirm = () => {
    handlerInsert.search({
      ano: year,
      n_serie: toDeclare.n_serie,
      idcantempleados: toDeclare.idcantempleados,
      idsuperficie: toDeclare.idsuperficie,
      maxfactproyect: toDeclare.maxfactproyect,
      cantidadabonados: toDeclare.cntabonados,
    });
    resetDeclare();
  };

  return {
    modalToDeclareIsOpen,
    toggleModalToDeclare,

    isFetching: handlerDDJJ.isFetching,
    isLoading: handlerInsert.isLoading,
    declareConfirm,
    resetDeclare,

    notify: handlerInsert.notify,
    message: handlerInsert.notify.message,

    isOpenInsertModalResponse,
    closeInsertResponse: () => setIsOpenInsertModalResponse(false),

    ddjjNumberCreated: handlerInsert.data?.resultado,
    email: userSession?.e_mail,

    n_cont: userSession?.n_cont!,
    isOpenEmailModal: !userSession?.e_mail && isOpenEmailModal,
    closeOpenEmailModal: () => setIsOpenEmailModal(false),
  };
};
