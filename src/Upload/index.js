import React, { Component } from 'react'
import Dropzone from '../Dropzone'
import Progress from '../Progress'
import './upload.css'
import APIClient from '../apiClient'

const UPLOAD_TEMPLATE_URL = process.env.REACT_APP_TEMPLATE_UPLOAD_API;

class Upload extends Component {
    constructor(props) {
        super(props)

        // console.log('**SID: ', this.props.sub_id)
        console.log('**SID: ', localStorage.getItem("submissionID"))

        this.state = {
            files: [],
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false,
            fileStatus: false,
            SID: localStorage.getItem("submissionID"),
        };

        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.renderActions = this.renderActions.bind(this);
    }

    onFilesAdded(files) {
        this.setState(prevState => ({
            files: prevState.files.concat(files)
        }));
    }

    renderProgress(file) {
        const uploadProgress = this.state.uploadProgress[file.name];
        if (this.state.uploading || this.state.successfullUploaded) {
            return (
                <div className="ProgressWrapper">
                    <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
                    <img
                        className="CheckIcon"
                        alt="done"
                        src="/images/baseline-check_circle_outline-24px.svg"
                        style={{
                            opacity:
                                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                        }}
                    />
                </div>
            );
        }
    }

    renderActions() {
        if (this.state.successfullUploaded) {
            return (
                <button
                    onClick={() =>
                        this.setState({ files: [], successfullUploaded: false })
                    }>
                    Clear
                    </button>
            );
        } else {
            return (
                <button
                    disabled={this.state.files.length < 0 || this.state.uploading}
                    onClick={this.uploadFiles}>
                    Upload
                </button>
            );
        }
    }

    async uploadFiles() {
        this.setState({ uploadProgress: {}, uploading: true });
        const promises = [];
        this.state.files.forEach(file => {
            promises.push(this.sendRequest(file));
            console.log('** FN: ' + file);
        });

        try {
            // ORIG
            // await Promise.all(promises);

            await Promise.all(promises).then(values => {
                // Start processing files
                this.addFilename(values);
                this.initiateFileValidation(values);
            })

            this.setState({ successfullUploaded: true, uploading: false });

        } catch (e) {
            // Not Production ready! Do some error handling here instead...
            this.setState({ successfullUploaded: false, uploading: false });
            console.log('** File upload error: ' + e);
        }
    }

    sendRequest(file) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.upload.addEventListener("progress", event => {
                if (event.lengthComputable) {
                    const copy = { ...this.state.uploadProgress };
                    copy[file.name] = {
                        state: "pending",
                        percentage: (event.loaded / event.total) * 100
                    };
                    this.setState({ uploadProgress: copy });
                }
            });

            req.upload.addEventListener("load", event => {
                const copy = { ...this.state.uploadProgress };
                copy[file.name] = { state: "done", percentage: 100 };
                this.setState({ uploadProgress: copy });
                // resolve(req.response); // ORIGINAL
                resolve(file.name);
            });

            req.upload.addEventListener("error", event => {
                const copy = { ...this.state.uploadProgress };
                copy[file.name] = { state: "error", percentage: 0 };
                this.setState({ uploadProgress: copy });
                reject(req.response);
            });

            const formData = new FormData();
            // formData.append("file", file, file.name); // use with TW Flask /upload
            formData.append("templateFile", file);
            formData.append("fileName", file.name);
            formData.append("submissionId", this.state.SID);    //this.props.sub_id);

            console.log("** Upload Filename: ", file.name);

            // Post file to Node server.js 
            // req.open("POST", "http://localhost:8000/upload");

            // Post file to Flask GWAS Deposition Service app
            // req.open("POST", "http://localhost:5000/uploader");
            req.open("POST", UPLOAD_TEMPLATE_URL);
            req.send(formData);
        });
    }


    addFilename(file) {
        console.log('** Update submission with filename: ' + file);
        this.apiClient = new APIClient();
        this.apiClient.addFilename(file, this.state.SID)
    }

    initiateFileValidation(file) {
        console.log('** Files to process: ' + file);
        this.apiClient = new APIClient();
        this.apiClient.startFileValidation(file, this.state.SID).then((data) =>
            this.setState({ ...this.state, fileStatus: data })
        );
    }


    render() {
        return (
            <div className="Upload">
                <span className="Title">Upload Files</span>
                <div className="Content">
                    <div>
                        <Dropzone
                            onFilesAdded={this.onFilesAdded}
                            disabled={this.state.uploading || this.state.successfullUploaded}
                        />
                    </div>
                    <div className="Files">
                        {this.state.files.map(file => {
                            return (
                                <div key={file.name} className="Row">
                                    <span className="Filename">{file.name}</span>
                                    {this.renderProgress(file)}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="Actions">{this.renderActions()}</div>
            </div>
        );
    }
}

export default Upload
