import axios from 'axios';

const BASE_URI = 'http://localhost:5000';

const client = axios.create({
    baseURL: BASE_URI,
    json: true
});

class APIClient {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    //  createKudo(repo) {
    //    return this.perform('post', '/submissions', repo);
    //  }

    //  deleteKudo(repo) {
    //    return this.perform('delete', `/submissions/${repo.id}`);
    //  }

    getSubmissions() {
        //    return this.perform('get', '/kudos');
        return this.perform('get', '/submissions');
    }

    getSubmission(submission_id) {
        return this.perform('get', '/submission/' + submission_id);
    }

    addFilename(file, submission_id) {
        return this.perform('post', '/updateSubmission/' + file + '/submission_id/' + submission_id);
    }

    startFileValidation(file, submission_id) {
        return this.perform('post', '/startFileValidation/' + file + '/submission_id/' + submission_id);
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
