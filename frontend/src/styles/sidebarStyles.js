import { appColors } from './colors';
import { StyleSheet } from 'aphrodite';

const sharedFooterStyles = {
  display: 'flex',
  alignItems: 'center',
};

export const sidebarStyles = StyleSheet.create({
  hScreen: {
    height: '100vh',
    width:'fit-content',
  },
  nav: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: appColors.accent,
    borderRight: '1px solid #e5e7eb',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
  },
  header: {
    padding: '1rem',
    paddingBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoExpanded: {
    display: 'flex',
    width: '100px',
    flexDirection: 'row',
    color: appColors.white,
    justifyContent: 'center',
    overflow: 'hidden',
    transition: 'width 0.3s'
  },
  logoCollapsed: {
    width: '0',
    overflow: 'hidden',
    transition: 'width 0.3s'
  },
  toggleButton: {
    padding: '0.35rem',
    borderRadius: '0.375rem',
    border: 'none',
    color: appColors.white,
    backgroundColor: 'transparent',
    ':hover': {
      color: appColors.accentOpaque,
      backgroundColor: appColors.white,
    }
  },
  menu: {
    flex: '1',
    padding: '0.75rem'
  },
  footer: {
    ...sharedFooterStyles,
    padding: '0.3rem 0 0 0.75rem',
    borderTop: '1px solid #e5e7eb',
  },
  avatar: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '0.5rem'
  },
  userInfoExpanded: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '13rem',
    marginLeft: '0.75rem',
    overflow: 'hidden',
    transition: 'width 0.3s'
  },
  userInfoCollapsed: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '0',
    overflow: 'hidden',
    transition: 'width 0.3s'
  },
  userDetails: {
    lineHeight: '1rem'
  },
  userName: {
    fontWeight: '600',
    color: appColors.white,
  },
  userEmail: {
    fontSize: '0.75rem',
    color: appColors.white
  },
  menuItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    margin: '0.25rem 0',
    fontWeight: '500',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s'
  },
  menuItemActive: {
    backgroundColor: appColors.primary,
    color: appColors.white,
  },
  menuItemInactive: {
    ':hover': {
      backgroundColor: appColors.white,
      color: appColors.accentOpaque,
    },
    color: appColors.white,
  },
  menuTextExpanded: {
    marginLeft: '0.75rem',
    width: '13rem',
    overflow: 'hidden',
    transition: 'width 0.3s'
  },
  menuTextCollapsed: {
    width: '0',
    overflow: 'hidden',
    transition: 'width 0.3s'
  },
  alert: {
    position: 'absolute',
    right: '0.5rem',
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: '50%',
    backgroundColor: appColors.primaryText
  },
  alertCollapsed: {
    top: '0.5rem'
  },
  tooltip: {
    position: 'absolute',
    left: '100%',
    marginLeft: '1.5rem',
    padding: '0.25rem 0.5rem',
    backgroundColor: appColors.primary,
    color: appColors.white,
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    opacity: '0',
    transform: 'translateX(-0.75rem)',
    transition: 'visibility 0s, opacity 0.3s, transform 0.3s',
    ':hover': {
      opacity: '1',
      transform: 'translateX(0)'
    }
  },
  userLogout: {
    marginTop: '.7rem',
    padding: '0.5rem',
    color: appColors.white,
    width: 'fit-content',
    fontSize: '1rem',
    overflow: 'hidden',
    ':hover': {
      color: appColors.accentOpaque,
      backgroundColor: appColors.white,
      borderRadius: '0.375rem',
      cursor: 'pointer',
    },
  },
  logoutDiv: {
    ...sharedFooterStyles,
    marginTop: '.1rem',
    padding: '0 0 0.5rem 0.75rem',
  },
  logoutImg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: appColors.white,
    width: '40px',
    height: '40px',
  },
});
