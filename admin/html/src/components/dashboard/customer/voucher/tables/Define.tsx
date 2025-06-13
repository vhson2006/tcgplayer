import { HStack, Badge, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { colors } from "commons/config";
import CustomIconButton from "modules/buttons/CustomIconButton";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { HiOutlineEye } from "react-icons/hi";
import { Link } from "react-router-dom";
import { jsonParse } from "utils/json";
import { makeUrl } from "utils/link";

const columnHelper = createColumnHelper<any>();

export const getColumns = (props: any) => {
  const { t, location, activedLanguage, deleteVoucherHandler } = props;

  return [
    columnHelper.accessor("code", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.voucher.code')
    }),
    columnHelper.accessor("value", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.voucher.value')
    }),
    columnHelper.accessor("min", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.voucher.min')
    }),
    columnHelper.accessor("max", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.voucher.max')
    }),
    columnHelper.accessor("type", {
      cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue()?.typeName)[activedLanguage]}</Badge>,
      header: t('table.voucher.type')
    }),
    columnHelper.accessor("conditionType", {
      cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue()?.typeName)[activedLanguage]}</Badge>,
      header: t('table.voucher.condition-type')
    }),
    columnHelper.accessor("conditionValue", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.voucher.condition-value')
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <HStack spacing="1">
          <CustomIconButton 
            icon={<HiOutlineEye />} 
            variant="tertiary" 
            permission="voucher.view"
            aria-label="View voucher" 
            as={Link}
            to={makeUrl(`/dashboard/customer/voucher/${info.getValue()}`, location)}
          />
          <CustomIconButton 
            icon={<FiEdit2 />} 
            variant="tertiary" 
            permission="voucher.update"
            aria-label="Edit voucher" 
            as={Link}
            to={makeUrl(`/dashboard/customer/voucher/${info.getValue()}/edit`, location)}
          />
          <CustomIconButton 
            icon={<FiTrash2 />} 
            variant="tertiary" 
            permission="voucher.delete"
            aria-label="Delete voucher" 
            onClick={() => deleteVoucherHandler(info.row.original.id)}
          />
        </HStack>
      ),
      header: t('table.action'),
    })
  ];
}