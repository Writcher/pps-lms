import { useEffect, useState } from 'react';
import { Box, CircularProgress, CircularProgressProps, Skeleton, Typography, useMediaQuery } from '@mui/material';
import Masonry from '@mui/lab/Masonry';

export function MasonrySkeleton() {
  const [isMounted, setIsMounted] = useState(false);
  const matches = useMediaQuery('(min-width: 768px)');
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    isMounted && (
      <Masonry columns={matches ? 3 : 1} spacing={1}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col">
            <Skeleton variant="rectangular" height={225} className='rounded'/>
          </div>
        ))}
      </Masonry>
    )
  );
};

export function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
  ) {
  return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" {...props} />
          <Box
              sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
              }}
          >
              <Typography
                  variant="caption"
                  component="div"
                  sx={{ color: 'text.secondary' }}
              >
                  {`${Math.round(props.value)}%`}
              </Typography>
          </Box>
      </Box>
  );
};