import React from 'react';
import Container from '@material-ui/core/Container';



class SubmissionDetails extends React.Component {
    render() {
        return (
            <Container style={{ marginTop: 20 }}>
                <div>
                    SubmissionID: {this.props.submissionID}
                </div>
            </Container>
        );
    }
}

export default SubmissionDetails;
