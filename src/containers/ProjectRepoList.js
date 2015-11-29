import React, { PropTypes }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { updatePath }         from 'redux-simple-router';
import map                    from 'lodash/collection/map';
import List                   from 'material-ui/lib/lists/list';
import ProjectRepo            from '../components/UserRepo';

const mapStateToProps = (state) => ({
  repos: state.services.github.userRepos.data
});
const mapActionDispatchToProps = (dispatch) => bindActionCreators({
  gotoRepo: (name, id) => updatePath(`/repos/${name}/${id}`)
}, dispatch);

@connect(mapStateToProps, mapActionDispatchToProps)
export default class ProjectRepoList extends React.Component {
  static propTypes = {
    repos: PropTypes.arrayOf(PropTypes.object),
    gotoRepo: PropTypes.func
  };

  render () {
    const { repos } = this.props;

    return (
      <List>
        {map(repos, repo => (
          <ProjectRepo
            key={repo.id}
            name={repo.fullName}
            description={repo.description}
            imageUrl={repo.owner.avatar}
            onClick={() => this.props.gotoRepo(repo.owner.name, repo.name)}
          />
        ))}
      </List>
    );
  }
}
