import { HStack, Badge } from "@chakra-ui/react";
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
  const { t, location, lang, deleteCategoryHandler } = props;

  return [
    columnHelper.accessor("typeName", {
      cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue())[lang]}</Badge>,
      header: t('table.category.type')
    }),
    columnHelper.accessor("group", {
      cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue()?.typeName)[lang]}</Badge>,
      header:  t('table.category.group')
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <HStack spacing="1">
          <CustomIconButton 
            icon={<HiOutlineEye />} 
            variant="tertiary" 
            permission="category.view"
            aria-label="View category" 
            as={Link}
            to={makeUrl(`/dashboard/setting/category/${info.getValue()}`, location)}
          />
          <CustomIconButton 
            icon={<FiEdit2 />} 
            variant="tertiary" 
            permission="category.update"
            aria-label="Edit category" 
            as={Link}
            to={makeUrl(`/dashboard/setting/category/${info.getValue()}/edit`, location)}
          />
          <CustomIconButton 
            icon={<FiTrash2 />} 
            variant="tertiary" 
            permission="category.delete"
            aria-label="Delete category" 
            onClick={() => deleteCategoryHandler(info.row.original.id)}
          />
        </HStack>
      ),
      header: t('table.action'),
    })
  ];
}