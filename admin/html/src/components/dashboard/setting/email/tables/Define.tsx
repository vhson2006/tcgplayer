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
  const { t, location, activedLanguage, deleteEmailHandler } = props;

  return [
    columnHelper.accessor("title", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.email.title')
    }),
    columnHelper.accessor("content", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.email.content')
    }),
    columnHelper.accessor("type", {
      cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue()?.typeName)[activedLanguage]}</Badge>,
      header: t('table.email.type')
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <HStack spacing="1">
          <CustomIconButton 
            icon={<HiOutlineEye />} 
            variant="tertiary" 
            permission="email.view"
            aria-label="View email" 
            as={Link}
            to={makeUrl(`/dashboard/setting/email/${info.getValue()}`, location)}
          />
          <CustomIconButton 
            icon={<FiEdit2 />} 
            variant="tertiary" 
            permission="email.update"
            aria-label="Edit email" 
            as={Link}
            to={makeUrl(`/dashboard/setting/email/${info.getValue()}/edit`, location)}
          />
          <CustomIconButton 
            icon={<FiTrash2 />} 
            variant="tertiary" 
            permission="email.delete"
            aria-label="Delete email" 
            onClick={() => deleteEmailHandler(info.row.original.id)}
          />
        </HStack>
      ),
      header: t('table.action'),
    })
  ];
}