import React, { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { FloatingRedirectCornerButton } from "../../components/buttons";
import { ClearPatButton, patEmpty } from "../../auth/token";
import { Redirect, useLocation } from "react-router-dom";
import { getLocalItem } from "../../local-storage";

export function SavedCommits() {
  if (patEmpty()) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  const location = useLocation();
  let author = location?.state?.author;
  const [readLater, setReadLater] = useState([]);

  useEffect(() => {
    const savedCommits = JSON.parse(getLocalItem("readLater"));
    const mySavedCommits = savedCommits.filter((item) => {
      if (item.author.login === author) return item;
    });
    setReadLater(mySavedCommits);
  }, []);

  const columns = [
    {
      name: "Author",
      selector: (row) => row.commit.author.name,
      width: "15%",
    },
    {
      name: "Message",
      selector: (row) => row.commit.message,
      width: "70%",
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
  const filteredItems = readLater.filter(
    (item) =>
      item.commit.message &&
      item.commit.message.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    return <FilterComponent setFilterText={setFilterText} />;
  }, [filterText]);

  if (!author) {
    author = getLocalItem("author");
  }

  return (
    <>
      {!patEmpty() && <ClearPatButton />}
      <h1>Saved Commits</h1>
      <div className="tableWrapper">
        <FloatingRedirectCornerButton
          url={"/commits"}
          corner={"top-right"}
          label={"Back"}
        />
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
    </>
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
      placeholder="Filter saved commit messages..."
    />
  );
}
