import axios from 'axios';

import FileSaver from 'file-saver';


const BASE_URI = 'http://localhost:5000';

const client = axios.create({
    baseURL: BASE_URI,
    json: true
});


const FileDownload = require('js-file-download');

const DOWNLOAD_TEMPLATE_URL = process.env.REACT_APP_TEMPLATE_DOWNLOAD_API_URL;


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

    downloadTemplate() {
        console.log(DOWNLOAD_TEMPLATE_URL);

        // var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
        // FileSaver.saveAs(blob, "hello world.txt");

        // https://stackoverflow.com/questions/49040247/download-binary-file-with-axios
        // axios.get("https://avatars1.githubusercontent.com/u/2167174?s=400&v=4",
        axios.get(DOWNLOAD_TEMPLATE_URL,
            {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Accept': 'application/pdf'
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                // link.setAttribute('download', 'demoTemplate.pdf'); //or any other extension
                link.setAttribute('download', 'template.xlsx'); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => console.log(error));




        // https://stackoverflow.com/questions/35206589/how-to-download-fetch-response-in-react-as-file
        // return ({ fetch }) => ({
        //     type: "text/plain;charset=utf-8",
        //     payload: {
        //         promise: fetch('https://avatars1.githubusercontent.com/u/2167174?s=400&v=4', {
        //             credentials: 'same-origin',
        //             method: 'post',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify(data)
        //         }).then(function (response) {
        //             return response.blob();
        //         }).then(function (blob) {
        //             FileSaver.saveAs(blob, 'demoTemplate.zip');
        //         })
        //     }
        // })

        // axios.get(`https://avatars1.githubusercontent.com/u/2167174?s=400&v=4`)
        //     .then(res => {
        //         return res.blob();
        //     }).then(blob => {
        //         const href = window.URL.createObjectURL(blob);
        //         const a = this.linkRef.current;
        //         a.download = 'demoTemplate.xls';
        //         a.href = href;
        //         a.click();
        //         a.href = '';
        //     }).catch(err => console.error(err));

        //https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
        // .then((response) => {
        //     FileDownload(response.data, 'demoTemplate.xls');
        // });

        // return this.perform('get', 'http://snoopy.ebi.ac.uk:9000/templates/');

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
