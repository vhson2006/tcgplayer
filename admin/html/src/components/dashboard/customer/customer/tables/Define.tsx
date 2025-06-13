import { HStack, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import CustomIconButton from "modules/buttons/CustomIconButton";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { HiOutlineEye } from "react-icons/hi";
import { Link } from "react-router-dom";
import { makeUrl } from "utils/link";

const columnHelper = createColumnHelper<any>();

export const getColumns = (props: any) => {
  const { t, location, activedLanguage, deleteCustomerHandler } = props;

  return [
    columnHelper.accessor("name", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.customer.name')
    }),
    columnHelper.accessor("phone", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.customer.phone')
    }),
    columnHelper.accessor("address", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.customer.address')
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <HStack spacing="1">
          <CustomIconButton 
            icon={<HiOutlineEye />} 
            variant="tertiary" 
            permission="customer.view"
            aria-label="View customer" 
            as={Link}
            to={makeUrl(`/dashboard/customer/${info.getValue()}`, location)}
          />
          <CustomIconButton 
            icon={<FiEdit2 />} 
            variant="tertiary" 
            permission="customer.update"
            aria-label="Edit customer" 
            as={Link}
            to={makeUrl(`/dashboard/customer/${info.getValue()}/edit`, location)}
          />
          <CustomIconButton 
            icon={<FiTrash2 />} 
            variant="tertiary" 
            permission="customer.delete"
            aria-label="Delete customer" 
            onClick={() => deleteCustomerHandler(info.row.original.id)}
          />
        </HStack>
      ),
      header: t('table.action'),
    })
  ];
}