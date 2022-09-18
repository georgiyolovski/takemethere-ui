import Box from '@mui/system/Box';

interface IProps {
  children: React.ReactNode;
  key: string;
}

const Card: React.FC<IProps> = ({ children, key }) => (
  <Box
    key={key}
    mb={{ xs: 4, md: 1 }}
    sx={{
      cursor: 'pointer',
      paddingRight: { md: 4 },
      paddingBottom: 4,
      paddingTop: 4,
      paddingLeft: { md: 4 },
      boxShadow: {
        xs: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        md: 'none',
      },
      borderRadius: { xs: 4, md: 0 },

      '&:hover': {
        borderRadius: 4,
        boxShadow:
          '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      },
    }}
  >
    {children}
  </Box>
);

export default Card;
