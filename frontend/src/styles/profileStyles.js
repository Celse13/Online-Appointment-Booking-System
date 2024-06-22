import { StyleSheet } from 'aphrodite';
import { appColors } from './colors';

export const profileStyles = StyleSheet.create({
  sidebar: {
    position: 'fixed',
    zIndex:1,
  },
  container: {
		marginLeft: '4.5rem',
    maxHeight: '100vh',
    overflowY: 'auto',
		width: 'calc(100vw - 4.5rem)',
    textAlign: 'center',
    color: appColors.primaryText,
    zIndex: 0,
  }
});
