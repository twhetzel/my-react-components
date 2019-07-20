import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
// import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '@material-ui/core/Typography';
// import AppFooter from './modules/views/AppFooter';
// import AppAppBar from './modules/views/AppAppBar';
import SearchBar from '../SearchBar';
import AppForm from '../AppForm';
// import { email, required } from './modules/form/validation';
// import RFTextField from './modules/form/RFTextField';
// import FormButton from './modules/form/FormButton';
// import FormFeedback from './modules/form/FormFeedback';
// import compose from 'docs/src/modules/utils/compose';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import APIClientSubmissions from '../apiClientSubmissions';
import axios from 'axios';

const styles = theme => ({
    form: {
        marginTop: theme.spacing(6),
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    feedback: {
        marginTop: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    menu: {
        width: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
});

const currencies = [
    {
        value: 'Annalisa Buniello',
        label: 'Annalisa Buniello',
    },
    {
        value: 'EUR',
        label: 'E',
    },
    {
        value: 'BTC',
        label: 'B',
    },
    {
        value: 'JPY',
        label: 'J',
    },
];


class CreateSubmission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pmid: '',
            pub_title: '',
            curator: '',
            // currency: 'EUR',
            age: '',
            age2: '',
            slct: ''
        };

        // this.handleChange = this.handleChange.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleChange(event) {
    //     this.setState({ value: event.target.value });
    // }

    // handleInputChange(event) {
    //     const target = event.target;
    //     // const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const value = target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     });
    //     console.log("** STATE: ", this.state.pmid, this.state.pub_title)
    // }

    // handleSubmit(event) {
    //     alert('Data was submitted -- PMID: ' + this.state.pmid + ' Title: ' + this.state.pub_title);
    //     event.preventDefault();
    // }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const submission_data = new FormData(form);

        for (let name of submission_data.keys()) {
            const input = form.elements[name];
            const parserName = input.dataset.parse;

            if (parserName) {
                // const parser = inputParsers[parserName];
                // const parsedValue = parser(data.get(name));
                // data.set(name, parsedValue);
            }
            submission_data.set(name, submission_data.get(name));
        }

        console.log("** Data: " + submission_data.get('pmid') + ' -- ' + submission_data.get('pub_title'));

        axios.post('http://localhost:5000/createSubmissions',
            submission_data).then(res => {
                console.log(res.data);
            })
    }

    render() {
        return (
            <AppForm>
                {/* <div>Create Submission</div> */}
                <Typography variant="h5" gutterBottom marked="center" align="center">
                    Create Submission
                </Typography>

                <form onSubmit={this.handleSubmit}>
                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="standard-name"
                                name="pmid"
                                label="PubMedID"
                                className={styles.textField}
                                value={this.state.value}
                                onChange={this.handleInputChange}
                                margin="normal"
                            />
                            {/* <label>
                                PMID:
                        <input name="pmid" type="text" value={this.state.value} onChange={this.handleInputChange} />
                            </label> */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="standard-name"
                                name="pub_title"
                                label="Publication title"
                                className={styles.textField}
                                value={this.state.value}
                                onChange={this.handleInputChange}
                                margin="normal"
                            />
                            {/* <label>
                                Publication Title:
                        <input name="pub_title" type="text" value={this.state.value} onChange={this.handleInputChange} />
                            </label> */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* TODO: Chnage to use Material-UI Select Component */}
                            <label>
                                Curator name:
                        <select name='curator' value={this.state.value} onChange={this.handleInputChange}>
                                    <option value="Annalisa Buniello">Annalisa Buniello</option>
                                    <option value="Aoife McMahon">Aoife McMahon</option>
                                    <option value="Elliot Solliot">Elliot Solliot</option>
                                    <option value="Jackie MacArthur">Jackie MacArthur</option>
                                    <option value="Joannella Morales">Joannella Morales</option>
                                    <option value="Laura Harris">Laura Harris</option>
                                    <option value="Lizzy Lewis">Lizzy Lewis</option>
                                    <option value="Maria Cerezo">Maria Cerezo</option>
                                    <option value="Peggy Hall">Peggy Hall</option>
                                    <option value="Test User">Test User</option>
                                </select>
                            </label>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button type="submit" variant="contained" color="secondary">Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </AppForm>
        );
    }
}

CreateSubmission.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default CreateSubmission;
