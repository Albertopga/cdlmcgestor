import { toast } from 'react-toastify';

export default function alertError(code) {
  const errorCodes ={
    'auth/user-not-found': 'El usuario indicado no existe.',
    'auth/wrong-password': 'Contraseña inconrrecta.',
    'auth/too-manu-request': 'Se han solicitado demasiadas peticiones de reenvio de email de confirmación. Espere unos minutos.'
  }

  toast.warning(errorCodes[code] || `ERROR: ${code}` );
}