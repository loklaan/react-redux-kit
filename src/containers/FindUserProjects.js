import React, { PropTypes }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import githubActions          from '../actions/github';
import servicesActions        from '../actions/services';
import RaisedButton           from 'material-ui/lib/raised-button';
import TextField              from 'material-ui/lib/text-field';

const mapStateToProps = (state) => ({
  userName: state.github.name
});
const mapActionDispatchToProps = (dispatch) => bindActionCreators({
  setName: githubActions.setName,
  getUserRepos: servicesActions.github.userRepos
}, dispatch);

@connect(mapStateToProps, mapActionDispatchToProps)
export default class FindUserProjects extends React.Component {
  static propTypes = {
    // NOTE: Usually, something like the state of a field doesn't need to go into the Redux store,
    // and instead cna reside in it's component. This was just done in a way to show redux dispatches.
    userName: PropTypes.string,
    setName: PropTypes.func,
    getUserRepos: PropTypes.func
  };

  constructor () {
    super();

    this.state = {
      nameError: null
    };
  }

  onUserFieldChange (ev) {
    const input = ev.target.value;

    if (input) {
      this.props.setName(input);

      // Clear the field errors on new input
      if (this.state.nameError) {
        this.setState({nameError: null});
      }
    }
  }

  onFindReposClick () {
    if (this.props.userName.length > 0) {
      this.props.getUserRepos({userId: this.props.userName});
    } else {
      this.setState({nameError: 'Must provide username'});
    }
  }

  render () {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <RaisedButton
          label={`Find the user's GitHub Repos`}
          onClick={() => this.onFindReposClick()} />
        <TextField
          hintText='GitHub Username'
          errorText={this.state.nameError}
          onChange={(ev) => this.onUserFieldChange(ev)}
        />
      </div>
    );
  }
}
