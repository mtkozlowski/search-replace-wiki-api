import colors from './colors';
import typography from './typography';

const regularSection = '960px';
const theme = {
  colors,
  typography,

  media: {
    phone: '@media (max-width: 480px)',
    littleTablet: '@media (max-width: 768px)',
    regularSection: `@media (max-width: ${regularSection})`,
  },

  regularSection,
};
export default theme;
