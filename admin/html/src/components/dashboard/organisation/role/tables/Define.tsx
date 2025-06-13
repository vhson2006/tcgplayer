import { HStack, Badge, Text, SimpleGrid } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { colors } from "commons/config";
import { Fragment } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { HiOutlineEye } from "react-icons/hi";
import { Link } from "react-router-dom";
import { makeUrl } from "utils/link";
import { jsonParse } from "utils/json";
import CustomIconButton from "modules/buttons/CustomIconButton";

const columnHelper = createColumnHelper<any>();

export const getColumns = (props: any) => {
  const { t, location, lang, deleteRoleHandler } = props;

  return [
    columnHelper.accessor("typeName", {
      cell: (info) => <Text>{jsonParse(info.getValue())[lang]}</Text>,
      header: t('table.role.name')
    }),
    columnHelper.accessor("permissions", {
      cell: (info) => {
        try {
          return (
            <SimpleGrid columns={5} spacing="5px" >
              {
                info.getValue().map(
                  (v: any, idx: number) => (
                    <Badge size="sm" mr={1} colorScheme={colors[idx % colors.length]} key={idx}>
                      {jsonParse(v.typeName)[lang]}-{jsonParse(v.groupName)[lang]}
                    </Badge>
                  )
                )
              }
            </SimpleGrid >
          )
        } catch (e) {
          return (
            <Fragment/>
          )
        }
      },
      header: t('table.role.permission')
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <HStack spacing="1">
          <CustomIconButton 
            icon={<HiOutlineEye />} 
            variant="tertiary" 
            permission="role.view"
            aria-label="View role" 
            as={Link}
            to={makeUrl(`/dashboard/organisation/role/${info.getValue()}`, location)}
          />
          <CustomIconButton 
            icon={<FiEdit2 />} 
            variant="tertiary" 
            permission="role.update"
            aria-label="Edit role" 
            as={Link}
            to={makeUrl(`/dashboard/organisation/role/${info.getValue()}/edit`, location)}
          />
          <CustomIconButton 
            icon={<FiTrash2 />} 
            variant="tertiary" 
            permission="role.delete"
            aria-label="Delete role" 
            onClick={() => deleteRoleHandler(info.row.original.id)}
          />
        </HStack>
      ),
      header: t('table.action'),
    })
  ];
}