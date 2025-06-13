import { HStack, Avatar, Badge, Box, IconButton, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { colors } from "commons/config";
import CustomIconButton from "modules/buttons/CustomIconButton";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { HiOutlineEye } from "react-icons/hi";
import { Link } from "react-router-dom";
import { jsonParse } from "utils/json";
import { makeUrl } from "utils/link";
import { stringToPoint } from "utils/string";

const columnHelper = createColumnHelper<any>();

export const getColumns = (props: any) => {
  const { t, location, activedLanguage, deleteEmployeeHandler } = props;
  return [
    columnHelper.accessor("name", {
      cell: (info) => {
        return (
          <HStack spacing="3">
            <Avatar name={info.row.original.name} src={info.row.original.avatar?.url} boxSize="10" />
            <Box>
              <Text fontWeight="medium">{info.row.original.name}</Text>
              <Text color="fg.muted">{info.row.original.role && jsonParse(info.row.original.role?.typeName)[activedLanguage]}</Text>
            </Box>
          </HStack>
        )
      },
      header: t('table.employee.information')
    }),
    columnHelper.accessor("phone", {
      cell: (info) => {
        return (
          <Box>
            <Text fontWeight="medium">{info.row.original.phone}</Text>
            <Text color="fg.muted">{info.row.original.email}</Text>
          </Box>
        )
      },
      header: t('table.employee.contact')
    }),
    columnHelper.accessor("status", {
      cell: (info) => {
        const text = jsonParse(info.getValue()?.typeName)[activedLanguage]
        return (
          <Badge size="sm" colorScheme={colors[Math.floor(stringToPoint(text) % colors.length)]}>
            {text}
          </Badge>
        )
      },
      header: t('table.status')
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <HStack spacing="1">
          <CustomIconButton
            icon={<HiOutlineEye />} 
            variant="tertiary" 
            permission="employee.view"
            aria-label="View member" 
            as={Link}
            to={makeUrl(`/dashboard/organisation/${info.getValue()}`, location)}
          />
          <CustomIconButton 
            icon={<FiEdit2 />} 
            variant="tertiary" 
            permission="employee.update"
            aria-label="Edit member" 
            as={Link}
            to={makeUrl(`/dashboard/organisation/${info.getValue()}/edit`, location)}
          />
          <CustomIconButton 
            icon={<FiTrash2 />} 
            variant="tertiary" 
            permission="employee.delete"
            aria-label="Delete member" 
            onClick={() => deleteEmployeeHandler(info.getValue())}
          />
        </HStack>
      ),
      header: t('table.action'),
    })
  ]
}
