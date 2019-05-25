import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function createData(pmid, title, file_valid_status, data_valid_status, curator) {
    return { pmid, title, file_valid_status, data_valid_status, curator };
}

const rows = [
    createData('PMID:1234', 'Super GWAS paper', 'In Progress', 'In Progress', 'Test Curator'),
    createData('PMID:1234', 'Super GWAS paper', 'In Progress', 'In Progress', 'Test Curator'),
    createData('PMID:1234', 'Super GWAS paper', 'In Progress', 'In Progress', 'Test Curator'),
    createData('PMID:1234', 'Super GWAS paper', 'In Progress', 'In Progress', 'Test Curator'),
    createData('PMID:1234', 'Super GWAS paper', 'In Progress', 'In Progress', 'Test Curator'),
    createData('PMID:1234', 'Super GWAS paper', 'In Progress', 'In Progress', 'Test Curator'),
];

function SubmissionsTable() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
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
                    {rows.map(row => (
                        <TableRow key={row.pmid}>
                            <TableCell component="th" scope="row">
                                {row.pmid}
                            </TableCell>
                            <TableCell align="center">{row.title}</TableCell>
                            <TableCell align="center">{row.file_valid_status}</TableCell>
                            <TableCell align="center">{row.data_valid_status}</TableCell>
                            <TableCell align="center">{row.curator}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default SubmissionsTable;
