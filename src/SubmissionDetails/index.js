import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, withRouter, Redirect } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import './SubmissionDetails.css'
import Submissions from '../Submissions';

// import PropTypes from 'prop-types'
// import { browserHistory } from 'react-router';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary.main
    },
    // downloadButton: {
    //     background: theme.palette.color.secondary,
    //     marginRight: theme.spacing(2),
    // },
});


const AddTripButton = props => {
    return <button onClick={props.addTrip}>Add a trip</button>
}

class SubmissionDetails extends React.Component {
    // constructor(props) {
    //     super(props)

    //     this.routeChange = this.routeChange.bind(this);
    //     this.state = { isButtonClicked: false }
    // }

    // routeChange() {
    //     let path = `/fileUpload`;
    //     this.props.history.push(path);
    // }

    // triggerAddTripState = () => {
    //     this.setState({
    //         ...this.state,
    //         isButtonClicked: true
    //     })
    //     console.log(this.isButtonClicked)
    // }

    constructor(props) {
        super(props)
        this.state = { isEmptyState: true }
    }
    triggerAddTripState = () => {
        this.setState({
            ...this.state,
            isEmptyState: false,
            isAddTripState: true
        })
    }

    render() {
        return (
            <Container style={{ marginTop: 20 }}>
                <div>
                    SubmissionID: {this.props.submissionID}
                </div>
                <Button color="secondary" onClick={this.triggerAddTripState}>
                    Upload File
                    </Button>
            </Container>
        )
    }
}


export default withRouter(SubmissionDetails);
