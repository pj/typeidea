import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ActionList from './ActionList';
import ActionCreator from './ActionCreator';
import {ALL_DATA, ACTIONS_FRAGMENT} from './Fragments';

console.log(ACTIONS_FRAGMENT);
const GET_LOG = gql`
{
  ${ALL_DATA}
}
${ACTIONS_FRAGMENT}
`;

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
      display: 'flex',
    },
  appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
  drawerPaper: {
      width: drawerWidth,
    },
  content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  toolbar: theme.mixins.toolbar,
}));

const App = () => {
  const classes = useStyles();
  const { loading, data } = useQuery(GET_LOG);
  if (loading) {
    return null;
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            VRPC editing
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ActionCreator types={data.types} services={data.services}/>
        <ActionList actions={data.log} />
      </main>
    </div>
  );
}

export default App;
