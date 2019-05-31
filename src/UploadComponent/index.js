import React from 'react';
import './uploadComponent.css';
import Upload from '../Upload';

class UploadComponent extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="Card">
                    <Upload />
                </div>
            </div>
        )
    }
}

export default UploadComponent
