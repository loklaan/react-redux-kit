import React, { PropTypes } from 'react';
import ListItem             from 'material-ui/lib/lists/list-item';
import Avatar               from 'material-ui/lib/avatar';

const ProjectRepo = ({
  name,
  description,
  imageUrl,
  onClick
}) => (
  <ListItem
    leftAvatar={<Avatar src={imageUrl} />}
    primaryText={name}
    secondaryText={description}
    onClick={onClick}
  />
);

ProjectRepo.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func
};

export default ProjectRepo;
