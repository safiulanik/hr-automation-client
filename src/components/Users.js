import React from 'react';
import withStyles from '@material-ui/core/es/styles/withStyles';
import Paper from '@material-ui/core/es/Paper/Paper';
import Table from '@material-ui/core/es/Table/Table';
import TableHead from '@material-ui/core/es/TableHead/TableHead';
import TableRow from '@material-ui/core/es/TableRow/TableRow';
import TableCell from '@material-ui/core/es/TableCell/TableCell';
import TableBody from '@material-ui/core/es/TableBody/TableBody';
import Layout from '../containers/Layout';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, email, role, status) {
  id += 1;
  return { id, name, email, role, status };
}
const rows = [
  createData('Safiul Kabir', 'abc@xyz.com', 'Manager', 'Active'),
  createData('Safiul Kabir', 'abc@xyz.com', 'HR', 'Active'),
  createData('Safiul Kabir', 'abc@xyz.com', 'Engineer', 'Active'),
];

class Users extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Layout>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Layout>
      </div>
    )
  }

}

export default withStyles(styles)(Users);
