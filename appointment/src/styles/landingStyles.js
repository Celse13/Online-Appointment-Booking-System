import { StyleSheet } from 'aphrodite';
import { appColors } from './colors';

const sharedContainerStyles = {
  margin: '3rem auto 2.5rem auto',
  textAlign: 'center',
  color: appColors.primaryText,
};

const sharedCardStyles = {
  width: '90%',
  maxHeight: '50vh',
  margin: '5%',
  padding: '2rem',
  border: 'none',
  borderRadius: '20px',
};

export const headerStyles = StyleSheet.create({
  navBar: {
    margin: 0,
    backgroundColor: appColors.dusty,
    padding: '1rem',
    maxWidth: '100vw',
  },
  navBarCard: {
    width: '28px',
    height: '28px',
    position: 'absolute',
    backgroundColor: appColors.secondaryDark,
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
    color: appColors.primaryLight,
    padding: '1rem',
    ':hover': {
      backgroundColor: appColors.secondaryDark,
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
    ...sharedCardStyles,
    backgroundColor: appColors.primaryLight,
  },
});

export const servicesStyles = StyleSheet.create({
  servicesContainer: {
    ...sharedContainerStyles
  },
  servicesCard: {
    ...sharedCardStyles,
    backgroundColor: appColors.primaryLight,
  },
  gridContainer: {
    margin: '2rem 0 0 3rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    rowGap: '3rem',
  },
  gridContainerCard: {
    width: '100px',
    height: 'auto',
    padding: '1rem',
    border: `2px solid ${appColors.primaryLight}`,
    borderRadius: '10px',
    ':hover': {
      transform: 'scale(1.3)',
      border: `2px solid ${appColors.primaryDark}`,
    },
  },
  gridContainerItem: {
    cursor: 'pointer',
  },
});

export const aboutStyles = StyleSheet.create({
  aboutContainer: {
    ...sharedContainerStyles,
  },
  aboutCard: {
    ...sharedCardStyles,
    backgroundColor: appColors.primaryLight,
  },
});

export const testimonialsStyles = StyleSheet.create({
  testimonialsContainer: {
    ...sharedContainerStyles,
  },
  testimonialsCard: {
    padding: '1rem 3rem',
    margin: '2rem',
    width: '70%',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: appColors.primaryLight,
  },
  testimonialsCardHeader: {
    borderRadius: '50%',
    padding: '.2rem',
    backgroundColor: appColors.dusty,
  },
  hr: {
    border: 'none',
    width: '100%',
    height: '3px',
    backgroundColor: appColors.primaryText,
  },
});

export const footerStyles = StyleSheet.create({
  footerDiv: {
    margin: 0,
    color: appColors.white,
    backgroundColor: appColors.dusty,
    paddingTop: '1rem',
  },
  header: {
    textAlign: 'center',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    margin: '2rem 0 0 0',
  },
  gridContainerItem: {
    cursor: 'pointer',
    width: '50px',
    height: '50px',
    ':hover': {
      transform: 'scale(1.2)',
    },
  },
  hr: {
    border: 'none',
    width: '100%',
    height: '3px',
    backgroundColor: appColors.white,
  },
  col: {
    textAlign: 'center',
    cursor: 'pointer',
  }
});
