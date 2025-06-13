import { Checkbox, useBreakpointValue } from "@chakra-ui/react";
import { createColumnHelper } from '@tanstack/react-table';
import DataTable from "modules/table/DataTable";
import DataAccordion from "modules/table/DataAccordion";
import { useSelector } from "react-redux";

const columnHelper = createColumnHelper<any>();

const ResponsiveTable = (props: any) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { data, columns, permissionGroup, onSelect } = props;
  const { permission } = useSelector((state: any) => state.authentication); 

  return isMobile ? 
    <DataAccordion {...props}/> : 
    typeof onSelect === "function" 
    && permission 
    && permissionGroup
    && permission[permissionGroup] 
    && Array.isArray(permission[permissionGroup])
    && permission[permissionGroup].includes('update')
    ? (
      <DataTable data={data} columns={[
        columnHelper.accessor("selected", {
          cell: (info) => <Checkbox onChange={(e: any) => {
            onSelect({
              id: info.row.original.id ? info.row.original.id : info.row.id,
              value: e.target.checked
            })}}/>,
          header: '',
          // header: () => <Checkbox onChange={(e: any) => {
          //   onSelect({
          //     id: 'info.row.original.id ? info.row.original.id : info.row.id',
          //     value: e.target.checked
          //   })}}/>,
        }),
        ...columns
      ]} />
    ) :
    <DataTable data={data} columns={columns} />
}
  
export default ResponsiveTable