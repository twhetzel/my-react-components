import React from 'react';
import Container from '@material-ui/core/Container';



class SubmissionDetails extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (
            <Container style={{ marginTop: 20 }}>
                <div>
                    "Hello!"
                    {this.props.submissionID}
                </div>
            </Container>
        );
    }
}

export default SubmissionDetails;
