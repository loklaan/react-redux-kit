import React  from 'react';
import Paper  from 'material-ui/lib/paper';
import AppBar from 'material-ui/lib/app-bar';
import Tiles  from '../../components/Tiles';

export default class CoreLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.element
  };

  render () {
    return (
      <div style={{
        display: 'flex',
        height: '100vh',
        width: '100vw'
      }}>
        <Tiles style={{
          display: 'block',
          position: 'absolute',
          top: '0',
          zIndex: '-1',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }} />

        <Paper
          style={{
            margin: '1em',
            display: 'flex',
            flex: '1 0 auto',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <AppBar title='App' />
          <div style={{margin: '2em 0', overflow: 'scroll'}}>
            {this.props.children}
          </div>
        </Paper>
      </div>
    );
  }
}
