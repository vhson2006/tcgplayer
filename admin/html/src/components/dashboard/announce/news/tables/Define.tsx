import { HStack, Badge, Text, Avatar, Box } from "@chakra-ui/react";
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
  const { t, location, lang, deleteNewsHandler } = props;

  return [
    columnHelper.accessor("title", {
      cell: (info) => (
        <HStack spacing="3">
          <Avatar name={info.row.original.title} src={info.row.original.image?.url} boxSize="10" />
          <Box>
            <Text style={overFlowText}>{jsonParse(info.getValue())[lang]}</Text>
          </Box>
        </HStack>
      ),
      header: t('table.news.title')
    }),
    columnHelper.accessor("content", {
      cell: (info) => <Text style={overFlowText}>{jsonParse(info.getValue())[lang]}</Text>,
      header:  t('table.news.content')
    }),
    columnHelper.accessor("newsCategory", {
      cell: (info) => <Badge size="sm">{jsonParse(info.getValue()?.typeName)[lang]}</Badge>,
      header: t('table.category')
    }),
    columnHelper.accessor("newsTags", {
      cell: (info) => info.getValue().map(
        (v: any, idx: number) => <Badge size="sm" mr={1} colorScheme={colors[idx]} key={idx}>{jsonParse(v.typeName)[lang]}</Badge>
      ),
      header: t('table.tags')
    }),
    columnHelper.accessor("slug", {
      cell: (info) => (
        <HStack spacing="1">
          <CustomIconButton 
            icon={<HiOutlineEye />} 
            variant="tertiary" 
            permission="news.view"
            aria-label="View news" 
            as={Link}
            to={makeUrl(`/dashboard/announce/${info.getValue()}`, location)}
          />
          <CustomIconButton 
            icon={<FiEdit2 />} 
            variant="tertiary" 
            permission="news.update"
            aria-label="Edit news" 
            as={Link}
            to={makeUrl(`/dashboard/announce/${info.getValue()}/edit`, location)}
          />
          <CustomIconButton 
            icon={<FiTrash2 />} 
            variant="tertiary" 
            permission="news.delete"
            aria-label="Delete news" 
            onClick={() => deleteNewsHandler(info.row.original.id)}
          />
        </HStack>
      ),
      header: t('table.action'),
    })
  ];
}