export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
export const NETWORK_TIMEOUT = 10000;

export const common = {
  CORRECT: 1,
  INCORRECT: 0,
};

export const FIRST_PAGE = 1;
export const PAGE_SIZE = 40;
export const MAX_REFRESH_TIME = 200;

export const MAX_QUANTITY_OPTIONS = 5;

export const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];
export const colors = ['green', 'red', 'blue', 'orange', 'yellow', 'teal'];

export const secrets = {
  GUARD: 'd19f5f256gser12121f761811d1ce2274a8f9632c1256c019d00bcbe309e91e34d9446f02caea7858168bb6556527c00bbb2c5ca2c065595bb1082233c8c33453b6b1275954645ff8953711e30ec15dfd078967f8c939d907bcbc7223edd9e5cd4728bcd641a2ebe472754681ac87eb639d50c4f3a57116d8e02f814b9477d6603d3facf6aba1c6cc3fcbaa0d4dae9fd784b07ff72bdaafbb35d588b7bed4c3ad8b0fb9b0ab885ac18ca21a79715879ab8bcf09e7e241b92bdf4288c93c2a9df23925e7aa778b1fd21f5790822e319356a6f287f31c1edacbeccd42f5de352abe76e988b67c6af83f987e8ad31f53419d9b59f50a7eaf9a527de7e62711a6cd11ab5d66d58172d3a3a45941d505b293326f2e886203c51aa91305644fa0312c24b919f5f0a40e55466bfe9ec4654a2eddad784099b1110501e58a6f6633e4704860892c17c915ef89f9de2854489474c1f778e76c0857da3bc28290e727bbaddcff2d29eee97ef4ef68441b56768c203613def389755fb8cb652789fa2271bdfb67353c6ac8ff366b240085c4c7a5f26df51cd67d68834c4f687d1647a32c95193ba2c38b2cb3e2869d9ff7f752659adcfafa3d6ea3d327e2bd1d83d936edf6959c1e0a97eb37dd1919a290eb85ad5c1e8a9dd9e8a78454d8226f16f5c9',
} 

export const config = {
  API_URL: process.env.api,
  WEB_URL: process.env.web,
}
export const defaultLanguage = 'vi';

export const supportLanguages = {
  "/": { name: 'menu#language#title', key: '/', icon: null },
  "vi": { name: 'menu#language#vi', key: 'vi', icon: <span className="fi fi-vn"/> },
  "en": { name: 'menu#language#en', key: 'en', icon: <span className="fi fi-us"/> },
};