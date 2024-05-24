import { StyleSheet } from 'aphrodite';
import { appColors } from './colors';
import calender from '../Assets/calendar.png';

const sharedInputStyles = {
  border: 'none',
  width: '50vw',
  maxWidth: '280px',
  padding: '0.7rem',
  margin: '0.7rem',
  borderRadius: '5px',
};

export const authStyles = StyleSheet.create({
  auth: {
    margin: 0,
    height: '90vh',
    maxHeight: '100vh',
    backgroundImage: `url(${calender})`,
    backgroundPosition: 'bottom left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 70%',
    fontWeight: 'lighter',
  },
  back: {
    color: appColors.primaryText,
    paddingRight: '1rem',
    position: 'absolute',
    cursor: 'pointer',
    top: '0',
    right: '0',
  },
  icon: {
    color: appColors.primaryText,
    fontSize: '3 rem',
    marginRight: '0.5rem',
  },
});

export const signStyles = StyleSheet.create({
  signUpBody: {
    color: appColors.primaryText,
    margin: '2rem',
    textAlign: 'center',
  },
  text: {
    color: appColors.darkGreen,
    cursor: 'pointer',
  },
  form: {
    backgroundColor: appColors.primaryDarkTrans,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '3rem auto',
    padding: '1rem 2rem 4rem 1rem',
    border: 'none',
    borderRadius: '25px',
    width: '80%',
    maxWidth: '400px',
  },
  input: {
    ...sharedInputStyles,
    color: appColors.primaryText,
    backgroundColor: appColors.secondaryLight,
  },
  button: {
    ...sharedInputStyles,
    color: appColors.primaryLight,
    backgroundColor: appColors.accent,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: appColors.lightBlue,
      color: appColors.accent,
    },
  },
  aLinks: {
    textDecoration: 'none',
    ':hover': {
      color: appColors.darkGreen,
      textDecoration: 'underline',
    },
  },
});
