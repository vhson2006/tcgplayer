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
  const { t, location, activedLanguage, deleteAccessCodeHandler } = props;

  return [
    columnHelper.accessor("code", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.access-code.code')
    }),
    columnHelper.accessor("type", {
      cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue()?.typeName)[activedLanguage]}</Badge>,
      header: t('table.access-code.type')
    }),
    // columnHelper.accessor("times", {
    //   cell: (info) => <Text>{info.getValue()}</Text>,
    //   header:  t('table.access-code.times')
    // }),
    // columnHelper.accessor("start-time", {
    //   cell: (info) => <Text>{info.getValue()}</Text>,
    //   header:  t('table.access-code.start-time')
    // }),
    // columnHelper.accessor("end-time", {
    //   cell: (info) => <Text>{info.getValue()}</Text>,
    //   header:  t('table.access-code.start-time')
    // }),
    columnHelper.accessor("status", {
      cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue()?.typeName)[activedLanguage]}</Badge>,
      header: t('table.access-code.status')
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <HStack spacing="1">
          <CustomIconButton 
            icon={<HiOutlineEye />} 
            variant="tertiary" 
            permission="accesscode.view"
            aria-label="View access code" 
            as={Link}
            to={makeUrl(`/dashboard/setting/access-code/${info.getValue()}`, location)}
          />
          <CustomIconButton 
            icon={<FiEdit2 />} 
            variant="tertiary" 
            permission="accesscode.update"
            aria-label="Edit access code" 
            as={Link}
            to={makeUrl(`/dashboard/setting/access-code/${info.getValue()}/edit`, location)}
          />
          <CustomIconButton 
            icon={<FiTrash2 />} 
            variant="tertiary" 
            permission="accesscode.delete"
            aria-label="Delete access code" 
            onClick={() => deleteAccessCodeHandler(info.row.original.id)}
          />
        </HStack>
      ),
      header: t('table.action'),
    })
  ];
}