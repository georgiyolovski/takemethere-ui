import styled from '../../../theme/styled';
interface StyledImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  width?: string | number;
}

const Image = styled(
  (props: StyledImageProps) => (
    <img src='/logo/svg/tmd_logo_no_text.svg' alt='logo' {...props} />
  ),
  {
    shouldForwardProp: (propName) => propName !== 'width',
  }
)(({ width }) => ({
  width: width || 200,
}));

export default Image;
