'use client';

import { cn } from '@/lib/utils';

const HeroTitle = ({
  title,
  subtitle,
  className,
  titleStyle,
  subtitleStyle,
}: {
  title: string;
  subtitle?: string | undefined;
  className?: string | undefined;
  titleStyle?: string | undefined;
  subtitleStyle?: string | undefined;
}) => {
  return (
    <div className={className}>
      <h1 className={titleStyle}>{title}</h1>
      {subtitle && (
        <p className={cn('tw-text-lg tw-font-bold', subtitleStyle)}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default HeroTitle;
