import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import APIClient from '../apiClient'
import { Container } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));

// const classes = useStyles();

function createData(pmid, title, file_valid_status, data_valid_status, curator) {
    return { pmid, title, file_valid_status, data_valid_status, curator };
}

const rows = [
    createData('PMID:1234', 'Super GWAS paper', 'In Progress', 'In Progress', 'Test Curator'),
    createData('PMID:5', 'Super GWAS paper', 'In Progress', 'In Progress', 'Test Curator'),
    createData('PMID:6', 'Super GWAS paper', 'In Progress', 'In Progress', 'Test Curator'),
    createData('PMID:7', 'Super GWAS paper', 'In Progress', 'In Progress', 'Test Curator'),
    createData('PMID:8', 'Super GWAS paper', 'In Progress', 'In Progress', 'Test Curator'),
    createData('PMID:8', 'Super GWAS paper', 'In Progress', 'In Progress', 'Test Curator'),
];


// function SubmissionsTable() {
class SubmissionTable extends React.Component {
    // const classes = useStyles();

    state = {
        value: 0,
        repos: [],
        kudos: []
    };

    async componentDidMount() {
        // const accessToken = await this.props.auth.getAccessToken()
        // this.apiClient = new APIClient(accessToken);
        this.apiClient = new APIClient();
        this.apiClient.getKudos().then((data) =>
            this.setState({ ...this.state, kudos: data })
        );
    }



    renderRepos = (repos) => {
        console.log(repos.allSubmissions)

        if (!repos) { return [] }

        if (repos.allSubmissions !== undefined) {
            return (
                // <Paper className={classes.root}>
                <Paper>
                    {/* <Table className={classes.table}> */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>PMID</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">File Validation Status</TableCell>
                                <TableCell align="center">Data Validation Status</TableCell>
                                <TableCell align="center">Curator</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {repos.allSubmissions.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.publication_id}
                                    </TableCell>
                                    <TableCell align="center">{row.publication_id}</TableCell>
                                    <TableCell align="center">{row.is_valid_format}</TableCell>
                                    <TableCell align="center">{row.is_valid_data}</TableCell>
                                    <TableCell align="center">{row.user_id}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            );
        }
    }

    render() {
        return (
            <Container>
                <div>
                    {this.renderRepos(this.state.kudos)}
                </div>
            </Container>
        );
    }
}

export default (SubmissionTable);
