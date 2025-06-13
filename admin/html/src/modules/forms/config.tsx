import { CiPhone } from "react-icons/ci";
import { FiSearch, FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { PiIdentificationCardLight } from "react-icons/pi";

export const inputSetting: any = {
  search: {
    name: 'search',
    label: 'input.search.label',
    placeholder: 'input.search.placeholder',
    icon: FiSearch,
    rules:  {}
  },
  name: {
    name: 'name',
    label: 'input.name.label',
    placeholder: 'input.name.placeholder',
    icon: FiUser,
    rules: {
      required: true,
      // pattern: /^[A-Za-z 0-9]*$/,
      minLength: 1,
      maxLength: 50,
    }
  },
  cmnd: {
    name: 'cmnd',
    label: 'input.cmnd.label',
    placeholder: 'input.cmnd.placeholder',
    icon: PiIdentificationCardLight,
    rules: {
      required: true,
      minLength: 10,
      maxLength: 12,
    }
  },
  phone: {
    name: 'phone',
    label: 'input.phone.label',
    placeholder: 'input.phone.placeholder',
    icon: CiPhone,
    rules: {
      required: true,
      minLength: 8,
      maxLength: 14,
    }
  },
  email: {
    name: 'email',
    label: 'input.email.label',
    placeholder: 'input.email.placeholder',
    icon: HiOutlineMail,
    rules: {
      required: true,
      minLength: 4,
    }
  },
  address: {
    name: 'address',
    label: 'input.address.label',
    placeholder: 'input.address.placeholder',
    icon: null,
    rules: {
      required: true,
      maxLength: 200,
    }
  },
  password: {
    name: 'password',
    label: 'input.password.label',
    placeholder: 'input.password.placeholder',
    icon: null,
    rules: {
      required: true,
      minLength: 6,
    }
  },
  "news-title": {
    name: 'title',
    label: 'input.news-title.label',
    placeholder: 'input.news-title.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "news-content": {
    name: 'content',
    label: 'input.news-content.label',
    placeholder: 'input.news-content.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "news-predefine": {
    name: 'predefine',
    label: 'input.news-predefine.label',
    placeholder: 'input.news-predefine.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "news-author": {
    name: 'author',
    label: 'input.news-author.label',
    placeholder: 'input.news-author.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "tag-type": {
    name: 'type',
    label: 'input.tag-type.label',
    placeholder: 'input.tag-type.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "tag-name": {
    name: 'name',
    label: 'input.tag-name.label',
    placeholder: 'input.tag-name.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "category-type": {
    name: 'type',
    label: 'input.category-type.label',
    placeholder: 'input.category-type.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "category-name": {
    name: 'name',
    label: 'input.category-name.label',
    placeholder: 'input.category-name.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "email-title": {
    name: 'title',
    label: 'input.email-title.label',
    placeholder: 'input.email-title.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "email-content": {
    name: 'content',
    label: 'input.email-content.label',
    placeholder: 'input.email-content.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "media-name": {
    name: 'name',
    label: 'input.media-name.label',
    placeholder: 'input.media-name.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "media-alt": {
    name: 'alt',
    label: 'input.media-alt.label',
    placeholder: 'input.media-alt.placeholder',
    icon: null,
    rules: {}
  },
  "media-type": {
    name: 'fileType',
    label: 'input.media-type.label',
    placeholder: 'input.media-type.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "role-name": {
    name: 'name',
    label: 'input.role-name.label',
    placeholder: 'input.role-name.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "role-type": {
    name: 'type',
    label: 'input.role-type.label',
    placeholder: 'input.role-type.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "product-name": {
    name: 'name',
    label: 'input.product-name.label',
    placeholder: 'input.product-name.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "product-description": {
    name: 'description',
    label: 'input.product-description.label',
    placeholder: 'input.product-description.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "product-price": {
    name: 'price',
    label: 'input.product-price.label',
    placeholder: 'input.product-price.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "product-discount": {
    name: 'discount',
    label: 'input.product-discount.label',
    placeholder: 'input.product-discount.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "product-quantity": {
    name: 'quantity',
    label: 'input.product-quantity.label',
    placeholder: 'input.product-quantity.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "order-serial": {
    name: 'serial',
    label: 'input.order-serial.label',
    placeholder: 'input.order-serial.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "order-phone": {
    name: 'phone',
    label: 'input.order-phone.label',
    placeholder: 'input.order-phone.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "order-address": {
    name: 'address',
    label: 'input.order-address.label',
    placeholder: 'input.order-address.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "voucher-code": {
    name: 'code',
    label: 'input.voucher-code.label',
    placeholder: 'input.voucher-code.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "voucher-value": {
    name: 'value',
    label: 'input.voucher-value.label',
    placeholder: 'input.voucher-value.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "voucher-min": {
    name: 'min',
    label: 'input.voucher-min.label',
    placeholder: 'input.voucher-min.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "voucher-max": {
    name: 'max',
    label: 'input.voucher-max.label',
    placeholder: 'input.voucher-max.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "condition-value": {
    name: 'conditionValue',
    label: 'input.condition-value.label',
    placeholder: 'input.condition-value.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
  "generate-command": {
    name: 'command',
    label: 'input.generate-command.label',
    placeholder: 'input.generate-command.placeholder',
    icon: null,
    rules: {
      required: true,
    }
  },
}