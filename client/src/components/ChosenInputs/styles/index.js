import { isMobile } from 'react-device-detect';

export default {
  marginTopMobile: {
    marginTop: isMobile ? '5px' : null,
  },
};
