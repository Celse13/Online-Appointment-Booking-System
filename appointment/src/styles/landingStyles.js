import { StyleSheet } from 'aphrodite';
import { appColors } from './colors';

export const headerStyles = StyleSheet.create({
  navBar: {
    margin: 0,
    backgroundColor: appColors.primaryDarkTrans,
    padding: '1rem',
    maxWidth: '100vw',
  },
  navBarIcon: {
    width: '25px',
    height: '25px',
    position: 'absolute',
  },
  navBarList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    textDecoration: 'none',
    listStyle: 'none',
    margin: 0,
  },
  listItem: {
    textDecoration: 'none',
    color: 'black',
    padding: '1rem',
    ':hover': {
      color: 'white',
      backgroundColor: appColors.accent,
      cursor: 'pointer',
    }
  },
});

export const homeStyles = StyleSheet.create({
  slogan: {
    color: appColors.primaryText,
    fontSize: '2rem',
    margin: '70px 0 0 0',
    textAlign: 'center',
  },
  homeCard: {
    width: '90%',
    maxHeight: '50vh',
    margin: '5%',
    padding: '2rem',
    border: 'none',
    backgroundColor: appColors.lightBlue,
  },
});

export const servicesStyles = StyleSheet.create({
  servicesContainer: {
    margin: '5rem auto 5rem auto',
    textAlign: 'center',
    color: appColors.primaryText,
  },
  servicesCard: {
    width: '90%',
    maxHeight: '50vh',
    margin: '5%',
    padding: '2rem',
    border: 'none',
    backgroundColor: appColors.lightGreen,
  },
  gridContainer: {
    margin: '2rem 0 0 3rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    rowGap: '3rem',
  },
  gridContainerCard: {
    width: '90px',
    height: 'auto',
    padding: '1rem',
    ':hover': {
      backgroundColor: appColors.primaryLight,
      transform: 'scale(1.2)',
    },
  },
  gridContainerItem: {
    cursor: 'pointer',
  },
});
