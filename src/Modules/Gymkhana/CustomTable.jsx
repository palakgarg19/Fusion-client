import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; //if using mantine date picker features
import "mantine-react-table/styles.css"; //make sure MRT styles were imported in your app root (once)
import {
  flexRender,
  MRT_GlobalFilterTextInput,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  useMantineReactTable,
  MRT_TableBodyCellValue,
} from "mantine-react-table";
import { Divider, Flex, Stack, Table, Title } from "@mantine/core";

function CustomTable({ data, columns }) {
  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },

    mantinePaginationProps: {
      rowsPerPageOptions: ["5", "10", "15"],
    },
    paginationDisplayMode: "pages",
  });

  return (
    <Stack>
      <Divider />
      <Title order={4}>My Custom Headless Table</Title>
      <Flex justify="space-between" align="center">
        <MRT_GlobalFilterTextInput table={table} />
        <MRT_TablePagination table={table} />
      </Flex>

      <Table
        captionSide="top"
        fz="md"
        highlightOnHover
        horizontalSpacing="xl"
        striped
        verticalSpacing="xs"
        withTableBorder
        withColumnBorders
        m="0"
      >
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Th key={header.id}>
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
                  <MRT_TableBodyCellValue cell={cell} table={table} />
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
    </Stack>
  );
}

export default CustomTable;
