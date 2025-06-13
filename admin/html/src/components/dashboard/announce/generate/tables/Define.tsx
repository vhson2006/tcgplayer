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
  const { t, location, activedLanguage, deleteGenerateHandler } = props;

  return [
    columnHelper.accessor("command", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.generate.command')
    }),
    columnHelper.accessor("status", {
      cell: (info) => {
        return (
          <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>
            {jsonParse(info.getValue()?.typeName)[activedLanguage]}
          </Badge>
        )
      },
      header: t('table.generate.type')
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <HStack spacing="1">
          <CustomIconButton 
            icon={<HiOutlineEye />} 
            variant="tertiary" 
            permission="generate.view"
            aria-label="View generate" 
            as={Link}
            to={makeUrl(`/dashboard/announce/generate/${info.getValue()}`, location)}
          />
          <CustomIconButton 
            icon={<FiEdit2 />} 
            variant="tertiary" 
            permission="generate.update"
            aria-label="Edit generate" 
            as={Link}
            to={makeUrl(`/dashboard/announce/generate/${info.getValue()}/edit`, location)}
          />
          <CustomIconButton 
            icon={<FiTrash2 />} 
            variant="tertiary" 
            permission="generate.delete"
            aria-label="Delete generate" 
            onClick={() => deleteGenerateHandler(info.row.original.id)}
          />
        </HStack>
      ),
      header: t('table.action'),
    })
  ];
}