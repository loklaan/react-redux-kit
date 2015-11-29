import React                  from 'react';
import styles                 from '../styles/home-view.css';
import ProjectRepoList        from '../containers/ProjectRepoList';
import FindUserProjects        from '../containers/FindUserProjects';

export default class HomeView extends React.Component {
  render () {
    return (
      <div className={styles.container}>
        <h1>{`GitHub Repo Demo`}</h1>
        <FindUserProjects />
        <ProjectRepoList />
      </div>
    );
  }
}
