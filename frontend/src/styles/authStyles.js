import { StyleSheet } from 'aphrodite';
import { appColors } from './colors';
import calendar from '../../public/Assets/calendar2.png';

const sharedInputStyles = {
  border: 'none',
  width: '50vw',
  maxWidth: '280px',
  padding: '0.7rem',
  margin: '0.7rem',
  borderRadius: '10px',
};

export const authStyles = StyleSheet.create({
  auth: {
    margin: 0,
    height: '90vh',
    maxHeight: '100vh',
    backgroundImage: `url(${calendar})`,
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
      backgroundColor: appColors.primaryLight,
      color: appColors.accent,
      border: `3px solid ${appColors.accent}`,
      fontWeight: 'bold',
    },
  },
  aLinks: {
    textDecoration: 'none',
    ':hover': {
      color: appColors.darkGreen,
      textDecoration: 'underline',
    },
  },
  verificationDiv: {
    maxHeight: '100vh',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    zIndex: '1000',
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.blackTrans,
  },
  verificationCard: {
    border: `2px solid ${appColors.accentOpaque}`,
    borderRadius: '15px',
    height: '50vh',
    width: '50vw',
    maxWidth: '400px',
    padding: '1rem',
    backgroundColor: appColors.primaryLight,
    color: appColors.primaryText,
    opacity: 1,
  },
  verificationCardHeader: {
    backgroundColor: appColors.primaryLight,
    color: appColors.accentOpaque,
    border: 'none',
    fontSize: '2rem',
    padding: 0,
    display: 'flex',
    justifyContent: 'end',
  },
  verificationCardHeaderClose: {
    cursor: 'pointer',
    ':hover': {
      transform: 'scale(1.3)',
    },
  },
  verificationCardTitle: {
    color: appColors.accentOpaque,
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  verificationCardText: {
    color: appColors.primaryText,
    fontSize: '1rem',
    fontWeight: '300',
    textAlign: 'center',
  },
  verificationEmailAddress: {
    color: appColors.accentOpaque,
    fontWeight: '400',
    textDecoration: 'underline',
  },
  verificationCardFooter: {
    display: 'flex',
    justifyContent: 'center',
    border: 'none',
    backgroundColor: appColors.primaryLight,
  },
});

export const switchStyles = StyleSheet.create({
  switchContainer: {
    display: 'flex',
    width: '80%',
    alignItems: 'center',
  },
  text: {
    paddingTop: '0.5rem',
  },
  switch: {
    margin: '0 10px',
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '30px',
  },
  input: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  slider: {
    borderRadius: '30px',
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: appColors.primary,
    transition: '.4s',
  },
  sliderBefore: {
    position: 'absolute',
    content: '""',
    height: '28px',
    width: '28px',
    left: '2px',
    bottom: '1px',
    backgroundColor: 'white',
    transition: '.4s',
    borderRadius: '50%',
  },
  sliderChecked: {
    backgroundColor: appColors.accentOpaque,
  },
  sliderCheckedBefore: {
    transform: 'translateX(28px)',
  },
});
