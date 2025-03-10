import { COLORS } from '../../shared/ui/colors'

export const signInPageStyles = {
  title: {
    marginTop: 0,
    marginBottom: '1rem',
    textAlign: 'center' as const,
    fontSize: 36,
    color: '#ffffff',
  },

  fullWidthButton: {
    width: '100%',
    fontSize: '16px',
    backgroundColor: COLORS.BLUE,
  },

  signInInput: {
    fontSize: '16px',
    padding: '10px',
  },

  toSignUpContainerSpan: {
    fontSize: '16px',
    color: '#ffffff',
  },

  toSignUpContainerLink: {
    fontSize: '14px',
    color: COLORS.BLUE,
  },
}
