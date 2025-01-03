const getPublicIP = async () => {
  const res = await fetch("https://api.ipify.org/?format=json")
  // .then(resp => ({ ...resp, status: 503 }));
  if (res.status === 503) {
    throw new Error('Services not available - https://api.ipify.org/?format=json')
  }
  const data = await res.json();
  return data.ip;
};

const getOriginIP = async () => {
  try {
    const res = await fetch("https://httpbin.org/ip")
    // .then(resp => ({ ...resp, status: 503 }))
    if (res.status === 503) {
      throw new Error('Services not available - https://httpbin.org/ip')
    }

    const data = await res.json();
    return data.origin;
  } catch (error) {
    return { error }
  }
};



/**
 * Se usará 
 *  1 - httpbin.org para recuperar la ip en caso de falla
 *  2 - Se utilizará api.ipify.org para intentar recuperar la ip del cliente
 */
export const getHttpIP = async () => {
  try {
    const originIP = await getOriginIP();

    if (originIP.error) {
      console.error(originIP.error)
      const publicIP = await getPublicIP();
      return publicIP
    }

    return originIP
  } catch (error) {
    console.error(error)
  }
}