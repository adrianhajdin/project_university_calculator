import { isMobile } from 'react-device-detect';

export default {
  formControl: {
    width: isMobile ? '60%' : 'initial',
    marginRight: isMobile ? 0 : '25px',
    marginTop: isMobile ? 0 : '10px',
  },
};
