import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Upload from '../Upload';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import APIClientSubmissions from '../apiClientSubmissions';

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

class SubmissionDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showComponent: false,
            repos: [],
            submission: [],
            SID: localStorage.getItem("submissionID"),
        };
    }

    async componentDidMount() {
        // const accessToken = await this.props.auth.getAccessToken()
        // this.apiClient = new APIClient(accessToken);
        this.apiClient = new APIClientSubmissions();
        // this.apiClient.getSubmission(this.props.submissionID).then((data) =>
        //     this.setState({ ...this.state, submission: data })
        // );
        this.apiClient.getSubmission(this.state.SID).then((data) =>
            this.setState({ ...this.state, submission: data })
        );
    }

    renderRepos = (repos) => {
        console.log(repos.submission)

        if (!repos) { return [] }

        if (repos.submission !== undefined) {
            return (
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
                    {/* SubmissionID: {this.props.submissionID} */}
                    SubmissionID:  {this.state.SID}
                </div>

                <div>
                    Show publication details here...
                </div>

                <div>
                    {this.renderRepos(this.state.submission)}
                </div>

                {this.state.showComponent ? <Upload sub_id={this.props.submissionID} /> : null}
                <div style={action}>{this.renderActions()}</div>
            </div>
        );
    }
}


export default withStyles(styles)(SubmissionDetails);
