import { Skeleton, Stack } from "@mui/material";

export const MenuSkeleton = () => {
  return (
    <Stack
      spacing={1}
      width={300}
      mt={"3rem"}
      display="flex"
      alignItems="center"
    >
      <Skeleton variant="rectangular" width={200} height={50} />
      <Skeleton variant="rectangular" width={200} height={50} />
      <Skeleton variant="rectangular" width={200} height={50} />
      <Skeleton variant="rectangular" width={200} height={50} />
      <Skeleton variant="rectangular" width={200} height={50} />
      <Skeleton variant="rectangular" width={200} height={50} />
      <Skeleton variant="rectangular" width={200} height={50} />
      <Skeleton variant="rectangular" width={200} height={50} />
      <Skeleton variant="rectangular" width={200} height={50} />
      <Skeleton variant="rectangular" width={200} height={50} />
      <Skeleton variant="rectangular" width={200} height={50} />
    </Stack>
  );
};
