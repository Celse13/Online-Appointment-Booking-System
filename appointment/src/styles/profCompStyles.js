import { StyleSheet } from 'aphrodite';
import { appColors } from './colors';

export const myProfileStyles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100vw',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '25rem',
    margin: '3rem',
    borderRadius: '25px',
    border: `3px solid ${appColors.accentOpaque}`,
  },
  header: {
    margin: '1rem',
    backgroundColor: appColors.white,
    borderBottom: `1px solid ${appColors.accentOpaque}`,
  },
  ppic: {
    width: '10rem',
    padding: '1rem',
    borderRadius: '50%',
    border: `2px solid ${appColors.primary}`,
  },
  body: {
    marginTop: '1rem',
    backgroundColor: 'none',
    color: appColors.primaryText,
    borderBottom: `none`,
    display: 'flex',
    justifyContent: 'center',
  },
  bodyDiv: {
    textAlign: 'start',
  },
  footer: {
    margin: '1rem',
    display: 'flex',
    justifyContent: 'end',
    backgroundColor: appColors.white,
    borderTop: `none`,
  },
  button: {
    backgroundColor: appColors.white,
    color: appColors.primaryText,
    border: `2px solid ${appColors.accentOpaque}`,
    ':hover': {
      backgroundColor: appColors.accentOpaque,
      color: appColors.white,
    },
  },
});

export const notificationsStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    alignItems: 'center',
  },
  card: {
    maxWidth: '25rem',
    width: '20rem',
    margin: '3rem',
    height: '70vh',
    borderRadius: '25px',
    border: `3px solid ${appColors.accentOpaque}`,
    scrollable: 'true',
  },
});
