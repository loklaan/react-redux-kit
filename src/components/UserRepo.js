import React, { PropTypes } from 'react';
import ListItem             from 'material-ui/lib/lists/list-item';
import Avatar               from 'material-ui/lib/avatar';

const ProjectRepo = ({
  id,
  name,
  description,
  imageUrl,
  onClick
}) => (
  <ListItem
    key={id}
    leftAvatar={<Avatar src={imageUrl} />}
    primaryText={name}
    secondaryText={description}
    onClick={onClick}
  />
);

ProjectRepo.propTypes = {
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func
};

export default ProjectRepo;
