import React from "react";
import { 
  Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, 
  Box, Divider, Flex, Checkbox, HStack ,
} from "@chakra-ui/react";
import { useReactTable, getCoreRowModel, getSortedRowModel, SortingState, flexRender } from "@tanstack/react-table";
import { useSelector } from "react-redux";

const DataAccordion = (props: any) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { data, columns, permissionGroup, onSelect } = props;
  const { permission } = useSelector((state: any) => state.authenticationReducer); 

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  });
  const rows = table.getRowModel().rows

  return (
    <Accordion allowMultiple>
      {
        data.map((d: any, idx: number) => {
          const row: any = rows.find((row) => row.original === d)
          const cell = row.getVisibleCells().find((c: any) => c.column.id == columns.filter((c: any) => c.accessorKey !== 'selected')[0].accessorKey)
          
          return (
            <AccordionItem key={idx}>
              <h2>
                <AccordionButton>
                  {
                    typeof onSelect === "function" 
                    && permission 
                    && permissionGroup
                    && permission[permissionGroup] 
                    && Array.isArray(permission[permissionGroup])
                    && permission[permissionGroup].includes('update')
                    ? (
                      <Box as='span' flex='1' textAlign='left' onClick={(e: any) => e.stopPropagation()}>
                        <HStack spacing="3">
                          <Checkbox onChange={(e: any) => {
                            onSelect({
                              id: d.id ? d.id : idx.toString(),
                              value: e.target.checked
                            })}}/>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </HStack>
                      </Box>
                    ) : 
                    (flexRender(cell.column.columnDef.cell, cell.getContext()))
                  }
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {
                  columns.filter((c: any) => c.accessorKey !== 'selected').map((column: any) => {
                    const cell = row.getVisibleCells().find((c: any) => c.column.id == column.accessorKey)
                    return (
                      <React.Fragment key={`${idx}_${column.accessorKey}`}>
                        <Flex my="5">
                          <Box flex='1'>
                            {column.header}
                          </Box>
                          <Box flex='1'>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Box>
                        </Flex>
                        <Divider/>
                      </React.Fragment>
                    )
                  })
                }
              </AccordionPanel>
            </AccordionItem>
          )
        })
      }
    </Accordion>
  )
}

export default DataAccordion
