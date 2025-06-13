import { HStack, Badge, Text, Avatar, Box, Stack } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { colors } from "commons/consts";
import { overFlowText } from "modules/scss";
import { jsonParse } from "utils/json";

const columnHelper = createColumnHelper<any>();

export const getColumns = (props: any) => {
  const { t, lang } = props;

  return [
    columnHelper.accessor("serial", {
      cell: (info) => <Text style={overFlowText}>{info.getValue()}</Text>,
      header: t('table#serial')
    }),
    columnHelper.accessor("phone", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table#phone')
    }),
    columnHelper.accessor("address", {
      cell: (info) => <Text style={overFlowText}>{info.getValue()}</Text>,
      header:  t('table#address')
    }),
    columnHelper.accessor("status", {
      cell: (info) => <Badge size="sm">{jsonParse(info.getValue()?.typeName)[lang]}</Badge>,
      header: t('table#status')
    }),
    columnHelper.accessor("paymentStatus", {
      cell: (info) => <Badge size="sm">{jsonParse(info.getValue()?.typeName)[lang]}</Badge>,
      header: t('table#paymentStatus')
    }),
    // columnHelper.accessor("paymentType", {
    //   cell: (info) => <Badge size="sm">{jsonParse(info.getValue()?.typeName)[lang]}</Badge>,
    //   header: t('table#paymentType')
    // }),
    columnHelper.accessor("products", {
      cell: (info) => (
        <Stack>
          {
            info.getValue().map(
              (v: any, idx: number) => <Badge style={{...overFlowText, width: '200px'}} size="sm" mr={1} colorScheme={colors[idx]} key={idx}>{v.name}</Badge>
            )
          }
        </Stack>
      ) ,
      header: t('table#products')
    }),
  ];
}