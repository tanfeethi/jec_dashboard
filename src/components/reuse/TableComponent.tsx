import { Table } from "antd";
import type { TableProps } from "antd/es/table";

interface TableComponentProps<T> {
  columns: TableProps<T>["columns"];
  data: T[];
  loading?: boolean;
  pagination?: {
    total?: number;
    pageSize: number;
    current: number;
    onChange: (page: number) => void;
  };
}

const TableComponent = <T extends object>({
  columns,
  data,
  loading,
  pagination,
}: TableComponentProps<T>) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => (record as any).id}
      pagination={
        pagination
          ? {
              style: { display: "flex", justifyContent: "center" },
              ...pagination,
              showSizeChanger: false,
              showLessItems: true,
              hideOnSinglePage: true,
            }
          : false // 👈 disables pagination if not provided
      }
      scroll={{ x: "max-content" }}
      bordered
    />
  );
};

export default TableComponent;
