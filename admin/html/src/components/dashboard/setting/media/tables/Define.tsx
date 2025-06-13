import { HStack, Badge, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { colors } from "commons/config";
import CustomIconButton from "modules/buttons/CustomIconButton";
import { overFlowText } from "modules/scss";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { HiOutlineEye } from "react-icons/hi";
import { Link } from "react-router-dom";
import { makeUrl } from "utils/link";

const columnHelper = createColumnHelper<any>();

export const getColumns = (props: any) => {
  const { t, location, deleteMediaHandler } = props;

  return [
    columnHelper.accessor("name", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.media.name')
    }),
    columnHelper.accessor("url", {
      cell: (info) => <Text style={overFlowText}>{info.getValue()}</Text>,
      header:  t('table.media.url')
    }),
    columnHelper.accessor("fileType", {
      cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{info.getValue()}</Badge>,
      header: t('table.media.type')
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <HStack spacing="1">
          <CustomIconButton 
            icon={<HiOutlineEye />} 
            variant="tertiary" 
            permission="media.view"
            aria-label="View media" 
            as={Link}
            to={makeUrl(`/dashboard/setting/media/${info.getValue()}`, location)}
          />
          <CustomIconButton 
            icon={<FiEdit2 />} 
            variant="tertiary" 
            permission="media.view"
            aria-label="Edit media" 
            as={Link}
            to={makeUrl(`/dashboard/setting/media/${info.getValue()}/edit`, location)}
          />
          <CustomIconButton 
            icon={<FiTrash2 />} 
            variant="tertiary" 
            permission="media.view"
            aria-label="Delete media" 
            onClick={() => deleteMediaHandler(info.row.original.id)}
          />
        </HStack>
      ),
      header: t('table.action'),
    })
  ];
}