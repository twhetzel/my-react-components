import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import APIClient from '../apiClient'

import SubmissionsTable from '../SubmissionsTable';
import EnhancedTable from '../EnhancedTable';
import SubmissionDetails from '../SubmissionDetails';


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Submissions extends React.Component {
    state = {
        value: 0,
        repos: [],
        submissions: []
    };

    async componentDidMount() {
        // const accessToken = await this.props.auth.getAccessToken()
        // this.apiClient = new APIClient(accessToken);
        this.apiClient = new APIClient();
        this.apiClient.getSubmissions().then((data) =>
            this.setState({ ...this.state, submissions: data })
        );
    }

    handleTabChange = (event, value) => {
        this.setState({ value });
    };

    handleTabChangeIndex = index => {
        this.setState({ value: index });
    };

    resetRepos = repos => this.setState({ ...this.state, repos })

    isKudo = repo => this.state.submissions.find(r => r.id === repo.id)
    onKudo = (repo) => {
        this.updateBackend(repo);
    }

    updateBackend = (repo) => {
        if (this.isKudo(repo)) {
            this.apiClient.deleteKudo(repo);
        } else {
            this.apiClient.createKudo(repo);
        }
        this.updateState(repo);
    }

    updateState = (repo) => {
        if (this.isKudo(repo)) {
            this.setState({
                ...this.state,
                submissions: this.state.submissions.filter(r => r.id !== repo.id)
            })
        } else {
            this.setState({
                ...this.state,
                submissions: [repo, ...this.state.submissions]
            })
        }
    }

    onSearch = (event) => {
        const target = event.target;
        if (!target.value || target.length < 3) { return }
        if (event.which !== 13) { return }

        // githubClient
        //     .getJSONRepos(target.value)
        //     .then((response) => {
        //         target.blur();
        //         this.setState({ ...this.state, value: 1 });
        //         this.resetRepos(response.items);
        //     })
    }

    renderRepos = (repos) => {
        console.log(repos.allSubmissions)

        if (!repos) { return [] }

        // const data =[{"name":"test1"},{"name":"test2"}];
        // const data = Object.keys(repos)
        // console.log(data)

        if (repos.allSubmissions !== undefined) {
            // const listItems = repos.allSubmissions.map((d) => <li key={d.filename}>{d.filename}</li>);
            //     return (
            //         <div>
            //         {listItems }
            //         </div>
            //     )

            // const listItems = repos.allSubmissions.map((d) => key={id}>{filename});
            return (
                <React.Fragment>
                    {repos.allSubmissions.map(item => (
                        <Grid item xs={12} md={3} key={item.id}>
                            <React.Fragment key={item.id}>
                                <h2>{item.filename}</h2>
                                <h3>Submitted by: {item.user_id}</h3>
                            </React.Fragment>
                        </Grid>
                    ))}
                </React.Fragment>
            )

        }
    }

    render() {
        return (
            <div className={styles.root}>
                {/* <Tabs
                    value={this.state.value}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Submissions" />
                    <Tab label="Search" />
                </Tabs>

                <SwipeableViews
                    axis={'x-reverse'}
                    index={this.state.value}
                    onChangeIndex={this.handleTabChangeIndex}
                >
                    <Grid container spacing={16} style={{ padding: '20px 0' }}>
                        {this.renderRepos(this.state.submissions)}
                    </Grid>
                    <Grid container spacing={16} style={{ padding: '20px 0' }}>
                        {this.renderRepos(this.state.repos)}
                    </Grid>
                </SwipeableViews> */}

                <SubmissionsTable />

                {/* <EnhancedTable /> */}
            </div>
        );
    }
}

export default withStyles(styles)(Submissions);
