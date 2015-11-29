import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { updatePath }         from 'redux-simple-router';
import map                    from 'lodash/collection/map';
import { Link }               from 'react-router';
import githubActions          from '../actions/github';
import servicesActions        from '../actions/services';
import styles                 from '../styles/home-view.css';
import RaisedButton           from 'material-ui/lib/raised-button';
import TextField              from 'material-ui/lib/text-field';
import List                   from 'material-ui/lib/lists/list';
import ListItem               from 'material-ui/lib/lists/list-item';
import Avatar                 from 'material-ui/lib/avatar';

const mapStateToProps = (state) => {
  return {
    repos: state.services.github.userRepos.data,
    userName: state.github.name
  };
};
const mapActionDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...servicesActions.github,
    ...githubActions,
    gotoRepo: (name, id) => updatePath(`/repos/${name}/${id}`)
  }, dispatch)
});

@connect(mapStateToProps, mapActionDispatchToProps)
export default class HomeView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    counter: React.PropTypes.number,
    repos: React.PropTypes.array
  };

  constructor () {
    super();

    this.state = {
      nameError: null,
      name: null
    };
  }

  render () {
    return (
      <div className={styles.container}>
        <h1>{`GitHub Repo Demo`}</h1>
        <RaisedButton
          label='Show the GitHub Repos'
          onClick={() => this.onShowReposClick()} />
        <TextField
          hintText='GitHub Username'
          errorText={this.state.nameError}
          onChange={(ev) => ev.target.value && this.props.actions.setName(ev.target.value) && this.setState({nameError: null})}
        />
        <List>
          {map(this.props.repos, repo => {
            return (
              <ListItem
                key={repo.id}
                leftAvatar={<Avatar src={repo.owner.avatar} />}
                primaryText={repo.fullName}
                secondaryText={repo.owner.description}
                onClick={() => this.props.actions.gotoRepo(repo.owner.name, repo.name)}
              />
            );
          })}
        </List>
      </div>
    );
  }

  onShowReposClick() {
    if (this.props.userName.length > 0) {
      this.props.actions.userRepos({userId: this.props.userName})
    } else {
      this.setState({nameError: 'Must provide username'});
    }
  }
}
