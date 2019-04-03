import React from 'react';
import Paper from '@material-ui/core/es/Paper/Paper';
import Table from '@material-ui/core/es/Table/Table';
import TableHead from '@material-ui/core/es/TableHead/TableHead';
import TableRow from '@material-ui/core/es/TableRow/TableRow';
import TableCell from '@material-ui/core/es/TableCell/TableCell';
import TableBody from '@material-ui/core/es/TableBody/TableBody';
import withStyles from '@material-ui/core/es/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import Modal from '@material-ui/core/es/Modal/Modal';
import TextField from '@material-ui/core/es/TextField/TextField';
import Button from '@material-ui/core/es/Button/Button';
import settings from '../local_settings';
import Layout from "../containers/Layout";
import Cookies from 'js-cookie';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export const getAccessToken = () => Cookies.get('access_token');
export const getUser = () => Cookies.get('user');
export const isAuthenticated = () => !!getAccessToken();

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50 * 1.5,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class Requests extends  React.Component{
  constructor(props) {
    super(props);
    this.state = {
      'modalAction': '',
      'userId': JSON.parse(getUser()).id,
      'role': JSON.parse(getUser()).role,
      'openDialog': false,
      'requestStatus': 'open',
      'requestId': 0,
      'requestDetails': '',
      'openProcessRequest': false,
    }
  }

  state = {
    open: false,
    requests: [],
    details: '',
    request: {}
  };

  componentDidMount() {
    axios.get(settings.base_url + '/api/v1/request/list/', {
      headers: {
        Authorization: 'JWT '  + getAccessToken(),
      }
    }).then(res => {
        console.log(res.data);
        this.setState({requests: res.data})
      })
      .catch(err => {
        console.log('error loading data', err);
      });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeRequestStatus = event => {
    this.setState({ requestStatus: event.target.value });
    axios.put(settings.base_url + '/api/v1/request/'+this.state.requestId, {
      'status': event.target.value,
      'details': this.state.requestDetails,
    }, {
      headers: {
        Authorization: 'JWT '  + getAccessToken(),
      }
    }).then(res => {
      console.log(res.data);
      alert('Request processing successful!');
      this.componentDidMount();
    }).catch(err => {
      console.log('error loading data', err);
    });
  };

  handleEdit = (reqId) => {
    const [request] = this.state.requests.filter(req => req.id === reqId);
    this.setState({ open: true, details: request.details, request, modalAction: 'edit'});
  };

  handleProcessRequest = (reqId) => {
    const [request] = this.state.requests.filter(req => req.id === reqId);
    this.setState({ openProcessRequest: true,
      requestStatus: request.status,
      requestId: request.id, requestDetails:request.details });
  };

  handleCreate = () => {
    this.setState({ open: true, modalAction: 'create'});
  };

  handleDelete = () => {
    axios.delete(settings.base_url + '/api/v1/request/'+this.state.request.id, {
      headers: {
        Authorization: 'JWT '  + getAccessToken(),
      }
    }).then(res => {
      console.log(res.data);
      alert('Request deleted!');
      this.componentDidMount();
    }).catch(err => {
      console.log('error loading data', err);
    });
    this.setState({ openDialog: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseProcessRequest = () => {
    this.setState({ openProcessRequest: false });
  };

  handleClickOpenDialog = (reqId) => {
    const [request] = this.state.requests.filter(req => req.id === reqId);
    this.setState({ openDialog: true, request })
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  handleModalFormSubmit = () => {
    if (this.state.modalAction === 'create') {
      axios.post(settings.base_url + '/api/v1/request/', {
        'create_uid': this.state.userId,
        'write_uid': this.state.userId,
        'details': this.state.details,
      }, {
        headers: {
          Authorization: 'JWT '  + getAccessToken(),
        }
      }).then(res => {
        console.log(res.data);
        alert('Request submitted!');
        this.componentDidMount();
      }).catch(err => {
        console.log('error loading data', err);
      });
    }
    else if (this.state.modalAction === 'edit') {
      axios.put(settings.base_url + '/api/v1/request/'+this.state.request.id, {
        'details': this.state.details,
      }, {
        headers: {
          Authorization: 'JWT '  + getAccessToken(),
        }
      }).then(res => {
        console.log(res.data);
        alert('Request updated!');
        this.componentDidMount();
      }).catch(err => {
        console.log('error loading data', err);
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { requests } = this.state;

    return (
      <div>
        <Layout props={this.props}>
          <Button variant="contained" color="primary" className={classes.button}
                  onClick={() => this.handleCreate()}>
            <AddIcon />
            Create New Request
          </Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <form>
                <TextField
                  id="request-details"
                  label="Details"
                  multiline
                  fullWidth
                  rowsMax="4"
                  className={classes.textField}
                  value={this.state.details}
                  onChange={this.handleChange('details')}
                  margin="normal"
                  variant="outlined"
                />

                <Button variant="contained" color="primary" className={classes.button}
                        onClick={() => this.handleModalFormSubmit()}>
                  Submit
                </Button>

              </form>
            </div>
          </Modal>
          <Modal
              aria-labelledby="process-request"
              open={this.state.openProcessRequest}
              onClose={this.handleCloseProcessRequest}
              disableEnforceFocus
          >
            <div style={{
              textAlign: 'center', top: `${50}%`, left: `${50}%`,
              transform: `translate(-${50}%, -${50}%)`,
            }} className={classes.paper}>
              <Select
                  value={this.state.requestStatus}
                  onChange={this.handleChangeRequestStatus}
              >
                <MenuItem value={'open'}>Open</MenuItem>
                <MenuItem value={'hr_reviewed'}>HR Reviewed</MenuItem>
                <MenuItem value={'processed'}>Processed</MenuItem>
              </Select>
            </div>
          </Modal>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created On</TableCell>
                  <TableCell>Action</TableCell>
                  {this.state.role === 'hr' || this.state.role === 'manager' ?
                      <TableCell>Process Request</TableCell> : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {requests && requests.map(request => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell scope="row">
                      {request.details}
                    </TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>{request.create_date}</TableCell>
                    <TableCell>
                      <IconButton className={classes.button} aria-label="Delete"
                                  onClick={() => this.handleClickOpenDialog(request.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton className={classes.button} aria-label="Edit"
                                  onClick={() => this.handleEdit(request.id)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    {this.state.role === 'hr' || this.state.role === 'manager' ?
                        <TableCell>
                          <IconButton className={classes.button} aria-label="Process"
                                      onClick={() => this.handleProcessRequest(request.id)}>
                            <ArrowIcon />
                          </IconButton>
                        </TableCell> : null}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Dialog
              open={this.state.openDialog}
              onClose={this.handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You cannot undo this action.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDialog} color="primary">
                No
              </Button>
              <Button onClick={this.handleDelete} color="secondary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Layout>
      </div>
    );
  }
}

export default withStyles(styles)(Requests);
