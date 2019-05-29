import React, {Component} from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


//import {Redirect} from 'react-router-dom'

const drawerWidth = 240;

const styles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  });

class Header extends Component{
    
    state = {
        open: false,
        mainContent: this.props.menuPages[0]
      };
    
      handleDrawerOpen = () => {
        this.setState({ open: true });
      }
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      }

      sideMenu = (e) =>{
        let menu = e.currentTarget.dataset.list_item;
        //console.log(e.currentTarget.dataset.list_item)
        switch(menu){
            case this.props.menu[0]:
                this.setState({
                    mainContent: this.props.menuPages[0]
                })
                //console.log(this.props.menu[0])
                break;
            case this.props.menu[1]:
                this.setState({
                    mainContent: this.props.menuPages[1]
                })
                //console.log(this.props.menu[1])
                break;
            case this.props.menu[2]:
                this.setState({
                    mainContent: this.props.menuPages[2]
                })
                //console.log(this.props.menu[2])
                break;
            case this.props.menu[3]:
                this.setState({
                    mainContent: this.props.menuPages[3]
                })
                //console.log(this.props.menu[3])
                break;
            case this.props.submenu[0]:
                this.setState({
                    mainContent: this.props.submenuPages[0]
                })
                //console.log(this.props.menu[3])
                break;
            case this.props.submenu[1]:
                this.setState({
                    mainContent: this.props.submenuPages[1]
                })
                //console.log(this.props.menu[3])
                break;
            case this.props.submenu[2]:
                this.setState({
                    mainContent: this.props.submenuPages[2]
                })
                //console.log(this.props.menu[3])
                break;

            default:
                this.setState({mainContent: this.props.menu[0]})
                //console.log('Default menu: ',menu)
                break;
        }
      }

    render(){
        const { classes, theme } = this.props;
        const { open } = this.state;

        return(
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                            >
                            <MenuIcon />
                        </IconButton>
                        {this.props.title}
                    </Toolbar>
                    
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >

                    <div className={classes.drawerHeader}>
                        <h2>DOMICILIARY</h2>
                        <IconButton onClick={this.handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {this.props.menu.map((text, index) => (
                        <ListItem button key={text} data-list_item={text} onClick={this.sideMenu}>
                            <ListItemIcon>
                            { 
                              (() => { //console.log(text)
                                switch (text) {
                                  case 'Clients':   return <i className="material-icons">person</i>;
                                  case 'Carers': return <i className="material-icons">person_outline</i>;
                                  case 'Supervisors':  return <i className="material-icons">supervised_user_circle</i>;
                                  case 'Managers':      return <i className="material-icons">supervisor_account</i>;
                                  case 'Reports':      return <i className="material-icons">file_copy</i>;
                                  case 'Monitoring':      return <i className="material-icons">timelapse</i>;
                                  case 'Schedules':      return <i className="material-icons">schedule</i>;
                                  default: return <i className="material-icons">work</i>;
                                }
                              })()
                            }
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {this.props.submenu.map((text, index) => (
                        <ListItem button key={text} data-list_item={text} onClick={this.sideMenu}>
                            {
                              (() => { 
                                switch (text) {
                                  case 'Training':   return <i className="material-icons">class</i>;
                                  case 'Schedules':  return <i className="material-icons">schedule</i>;
                                  case 'Monitoring':      return <i className="material-icons">timelapse</i>;
                                  case 'Profile': return <i className="material-icons">account_circle</i>;
                                  case 'Logout':  return <i className="material-icons">logout</i>;
                                  default: return <i className="material-icons">work</i>;
                                }
                              })()
                            }
                            <ListItemText primary={text} />
                        </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}>

                    <div className={classes.drawerHeader} />
                    {this.state.mainContent}                 
                    
                </main>
            </div>            
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

export default withStyles(styles, { withTheme: true })(Header)