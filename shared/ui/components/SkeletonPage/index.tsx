
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const SkeletonPage = () => (
    <Stack spacing={1} m='auto' mt={'6rem'}  width={500} height={'70vh'} >
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '3rem' }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={100} height={100} />
      <Skeleton variant="rectangular" width={500} height={150} />
      <Skeleton variant="rounded" width={500} height={250} />
    </Stack> 
);