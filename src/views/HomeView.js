import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { updatePath }         from 'redux-simple-router';
import map                    from 'lodash/collection/map';
import { Link }               from 'react-router';
import counterActions         from '../actions/counter';
import githubActions          from '../actions/github';
import servicesActions        from '../actions/services';
import styles                 from '../styles/home-view.css';
import RaisedButton           from 'material-ui/lib/raised-button';
import TextField              from 'material-ui/lib/text-field';
import List                   from 'material-ui/lib/lists/list';
import ListItem               from 'material-ui/lib/lists/list-item';
import Avatar                 from 'material-ui/lib/avatar';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => {
  return {
    counter: state.counter,
    routerState: state.router,
    repos: state.services.github.userRepos.data
  };
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...counterActions,
    ...servicesActions.github,
    ...githubActions,
    gotoRepo: (id) => updatePath(`/repo/${id}`)
  }, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
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

  renderCounter () {
    return (
      <div>
        <h2>Sample Counter: {this.props.counter}</h2>
        <RaisedButton
          label='Increment'
          onClick={this.props.actions.increment} />
      </div>
    );
  }

  render () {
    return (
      <div className={styles.container}>
        <h1>Welcome to the Hitch Kit</h1>
        <hr />
        <TextField
          hintText='GitHub Username'
          errorText={this.state.nameError}
          onChange={(ev) => this.setState({name: ev.target.value})}
        />
        <hr />
        <RaisedButton
          label='Show the GitHub Repos'
          onClick={() => this.props.actions.userRepos({userId: this.state.name})} />
        <hr />
        <List>
          {map(this.props.repos, repo => {
            return (
              <ListItem
                key={repo.id}
                leftAvatar={<Avatar src={repo.user.avatar} />}
                primaryText={repo.name}
                secondaryText={repo.user.description}
                onClick={() => this.props.actions.gotoRepo(repo.id)}
              />
            );
          })}
        </List>
        <hr />
        <Link to='/about'>Go To About View</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
