import { toast } from 'react-toastify';

export default {
  success: (message: any) => toast.success(message),
  error: (message: any) => toast.error(message),
  warning: (message: any) => toast.warning(message),
}