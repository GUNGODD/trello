"use client";
import { Column } from "@/app/liveblocks.config";
import NewColumnForm from "@/components/forms/NewColumnForm";
import { LiveList, LiveObject, shallow } from "@liveblocks/client";
import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { ReactSortable } from "react-sortablejs";
import { default as BoardColumn } from "@/components/Column";
import { EmptyState } from "@/components/EmptyState";

export default function Columns() {
  const columns = useStorage(
    (root) => root.columns?.map((c) => ({ ...c })),
    shallow
  );

  const updateColumns = useMutation(
    ({ storage }, columns: LiveObject<Column>[]) => {
      storage.set("columns", new LiveList(columns));
    },
    []
  );

  function setColumnsOrder(sortedColumns: Column[]) {
    const newColumns: LiveObject<Column>[] = [];
    sortedColumns.forEach((sortedColumn, newIndex) => {
      const newSortedColumn = { ...sortedColumn };
      newSortedColumn.index = newIndex;
      newColumns.push(new LiveObject(newSortedColumn));
    });
    updateColumns(newColumns);
  }

  if (!columns) {
    return null;
  }

  if (columns.length === 0) {
    return <EmptyState type="column" />;
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
      <ReactSortable
        group={"board-column"}
        list={columns}
        className="flex gap-4"
        ghostClass="opacity-40"
        setList={setColumnsOrder}
      >
        {columns?.length > 0 &&
          columns.map((column) => <BoardColumn key={column.id} {...column} />)}
      </ReactSortable>
      <NewColumnForm />
    </div>
  );
}
