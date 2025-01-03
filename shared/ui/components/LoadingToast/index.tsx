import { useEffect, useId } from 'react';
import { toast } from 'toast-munisma';

interface ToastProps {
  loading: boolean,
  msg?: string,
  dismiss?: boolean,
  timeout?: number
}

/**
 * ------ LoadingToast --------
 * - El componente muestrá un toast cuando el objeto loading sea true
 * - Opcionalmente se le puede pasar un msg de espera 
 */
export const LoadingToast = ({
  loading, 
  msg = 'Buscando datos...',
  dismiss = true,
  timeout = 0
}: ToastProps ) => {  
  const loadingID = useId();  

  useEffect(() => {
    setTimeout(() => {
      if (loading)  {
          toast.loading(msg, { 
            style: {
              background: 'rgb(46, 125, 50)',
              color: 'white',
              fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
              fontSize: '1em',
            }, 
            id: `loading-toast-${loadingID}` 
          })   
      } else {      
         !!dismiss && toast.dismiss(`loading-toast-${loadingID}`);
      }          
    }, timeout);
  }, [loading])

  useEffect(() => {
    !!dismiss && toast.dismiss(`loading-toast-${loadingID}`);
  }, [dismiss])
  



  return null
}