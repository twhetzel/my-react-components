import React from 'react';
import './App.css';
import SearchBar from './SearchBar';
// import PrimarySearchAppBar from './PrimarySearchAppBar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Submissions from './Submissions';
import CreateSubmission from './CreateSubmission';
import SubmissionsTable from './SubmissionsTable';
import SubmissionDetails from './SubmissionDetails';

const SID = localStorage.getItem("submissionID");

function App() {
  return (
    <div>
      <Router>
        <SearchBar />
        <Route path="/" exact component={Submissions} />
        {/* <Route path="/" exact component={SubmissionsTable} /> */}
        <Route path="/create-submissions" component={CreateSubmission} />
        <Route path="/submission/:submissionId" render={({ match }) => <SubmissionsTable submissionID={SID} />} />
      </Router>
    </div>
    // <React.Fragment>
    //   <SearchBar />
    //   {/* <PrimarySearchAppBar /> */}
    //   <Submissions />
    // </React.Fragment>
  );
}

export default App;
