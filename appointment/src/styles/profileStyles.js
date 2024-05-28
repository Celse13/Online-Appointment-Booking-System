import { StyleSheet } from 'aphrodite';
import { appColors } from './colors';

export const profileStyles = StyleSheet.create({
  sidebar: {
    position: 'fixed',
  },
  container: {
    marginLeft: '100px',
    padding: '1rem',
    height: '100vh',
    overflowY: 'auto',
    textAlign: 'center',
    color: appColors.primaryText,
  }
});
