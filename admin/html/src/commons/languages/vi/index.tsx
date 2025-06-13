import { 
  metaTitle, metaDescription, breadcrum, description, title, sidebar, navbar, language, notification
} from 'commons/languages/vi/layout';
import { button, error, message, input, tooltip } from 'commons/languages/vi/form';
import { tableEmployeeHeader } from 'commons/languages/vi/table';
import { modal, drawer, alert } from 'commons/languages/vi/popup';
import { home } from 'commons/languages/vi/pages/home';
import { notFound } from 'commons/languages/vi/pages/not-found';
import { login } from 'commons/languages/vi/pages/login';
import { register } from 'commons/languages/vi/pages/register';

const lang = {
  ...metaTitle,
  ...metaDescription,
  ...breadcrum,
  ...title,
  ...description,
  ...sidebar,
  ...navbar,
  ...button,
  ...error,
  ...message,
  ...home,
  ...language,
  ...notification,
  ...modal,
  ...alert,
  ...drawer,
  ...tableEmployeeHeader,
  ...notFound,
  ...login,
  ...input,
  ...tooltip,
  ...register,
};

export default lang
