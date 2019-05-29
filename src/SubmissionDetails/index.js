import React from 'react';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, withRouter, Redirect } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import './SubmissionDetails.css'
import UploadComponent from '../UploadComponent';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    // downloadButton: {
    //     background: theme.palette.secondary.light,
    //     marginRight: theme.spacing(2),
    // },
});

class SubmissionDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showComponent: false,
        };
        this._onButtonClick = this._onButtonClick.bind(this);
    }

    _onButtonClick() {
        this.setState({
            showComponent: true,
        });
    }

    render() {
        return (
            <Container style={{ marginTop: 24 }}>
                <div>
                    <div>
                        SubmissionID: {this.props.submissionID}
                    </div>
                    <Button color="secondary" onClick={this._onButtonClick}>Select Upload Files</Button>
                    {this.state.showComponent ? <UploadComponent /> : null}
                </div>
            </Container>
        );
    }
}


export default SubmissionDetails;
