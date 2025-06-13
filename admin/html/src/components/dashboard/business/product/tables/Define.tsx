import { HStack, Badge, Text } from "@chakra-ui/react";
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
  const { t, location, activedLanguage, deleteProductHandler } = props;

  return [
    columnHelper.accessor("name", {
      cell: (info) => <Text style={{...overFlowText, width: '300px',}}>{info.getValue()}</Text>,
      header:  t('table.product.name')
    }),
    columnHelper.accessor("description", {
      cell: (info) => <Text style={overFlowText}>{info.getValue()}</Text>,
      header:  t('table.product.description')
    }),
    columnHelper.accessor("price", {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header:  t('table.product.price')
    }),
    // columnHelper.accessor("discount", {
    //   cell: (info) => <Text>{info.getValue()}</Text>,
    //   header:  t('table.product.discount')
    // }),
    // columnHelper.accessor("productType", {
    //   cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue()?.typeName)[activedLanguage]}</Badge>,
    //   header: t('table.product.type')
    // }),
    // columnHelper.accessor("productCategory", {
    //   cell: (info) => <Badge size="sm" mr={1} colorScheme={colors[Math.floor(Math.random() * colors.length)]}>{jsonParse(info.getValue()?.typeName)[activedLanguage]}</Badge>,
    //   header: t('table.category')
    // }),
    columnHelper.accessor("productTags", {
      cell: (info) => info.getValue().map(
        (v: any, idx: number) => <Badge size="sm" mr={1} colorScheme={colors[idx]} key={idx}>{jsonParse(v.typeName)[activedLanguage]}</Badge>
      ),
      header: t('table.tags')
    }),
    columnHelper.accessor("slug", {
      cell: (info) => (
        <HStack spacing="1">
          <CustomIconButton 
            icon={<HiOutlineEye />} 
            variant="tertiary" 
            permission="product.view"
            aria-label="View product" 
            as={Link}
            to={makeUrl(`/dashboard/business/${info.getValue()}`, location)}
          />
          <CustomIconButton 
            icon={<FiEdit2 />} 
            variant="tertiary" 
            permission="product.update"
            aria-label="Edit product" 
            as={Link}
            to={makeUrl(`/dashboard/business/${info.getValue()}/edit`, location)}
          />
          <CustomIconButton 
            icon={<FiTrash2 />} 
            variant="tertiary" 
            permission="product.delete"
            aria-label="Delete product" 
            onClick={() => deleteProductHandler(info.row.original.id)}
          />
        </HStack>
      ),
      header: t('table.action'),
    })
  ];
}