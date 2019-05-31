import React from 'react';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, withRouter, Redirect } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import './SubmissionDetails.css'
import UploadComponent from '../UploadComponent';
import Upload from '../Upload';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import APIClient from '../apiClient';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 24
    },
    table: {
        minWidth: 650,
    },
});

const action = {
    marginTop: '20px'
};

// function createData(pmid, title, is_file_valid, is_data_valid, curator) {
//     return { pmid, title, is_file_valid, is_data_valid, curator };
// }

// const rows = [
//     createData('PMID:1234', 'GWAS paper ...', 'Not started', 'Not started', 'Test Curator')
// ]

class SubmissionDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showComponent: false,
            repos: [],
            submission: [],
        };
    }

    async componentDidMount() {
        // const accessToken = await this.props.auth.getAccessToken()
        // this.apiClient = new APIClient(accessToken);
        this.apiClient = new APIClient();
        this.apiClient.getSubmission(this.props.submissionID).then((data) =>
            this.setState({ ...this.state, submission: data })
        );
    }

    renderRepos = (repos) => {
        console.log(repos.submission)

        if (!repos) { return [] }

        if (repos.submission !== undefined) {
            return (
                // <Paper className={styles.root}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>PMID</TableCell>
                            <TableCell>Filename</TableCell>
                            <TableCell>File Validation Status</TableCell>
                            <TableCell>Data Validation Status</TableCell>
                            <TableCell>Curator</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {repos.submission.map(row => (
                            <TableRow key={row.id} data-item={row.id} onClick={this.showSubmissionDetails}>
                                <TableCell component="th" scope="row">{row.publication_id}</TableCell>
                                <TableCell data-title="ID">{row.filename}</TableCell>
                                <TableCell data-title="IVF">{row.is_valid_format.toString()}</TableCell>
                                <TableCell data-title="IVD">{row.is_valid_data.toString()}</TableCell>
                                <TableCell data-title="UserID">{row.user_id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                // </Paper>
            );
        }
    }




    renderActions() {
        if (this.state.showComponent) {
            return (
                <button
                    onClick={() =>
                        this.setState({ showComponent: false })
                    }>
                    Close Window
                    </button>
            );
        } else {
            return (
                <button
                    onClick={() =>
                        this.setState({ showComponent: true })
                    }>
                    Select Upload Files
                </button>
            );
        }
    }


    render() {
        return (
            <div className={styles.root}>
                <div>
                    SubmissionID: {this.props.submissionID}
                </div>

                <div>
                    {this.renderRepos(this.state.submission)}
                </div>

                {/* <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>PMID</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">File Validatation Status</TableCell>
                            <TableCell align="right">Data Validation Status</TableCell>
                            <TableCell align="right">Curator</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.pmid}>
                                <TableCell component="th" scope="row">
                                    {row.pmid}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.is_file_valid}</TableCell>
                                <TableCell align="right">{row.is_data_valid}</TableCell>
                                <TableCell align="right">{row.curator}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> */}

                {this.state.showComponent ? <Upload sub_id={this.props.submissionID} /> : null}
                <div style={action}>{this.renderActions()}</div>


                {/* <div>
                    <div>
                        SubmissionID: {this.props.submissionID}
                    </div>
                    <div>Another div field</div>
                    {this.state.showComponent ? <Upload sub_id={this.props.submissionID} /> : null}
                    <div>{this.renderActions()}</div>
                </div> */}
            </div>
        );
    }
}


export default withStyles(styles)(SubmissionDetails);
