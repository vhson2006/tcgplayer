import { Badge, Text, Tooltip } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { colors } from "commons/config";
import { overFlowText } from "modules/scss";
import { jsonParse } from "utils/json";

const columnHelper = createColumnHelper<any>();

export const getColumns = (props: any) => {
  const { t, activedLanguage } = props;

  return [
    columnHelper.accessor("name", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.comment.name')
    }),
    columnHelper.accessor("comment", {
      cell: (info) => <Tooltip label={info.getValue()}><Text style={overFlowText}>{info.getValue()}</Text></Tooltip>,
      header:  t('table.comment.comment')
    }),
    columnHelper.accessor("type", {
      cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue()?.typeName)[activedLanguage]}</Badge>,
      header: t('table.comment.type')
    }),
    columnHelper.accessor("status", {
      cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue()?.typeName)[activedLanguage]}</Badge>,
      header: t('table.comment.status')
    }),
  ];
}