import { useState } from 'react';
import { useProjects } from './projectHooks';
import ProjectList from './ProjectList';

function ProjectsPage() {
  const {
    data,
    isPending,
    error,
    isError,
    isFetching,
    page,
    setPage,
    setName
  } = useProjects();

  const [nameInput, setNameInput] = useState("");

  const handleSearch = () => {
    setName(nameInput); // Trigger query
  };

  return (
    <>
      <h1>Projects</h1>
      <div className="row">
        <div className="col-sm-4">
          <input type='text' value={nameInput} onChange={(e) => setNameInput(e.target.value)}  />
          <button
            className="primary"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      {data ? (
        <>
          {isFetching && !isPending && (
            <span className="toast">Refreshing...</span>
          )}
          <ProjectList projects={data} />
          <div className="row">
            <div className="col-sm-4">Current page: {page + 1}</div>
            <div className="col-sm-4">
              <div className="button-group right">
                <button
                  className="button "
                  onClick={() => setPage((oldPage) => oldPage - 1)}
                  disabled={page === 0}
                >
                  Previous
                </button>
                <button
                  className="button"
                  onClick={() => {
                      setPage((oldPage) => oldPage + 1);
                  }}
                  disabled={data.length != 10}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : isPending ? (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      ) : isError && error instanceof Error ? (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error.message}
              </p>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ProjectsPage;