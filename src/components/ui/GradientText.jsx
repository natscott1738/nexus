import theme from '../../utils/theme';

const GradientText = ({ children, style = {} }) => (
  <span style={{
    background:theme.colors.gradient2, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
    backgroundSize:'200% 200%', animation:'gradient-shift 4s ease infinite', ...style,
  }}>{children}</span>
);

export default GradientText;
