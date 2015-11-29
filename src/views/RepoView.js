import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import servicesActions        from '../actions/services';
import CircularProgress       from 'material-ui/lib/circular-progress';
import ProjectRepo            from '../components/ProjectRepo';

const mapStateToProps = (state) => ({
  repo: state.services.github.repo.data
});
const mapActionDispatchToProps = (dispatch) => bindActionCreators({
  getRepo: servicesActions.github.repo
}, dispatch);

@connect(mapStateToProps, mapActionDispatchToProps)
export default class RepoView extends React.Component {
  static propTypes = {
    repo: React.PropTypes.object,
    getRepo: React.PropTypes.func
  };

  componentWillMount () {
    this.props.getRepo({userId: this.props.params.userId, repoId: this.props.params.repoId});
  }

  render () {
    const isEmptyRepo = Object.keys(this.props.repo).length === 0;

    if (isEmptyRepo) {
      return <CircularProgress mode="indeterminate" color={"red"} size={2} />;
    } else {
      return (
        <ProjectRepo
          name={this.props.repo.full_name}
          description={this.props.repo.description}
          stars={this.props.repo.stargazers_count}
          issues={this.props.repo.open_issues_count}
          forks={this.props.repo.forks_count}
          imageUrl={this.props.repo.owner.avatar_url}
        />
      );
    }
  }
}
