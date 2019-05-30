import React from 'react';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, withRouter, Redirect } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import './SubmissionDetails.css'
import UploadComponent from '../UploadComponent';
import Upload from '../Upload';

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
        // this._onButtonClick = this._onButtonClick.bind(this);
        // this.closeWindow = this.closeWindow.bind(this);
    }

    // _onButtonClick() {
    //     this.setState({
    //         showComponent: true,
    //     });
    // }

    // closeWindow() {
    //     this.setState({
    //         showComponent: false,
    //     });
    // }


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
            <Container style={{ marginTop: 24 }}>
                <div>
                    <div>
                        SubmissionID: {this.props.submissionID}
                    </div>
                    {/* <Button color="secondary" onClick={this._onButtonClick}>Select Upload Files</Button> */}
                    {/* {this.state.showComponent ? <UploadComponent /> : null} */}
                    {this.state.showComponent ? <Upload sub_id={this.props.submissionID} /> : null}
                    {/* <Button color="secondary" onClick={this.closeWindow}>Close File Upload Window</Button> */}
                    <div>{this.renderActions()}</div>
                </div>
            </Container>
        );
    }
}


export default SubmissionDetails;
