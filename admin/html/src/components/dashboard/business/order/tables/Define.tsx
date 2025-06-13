import { HStack, Badge, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { colors } from "commons/config";
import CustomIconButton from "modules/buttons/CustomIconButton";
import { overFlowText } from "modules/scss";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { HiOutlineEye } from "react-icons/hi";
import { Link } from "react-router-dom";
import { jsonParse } from "utils/json";
import { makeUrl } from "utils/link";

const columnHelper = createColumnHelper<any>();

export const getColumns = (props: any) => {
  const { t, location, activedLanguage, deleteOrderHandler } = props;

  return [
    columnHelper.accessor("serial", {
      cell: (info) => <Text style={{...overFlowText, width: '200px'}}>{info.getValue()}</Text>,
      header:  t('table.order.serial')
    }),
    columnHelper.accessor("phone", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.order.phone')
    }),
    columnHelper.accessor("address", {
      cell: (info) => <Text style={overFlowText}>{info.getValue()}</Text>,
      header:  t('table.order.address')
    }),
    columnHelper.accessor("status", {
      cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue()?.typeName)[activedLanguage]}</Badge>,
      header: t('table.order.status')
    }),
    columnHelper.accessor("paymentType", {
      cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue()?.typeName)[activedLanguage]}</Badge>,
      header: t('table.order.payment-type')
    }),
    columnHelper.accessor("paymentStatus", {
      cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue()?.typeName)[activedLanguage]}</Badge>,
      header: t('table.order.payment-status')
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <HStack spacing="1">
          <CustomIconButton 
            icon={<HiOutlineEye />} 
            variant="tertiary" 
            permission="order.view"
            aria-label="View order" 
            as={Link}
            to={makeUrl(`/dashboard/business/order/${info.getValue()}`, location)}
          />
          <CustomIconButton 
            icon={<FiEdit2 />} 
            variant="tertiary" 
            permission="order.update"
            aria-label="Edit order" 
            as={Link}
            to={makeUrl(`/dashboard/business/order/${info.getValue()}/edit`, location)}
          />
          <CustomIconButton 
            icon={<FiTrash2 />} 
            variant="tertiary"
            permission="order.delete" 
            aria-label="Delete order" 
            onClick={() => deleteOrderHandler(info.row.original.id)}
          />
        </HStack>
      ),
      header: t('table.action'),
    })
  ];
}