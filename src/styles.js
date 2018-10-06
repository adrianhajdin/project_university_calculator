import { isMobile } from 'react-device-detect';

export default {
  paper: {
    textAlign: 'center',
    overflow: 'auto',
    justifyContent: 'space-between',
    padding: '0 24px 24px 24px',
    height: isMobile ? '100vh' : null,
  },

  button: {
    padding: '0 7px',
  },

  anchor: {
    textDecoration: 'none',
    color: '#303F9F',
  },

  copyright: {
    fontSize: '0.85rem',
  },

  caption: {
    marginBottom: '10px',
    fontSize: '0.85rem',
  },

  heading: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '8px 0',
  },

  tooltipIcon: {
    paddingLeft: '5px',
    opacity: '0.6',
  },

  icon: {
    padding: isMobile ? '10px 0' : null,
    width: isMobile ? '85px' : '64px',
    height: isMobile ? '85px' : '64px',
  },

  marginTopMobile: {
    marginTop: isMobile ? '5px' : null,
  },

  dividerMarginBottom10: {
    marginBottom: '10px',
    backgroundColor: 'rgba(127, 76, 178, 0.4)',
  },

  dividerMarginBottom20: {
    marginBottom: '20px',
    backgroundColor: 'rgba(127, 76, 178, 0.4)',
  },

  divider: {
    margin: '20px 0',
    backgroundColor: 'rgba(127, 76, 178, 0.4)',
  },

  headingTypography: {
    display: 'flex',
    lineHeight: '1.5em;',
    padding: '0 10px;',
    flex: isMobile ? '1' : null,
  },

  marginTop20: {
    marginTop: '20px',
  },

  marginBottom10: {
    marginBottom: '10px',
  },

  marginBottomMobile: {
    marginBottom: isMobile ? null : '10px',
    fontSize: '0.85rem',
  },

  marginLeft10: {
    marginLeft: '10px',
  },

  marginTop5: {
    marginTop: '5px',
  },
};
