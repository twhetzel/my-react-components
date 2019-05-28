import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, withRouter, Redirect } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import './SubmissionDetails.css'
import Test from '../Test';

// import PropTypes from 'prop-types'
// import { browserHistory } from 'react-router';

import TestPage from '../Test';

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


// const AddTripButton = props => {
//     return <button onClick={props.addTrip}>Add a trip</button>
// }

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
            <div>
                <Button onClick={this._onButtonClick}>Button</Button>
                {this.state.showComponent ?
                    <Test /> :
                    null
                }
            </div>
        );
    }







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

    // constructor(props) {
    //     super(props)
    //     this.state = { isEmptyState: true }
    // }
    // triggerAddTripState = () => {
    //     this.setState({
    //         ...this.state,
    //         isEmptyState: false,
    //         isAddTripState: true
    //     })
    // }

    // PageView() {
    //     if (this.state.isEmptyState) {
    //         return (
    //             <Container style={{ marginTop: 20 }}>
    //             <div>
    //                 SubmissionID: {this.props.submissionID}
    //             </div>
    //             <Button color="secondary" onClick={this.triggerAddTripState}>
    //                 Upload File
    //                 </Button>
    //         </Container>
    //         )
    //     }
    //     if (this.state.isAddTripState) {
    //         <Submissions />
    //     }

    // }


    // render() {
    //     console.log(this.state.isAddTripState)
    //     console.log(this.state.isEmptyState)

    //     if (this.state.isEmptyState) {
    //         return (
    //             // {this.state.isEmptyState && <AddTripButton addTrip={this.triggerAddTripState} />}
    //             <Container style={{ marginTop: 20 }}>
    //                 <div>
    //                     SubmissionID: {this.props.submissionID}
    //                 </div>
    //                 <Button color="secondary" onClick={this.triggerAddTripState}>
    //                     Upload File
    //                 </Button>
    //             </Container>
    //         )
    //     }

    //     if (this.state.isAddTripState) {
    //         return (
    //             <div>
    //                 {this.state.isAddTripState && <Submissions />}
    //             </div>
    //         )
    //     }
    // }
}


export default withRouter(SubmissionDetails);
