import { StyleSheet } from 'aphrodite';
import { appColors } from './colors';

const sharedContainerStyles = {
  paddingTop: '.5rem',
  display: 'flex',
  flexDirection: 'column',
  height: '90vh',
  alignItems: 'center',
};

const sharedCardStyles = {
  maxWidth: '25rem',
  width: '20rem',
  height: '70vh',
  borderRadius: '15px',
  border: `2px solid ${appColors.accentOpaque}`,
  overflow: 'scroll',
  padding: '1rem',
};

const sharedTextStyles = {
  color: appColors.primaryText,
  textAlign: 'start',
};

const sharedFooterStyles = {
  display: 'flex',
  justifyContent: 'end',
  backgroundColor: appColors.white,
  padding: '.5rem',
  margin: '1rem',
  borderTop: 'none',
};

const sharedButtonStyles = {
  backgroundColor: appColors.white,
  color: appColors.primaryText,
  border: `2px solid ${appColors.accentOpaque}`,
  ':hover': {
    backgroundColor: appColors.accentOpaque,
    color: appColors.white,
  },
};

const sharedHeaderStyles = {
  backgroundColor: appColors.accentOpaque,
  color: appColors.white,
  padding: '1rem',
  textAlign: 'center',
  border: 'none',
};

const sharedBodyStyles = {
  border: 'none',
  color: appColors.primaryText,
  display: 'flex',
  justifyContent: 'start',
};

export const myProfileStyles = StyleSheet.create({
  clientContainer: {
    display: 'flex',
    width: '100vw',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientCard: {
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
    width: '5rem',
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
    ...sharedFooterStyles
  },
  button: {
    ...sharedButtonStyles,
  },
  adminContainer: {
    maxHeight: '90vh',
    display: 'flex',
    width: '100vw',
    flexDirection: 'row',
    alignItems: 'start',
    '@media (max-width: 750px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  adminCard: {
    width: '25rem',
    margin: '3rem',
    borderRadius: '25px',
    border: `3px solid ${appColors.accentOpaque}`,
    '@media (max-width: 750px)': {
      width: '20rem',
    },
  },
  myServices: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 750px)': {
      maxHeight: '50vh',
    },
    '@media (min-width: 600px)': {
      maxHeight: '70vh',
    },
  },
  myServicesDiv: {
    overflowY: 'auto',
  },
  myServicesItem: {
    display: 'flex',
    marginBottom: '1rem',
    justifyContent: 'space-between',
  },
});

export const appointmentStyles = StyleSheet.create({
  container: {
    height: 'fit-content',
  },
  listContainer: {
    border: `2px solid ${appColors.accent}`,
    borderRadius: '25px',
    padding: '1rem',
    width: '80vw',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    columnGap: '2rem',
    rowGap: '1rem',
    height: '90vh',
    overflow: 'scroll',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
    '@media (min-width: 600px) and (max-width: 900px)': {
      gridTemplateColumns: '1fr 1fr',
    },
    '@media (min-width: 900px) and (max-width: 1200px)': {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },
  card: {
    border: `1px solid ${appColors.accent}`,
    height: 'fit-content',
    width: '100%',
  },
  header: {
    ...sharedHeaderStyles,
  },
  body: {
    ...sharedBodyStyles,
  },
  bodyDiv: {
    textAlign: 'start',
  },

  editButton: {
    margin: '0.5rem',
    backgroundColor: '#39BFD7FF',
    border: 'none',
  },
  deleteButton: {
    backgroundColor: '#D73939',
    border: 'none',
  },
  footer: {
    ...sharedFooterStyles,
  },
  button: {
    ...sharedButtonStyles,
  },
});

export const notificationsStyles = StyleSheet.create({
  container: {
    ...sharedContainerStyles
  },
  card: {
    ...sharedCardStyles
  },
  text: {
    ...sharedTextStyles
  },
});

export const clientsListStyles = StyleSheet.create({
  container: {
    ...sharedContainerStyles,
  },
  card: {
    ...sharedCardStyles,
  },
  text: {
    ...sharedTextStyles
  },
});

export const staffListStyles = StyleSheet.create({
  container: {
    ...sharedContainerStyles,
  },
  card: {
    ...sharedCardStyles,
  },
  text: {
    ...sharedTextStyles
  },
});

export const servicesCategoriesStyles = StyleSheet.create({
  servicesContainer: {
    margin: '3rem auto 2.5rem auto',
    textAlign: 'center',
    color: appColors.primaryText,
    zIndex: 0,
  },
  gridContainer: {
    margin: '2rem 0 0 3rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    rowGap: '3rem',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },
  gridContainerCard: {
    width: 'calc(15vw * .7)',
    height: 'auto',
    padding: '1rem',
    border: `2px solid ${appColors.primaryLight}`,
    borderRadius: '10px',
    ':hover': {
      transform: 'scale(1.3)',
      border: `2px solid ${appColors.primaryDark}`,
    },
    '@media (max-width: 900px)': {
      width: '15vw',
    },
  },
  gridContainerItem: {
    cursor: 'pointer',
  },
});

export const servicesListStyles = StyleSheet.create({
  container: {
    border: `2px solid ${appColors.accent}`,
    borderRadius: '25px',
    padding: '1rem',
    width: '80vw',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    columnGap: '2rem',
    rowGap: '1rem',
    height: '90vh',
    overflow: 'scroll',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
    '@media (min-width: 600px) and (max-width: 900px)': {
      gridTemplateColumns: '1fr 1fr',
    },
    '@media (min-width: 900px) and (max-width: 1200px)': {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },
  backCard: {
    cursor: 'pointer',
    width: 'fit-content',
    height: 'fit-content',
    padding: '.5rem',
    marginBottom: '1rem',
    color: appColors.accentOpaque,
    borderRadius: '25px',
    border: `1px solid ${appColors.accentOpaque}`,
    ':hover': {
      backgroundColor: appColors.accentOpaque,
      color: appColors.white,
    },
  },
  back: {
    fontWeight: 'bold',
  },
  card: {
    border: `1px solid ${appColors.accent}`,
    height: 'fit-content',
    width: '100%',
  },
  header: {
    ...sharedHeaderStyles,
  },
  body: {
    ...sharedBodyStyles,
  },
  bodyDiv: {
    textAlign: 'start',
  },
  footer: {
    ...sharedFooterStyles
  },
  button: {
    ...sharedButtonStyles
  },
});

const sharedInputStyles = {
  color: appColors.primaryText,
  backgroundColor: appColors.white,
  marginTop: '.3rem',
  border: `2px solid ${appColors.accentOpaque}`,
};

export const createServiceStyles = StyleSheet.create({
  container: {
    ...sharedContainerStyles,
  },
  form: {
    backgroundColor: appColors.white,
    width: '25rem',
    height: 'fit-content',
    padding: '3rem',
    color: appColors.primaryText,
    border: `2px solid ${appColors.primary}`,
    borderRadius: '15px',
    '@media (max-width: 600px)': {
      width: '20rem',
    },
  },
  input: {
    ...sharedInputStyles,
    borderRadius: '10px',
  },
  label: {
    width: '100%',
    textAlign: 'end',
    fontWeight: '200',
  },
  inputDuration: {
    ...sharedInputStyles,
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
  },
  inputDurationText: {
    ...sharedInputStyles,
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
  },
  button: {
    ...sharedButtonStyles,
  },
});
