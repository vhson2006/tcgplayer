import { 
  metaTitle, metaDescription, breadcrum, description, title, sidebar, navbar, language, notification
} from 'commons/languages/en/layout';
import { button, error, message, input, tooltip } from 'commons/languages/en/form';
import { tableEmployeeHeader } from 'commons/languages/en/table';
import { modal, drawer, alert } from 'commons/languages/en/popup';
import { home } from 'commons/languages/en/pages/home';
import { notFound } from 'commons/languages/en/pages/not-found';
import { login } from 'commons/languages/en/pages/login';
import { register } from 'commons/languages/en/pages/register';

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
