import axios from 'axios';

const BASE_URI = process.env.REACT_APP_TS_BASE_URI;

const client = axios.create({
    baseURL: BASE_URI,
    json: true
});

const DOWNLOAD_TEMPLATE_URL = process.env.REACT_APP_TEMPLATE_DOWNLOAD_API_URL;


class APIClient {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    downloadTemplate() {
        axios.get(DOWNLOAD_TEMPLATE_URL,
            {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'template.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => console.log(error));
    }


    addFilename(file, submission_id) {
        return this.perform('post', '/updateSubmission/' + file + '/submission_id/' + submission_id);
    }

    startFileValidation(file, submission_id) {
        return this.perform('get', '/validation?submissionId=' + submission_id + '&fileName=' + file);
    }

    async perform(method, resource, data) {
        return client({
            method,
            url: resource,
            data,
            // Add after Authentication/Authorization enabled
            // headers: {
            //     Authorization: `Bearer ${this.accessToken}`
            // }
        }).then(resp => {
            return resp.data ? resp.data : [];
        })
    }
}

export default APIClient;
