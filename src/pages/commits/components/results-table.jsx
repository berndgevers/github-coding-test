import React, { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { formatAsEnUSDate } from "../../../formatters/date-formatter";
import { getLocalItem, setLocalItem } from "../../../local-storage";

export function ViewCommits({ commits }) {
  const [readLater, setReadLater] = useState([]);

  useEffect(() => {
    setReadLater(JSON.parse(getLocalItem("readLater")));
  }, []);

  useEffect(() => {
    setLocalItem("readLater", JSON.stringify(readLater));
  }, [readLater]);

  const columns = [
    {
      name: "Author",
      selector: (row) => row.commit.author.name,
      width: "15%",
    },
    {
      name: "Message",
      selector: (row) => row.commit.message,
      wrap: true,
      width: "45%",
    },
    {
      name: "Date",
      selector: (row) => formatAsEnUSDate(row.commit.author.date),
      width: "20%",
    },
    {
      name: "Action",
      selector: (row) => {
        const isSaved =
          readLater.filter((item) => item.sha === row.sha).length > 0;
        return isSaved ? (
          <button
            className="small"
            onClick={() => {
              removeCommit(row);
            }}
          >
            Remove
          </button>
        ) : (
          <button
            className="small"
            onClick={() => {
              saveCommit(row);
            }}
          >
            Save
          </button>
        );
      },
    },
  ];
  const [filterText, setFilterText] = useState("");
  const filteredItems = commits.filter(
    (item) =>
      item.commit.message &&
      item.commit.message.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    return <FilterComponent setFilterText={setFilterText} />;
  }, [filterText]);
  return (
    <div className="tableWrapper">
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        dense
        striped
        responsive
      />
    </div>
  );
  function saveCommit(commit) {
    const tempReadLater = [...readLater];
    tempReadLater.push(commit);
    setReadLater(tempReadLater);
  }
  function removeCommit(commit) {
    const tempReadLater = readLater.filter((item) => {
      if (item.sha !== commit.sha) {
        return item;
      }
    });
    setReadLater(tempReadLater);
  }
}

function FilterComponent({ setFilterText }) {
  return (
    <input
      type="text"
      onChange={(e) => setFilterText(e.target.value)}
      placeholder="Filter commit messages..."
    />
  );
}
