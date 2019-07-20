import axios from 'axios';

// const BASE_URI = process.env.REACT_APP_GDS_BASE_URI;
const BASE_URI = process.env.REACT_APP_LOCAL_BASE_URI;

const client = axios.create({
    baseURL: BASE_URI,
    json: true
});


class APIClientSubmissions {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    // createSubmissions(data) {
    //     console.log("** Data to submit: " + data.get('pmid') + " -- " + data.get('pub_title'));
    //     return this.perform('post', '/createSubmissions?pmid=' + data.get('pmid') + '&pub_title=' + data.get('pub_title'));
    // }

    getSubmissions() {
        return this.perform('get', '/submissions');
    }

    getSubmission(submission_id) {
        return this.perform('get', '/submission/' + submission_id);
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

export default APIClientSubmissions;
