import React                  from 'react';
import { Link }               from 'react-router';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import servicesActions        from '../actions/services';
import CircularProgress       from 'material-ui/lib/circular-progress';
import Paper                  from 'material-ui/lib/paper';
import Badge                  from 'material-ui/lib/badge';
import FontIcon               from 'material-ui/lib/font-icon';
import Avatar                 from 'material-ui/lib/avatar';
import styles                 from '../styles/home-view.css';

const mapStateToProps = (state) => {
  return {
    repo: state.services.github.repo.data
  };
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...servicesActions.github
  }, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class RepoView extends React.Component {
  static propTypes = {
    repo: React.PropTypes.object,
    actions: React.PropTypes.object
  };

  componentWillMount () {
    this.props.actions.repo({userId: this.props.params.userId, repoId: this.props.params.repoId});
  }

  renderLoader () {
    return <CircularProgress mode="indeterminate" color={"red"} size={2} />
  }

  renderRepoHeader () {
    return (
      <div>
        <Avatar src={this.props.repo.owner.avatar_url} size={200} />
        <Badge badgeContent={this.props.repo.stargazers_count} primary={true}>
          {'Stars'}
        </Badge>
        <Badge badgeContent={this.props.repo.open_issues_count} primary={true}>
          {'Issues'}
        </Badge>
        <Badge badgeContent={this.props.repo.forks_count} primary={true}>
          {'Forks'}
        </Badge>
      </div>
    );
  }

  renderRepoFooter () {
    return (
      <div>
        <h1 style={{textTransform: 'uppercase'}}>{this.props.repo.full_name}</h1>
        <p>{this.props.repo.description}</p>
      </div>
    );
  }

  render () {
    const isEmptyRepo = Object.keys(this.props.repo).length === 0;

    return (
      <div className={styles.container}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end'
          }}
        >
          {isEmptyRepo ? this.renderLoader() : this.renderRepoHeader()}
        </div>
        {isEmptyRepo ? null : this.renderRepoFooter()}
      </div>
    );
  }
}
