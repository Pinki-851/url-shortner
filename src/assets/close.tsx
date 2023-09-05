import { SVGProps } from 'react';

export function Close(props: SVGProps<SVGSVGElement>) {
  const { className, width, height } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M36 14.1L33.9 12L24 21.9L14.1 12L12 14.1L21.9 24L12 33.9L14.1 36L24 26.1L33.9 36L36 33.9L26.1 24L36 14.1Z" />
    </svg>
  );
}
