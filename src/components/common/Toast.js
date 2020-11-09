import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { removeAlert } from '../../actions/';

const Alert = (props) => {
  return <MuiAlert elevation={6} {...props} />;
};

const Toast = (props) => {
  return (
    <div>
      {props.alerts.map((oneAlert) => (
        <Snackbar
          key={oneAlert.id}
          open={true}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          autoHideDuration={6000}
          onClose={() => props.removeAlert(oneAlert.id)}
        >
          <Alert
            severity={oneAlert.alertType}
            onClose={() => props.removeAlert(oneAlert.id)}
          >
            {oneAlert.msg}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Toast);
