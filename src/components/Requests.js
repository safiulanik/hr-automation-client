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
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import Modal from '@material-ui/core/es/Modal/Modal';
import TextField from '@material-ui/core/es/TextField/TextField';
import Button from '@material-ui/core/es/Button/Button';
import settings from '../local_settings';
import Layout from "../containers/Layout";

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
  state = {
    open: false,
    requests: [],
    details: '',
    request: {}
  };

  componentDidMount() {
    axios.get(settings.base_url + '/api/v1/request/list/')
      .then(res => {
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

  handleEdit = (reqId) => {
    const [request] = this.state.requests.filter(req => req.id === reqId);
    this.setState({ open: true, details: request.details, request});
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { requests } = this.state;

    return (
      <div>
        <Layout>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <p>
                Status: {this.state.request.status}
              </p>
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

                <Button variant="contained" color="primary" className={classes.button}>
                  Submit
                </Button>

              </form>
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
                      <IconButton className={classes.button} aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton className={classes.button} aria-label="Edit" onClick={() => this.handleEdit(request.id)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Layout>
      </div>
    );
  }
}

export default withStyles(styles)(Requests);
