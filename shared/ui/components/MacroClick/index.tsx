import { Environments } from "@shared/infra";
import { useEffect, useRef, useState } from "react";

export interface DataFormMacro {
  ok: string;
  Hash: string;
  Comercio: string;
  TransaccionComercioId: string;
  CallbackSuccess: string;
  CallbackCancel: string;
  SucursalComercio: string;
  Monto: string;
  [key: string]: string;
}

interface Props {
  dataFormMacro: DataFormMacro;
  reset: () => void;
}

/**
 * Formulario no visible para el envio de datos a Macro.
 */
export const MacroPaymentLinkForm = ({ dataFormMacro, reset }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [valuesFormMacro, setValuesFormMacro] = useState(dataFormMacro);
  const [items, setItems] = useState<Array<{ [key: string]: string }>>([]);

  useEffect(() => {
    const productProps = Object.keys(dataFormMacro).filter((prop) =>
      prop.startsWith("Producto")
    );
    const amountProductoProps = Object.keys(dataFormMacro).filter((prop) =>
      prop.startsWith("MontoProducto")
    );

    for (let i = 0; i < productProps.length; i++) {
      const productKey = productProps[i];
      const amountProductKey = amountProductoProps[i];

      const product = dataFormMacro[productKey];
      const amountProduct = dataFormMacro[amountProductKey];

      const nuevoObjeto = {
        productKey,
        product,
        amountProductKey,
        amountProduct,
      };

      setItems((prevArray) => [...prevArray, nuevoObjeto]);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      formRef.current!.submit();
      reset();

      setTimeout(() => {
        setValuesFormMacro({
          ok: "false",
          Hash: "",
          Comercio: "",
          TransaccionComercioId: "",
          CallbackSuccess: "",
          CallbackCancel: "",
          SucursalComercio: "",
          Monto: "",
        });
      }, 3000);
    }
  }, [items]);

  return (
    <form
      id="myForm"
      ref={formRef}
      action={Environments.ApiMacroClick}
      method="POST"
      target="_self"
      hidden
    >
      <input type="text" name="Comercio" value={valuesFormMacro.Comercio} />
      <input type="text" name="Hash" value={valuesFormMacro.Hash} />
      <input
        type="text"
        name="TransaccionComercioId"
        value={valuesFormMacro.TransaccionComercioId}
      />
      <input
        type="text"
        name="CallbackSuccess"
        value={valuesFormMacro.CallbackSuccess}
      />
      <input
        type="text"
        name="CallbackCancel"
        value={valuesFormMacro.CallbackCancel}
      />
      <input
        type="text"
        name="SucursalComercio"
        value={valuesFormMacro.SucursalComercio}
      />
      <input type="text" name="Monto" value={valuesFormMacro.Monto} />
      {items.map((item) => (
        <>
          <input type="text" name={item.productKey} value={item.product} />
          <input
            type="text"
            name={item.amountProductKey}
            value={item.amountProduct}
          />
        </>
      ))}
    </form>
  );
};
