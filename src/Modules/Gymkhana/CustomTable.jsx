import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import {
  flexRender,
  MRT_GlobalFilterTextInput,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  useMantineReactTable,
  MRT_TableBodyCellValue,
} from "mantine-react-table";
import { useMediaQuery } from "@mantine/hooks";
import { Divider, Flex, Stack, Table, Title, Paper } from "@mantine/core";
import PropTypes from "prop-types";

// function CustomTable({ data, columns, TableName }) {
//   const table = useMantineReactTable({
//     columns,
//     data,
//     enableRowSelection: true,
//     initialState: {
//       pagination: { pageSize: 5, pageIndex: 0 },
//       showGlobalFilter: true,
//     },

//     mantinePaginationProps: {
//       rowsPerPageOptions: ["5", "10", "15"],
//     },
//     paginationDisplayMode: "pages",
//     mantineTableBodyCellProps: {
//       sx: {
//         whiteSpace: "nowrap",
//         overflow: "hidden",
//         textOverflow: "ellipsis",
//       },
//     },
//   });

//   return (
//     <Stack style={{ width: 400, height: 400 }}>
//       <Divider />
//       <Title order={4}>{TableName} Table</Title>
//       <Flex justify="space-between" align="center">
//         {/* eslint-disable-next-line react/jsx-pascal-case */}
//         <MRT_GlobalFilterTextInput table={table} />
//         {/* eslint-disable-next-line react/jsx-pascal-case */}
//         <MRT_TablePagination table={table} />
//       </Flex>

//       <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
//         <Table
//           captionSide="top"
//           fz="md"
//           highlightOnHover
//           horizontalSpacing="xs"
//           striped
//           verticalSpacing="xs"
//           withTableBorder
//           withColumnBorders
//           style={{ width: '100%', height: '100%' }}
//         >
//           <Table.Thead>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <Table.Tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <Table.Th key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.Header ??
//                             header.column.columnDef.header,
//                           header.getContext(),
//                         )}
//                   </Table.Th>
//                 ))}
//               </Table.Tr>
//             ))}
//           </Table.Thead>
//           <Table.Tbody>
//             {table.getRowModel().rows.map((row) => (
//               <Table.Tr key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <Table.Td key={cell.id}>
//                     {/* eslint-disable-next-line react/jsx-pascal-case */}
//                     <MRT_TableBodyCellValue cell={cell} table={table} />
//                   </Table.Td>
//                 ))}
//               </Table.Tr>
//             ))}
//           </Table.Tbody>
//         </Table>
//       </div>

//       {/* eslint-disable-next-line react/jsx-pascal-case */}
//       <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
//     </Stack>
//   );
// }
function CustomTable({ data, columns, TableName }) {
  const table = useMantineReactTable({
    columns,
    data,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },

    mantinePaginationProps: {
      rowsPerPageOptions: ["5", "10", "15"],
    },
    paginationDisplayMode: "pages",
    size: 20,
    mantineTableBodyCellProps: {
      width: "20px",
      cellPadding: "5px",
    },
    enableStickyHeader: true,
  });
  const isMobile = useMediaQuery(`(max-width: 750px)`);
  return (
    <Paper withBorder shadow="sm" p="md" style={{ backgroundColor: "white" }}>
      <Stack style={{ width: "100%" }}>
        <Divider />
        <Title order={2} align="center" c="blue" className="club-header">
          {TableName} Table
        </Title>
        <Flex justify="space-between" align="center">
          {/* eslint-disable-next-line react/jsx-pascal-case */}
          <MRT_GlobalFilterTextInput table={table} visibleFrom="md" />
          {/* eslint-disable-next-line react/jsx-pascal-case */}
          <MRT_TablePagination table={table} size="md" />
        </Flex>

        <div style={{ width: "100%", overflow: "scroll" }}>
          <Table
            captionSide="top"
            fz="md"
            highlightOnHover
            horizontalSpacing="xs"
            striped
            verticalSpacing="xs"
            withTableBorder
            withColumnBorders // Make table span the full width
          >
            <Table.Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Table.Th
                      key={header.id}
                      // Minimum width for each header
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.Header ??
                              header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Table.Th>
                  ))}
                </Table.Tr>
              ))}
            </Table.Thead>
            <Table.Tbody>
              {table.getRowModel().rows.map((row) => (
                <Table.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      {/* eslint-disable-next-line react/jsx-pascal-case */}
                      <MRT_TableBodyCellValue cell={cell} table={table} />
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>

        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
      </Stack>
    </Paper>
  );
}

CustomTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      accessorKey: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
    }),
  ),
  TableName: PropTypes.string,
};

export default CustomTable;
