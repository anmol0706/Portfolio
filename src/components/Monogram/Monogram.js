import { forwardRef, useId } from 'react';
import { classes } from 'utils/style';
import styles from './Monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="46"
      height="29"
      viewBox="0 0 46 29"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M 23 2 C 24.5 2 25.5 2.8 26 4 L 34 24 C 35 26.5 34 28.5 31.5 28.5 C 30 28.5 28.8 27.5 28.2 26 L 27.5 24 L 18.5 24 L 17.8 26 C 17.2 27.5 16 28.5 14.5 28.5 C 12 28.5 11 26.5 12 24 L 20 4 C 20.5 2.8 21.5 2 23 2 Z M 25.5 19.5 L 23 11.5 L 20.5 19.5 L 25.5 19.5 Z" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
