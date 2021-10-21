import React, { useState, useEffect } from "react";
import { ViewCommits } from "./components/results-table";
import { getOctokit } from "../../auth/octokit";
import { FloatingRedirectCornerButton } from "../../components/buttons";
import { ClearPatButton, patEmpty } from "../../auth/token";
import { Redirect } from "react-router-dom";
import { setLocalItem } from "../../local-storage";
import { Spinner } from "@zendeskgarden/react-loaders";
import { ErrorFooter } from "../../error/error-footer";

export function Commits() {
  if (patEmpty()) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(repositories[0]);
  const [commits, setCommits] = useState([]);
  const [pageLimit, setPageLimit] = useState(500);
  const [error, setError] = useState(null);

  const octokit = getOctokit();
  console.log(user);
  useEffect(() => {
    octokit.rest.users
      .getAuthenticated()
      .then((res) => {
        setUser(res.data);
        setLocalItem("author", res.data?.login);
      })
      .catch((err) => {
        setError(err.message);
        setLocalItem("author", "");
      });
    octokit.rest.repos
      .listForAuthenticatedUser()
      .then((res) => {
        setRepositories(res.data);
        setSelectedRepo(res.data[0]);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const hasNotFoundData = !user || repositories?.length < 1;

  return (
    <>
      {!patEmpty() && <ClearPatButton />}
      {error && <ErrorFooter error={error} />}
      {!error && (
        <FloatingRedirectCornerButton
          url={"commits/saved"}
          corner={"top-right"}
          label={"Saved Commits"}
          data={{ author: user?.login }}
        />
      )}
      <h1>Commit History</h1>
      <GitFilter
        repositories={repositories}
        setSelectedRepo={setSelectedRepo}
        setPageLimit={setPageLimit}
        fetchCommits={fetchCommits}
      />
      {hasNotFoundData && !error && <Spinner size="60" />}
      {!hasNotFoundData && commits && <ViewCommits commits={commits} />}
    </>
  );

  function fetchCommits() {
    const repo =
      typeof selectedRepo === "string"
        ? JSON.parse(selectedRepo)
        : selectedRepo;
    octokit.rest.repos
      .listCommits({
        owner: repo?.owner?.login,
        repo: repo?.id ? repo?.name : repo,
        author: user?.login,
        per_page: pageLimit || 500,
      })
      .then((res) => {
        setCommits(res.data);
      })
      .catch(console.error);
  }
}

function GitFilter({
  repositories,
  setSelectedRepo,
  setPageLimit,
  fetchCommits,
}) {
  return (
    <div className="git-filter">
      <GitSelect
        label="Repo"
        values={repositories}
        onChange={(e) => setSelectedRepo(e.target.value)}
      />
      <GitTextbox
        label="Search limit"
        onChange={(e) => setPageLimit(e.target.value || 500)}
      />
      <button
        onClick={() => {
          fetchCommits();
        }}
      >
        Search
      </button>
    </div>
  );
}

function GitTextbox({ label, onChange }) {
  return (
    <div className="git-filter-item">
      <label htmlFor={label}>{label}: </label>
      <input type="number" name={label} id={label} onChange={onChange} />
    </div>
  );
}

function GitSelect({ label, values, onChange }) {
  return (
    <div className="git-filter-item">
      <label htmlFor={label}>{label}: </label>

      <select name={label} id={label} onChange={onChange}>
        {values.map((item, index) => {
          return (
            <option key={index} value={JSON.stringify(item)}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
