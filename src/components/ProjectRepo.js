import React  from 'react';
import Badge  from 'material-ui/lib/badge';
import Avatar from 'material-ui/lib/avatar';
import styles from '../styles/home-view.css';

const ProjectRepo = ({
  name,
  description,
  stars,
  issues,
  forks,
  imageUrl
}) => (
  <div
    className={styles.container}
    style={{
      display: 'flex',
      alignItems: 'flex-end'
    }}
  >
    <div>
      <Avatar src={imageUrl} size={200} />
      <Badge badgeContent={stars} primary>
        {'Stars'}
      </Badge>
      <Badge badgeContent={issues} primary>
        {'Issues'}
      </Badge>
      <Badge badgeContent={forks} primary>
        {'Forks'}
      </Badge>
    </div>
    <div>
      <h1 style={{textTransform: 'uppercase'}}>{name}</h1>
      <p>{description}</p>
    </div>
  </div>
);

export default ProjectRepo;
