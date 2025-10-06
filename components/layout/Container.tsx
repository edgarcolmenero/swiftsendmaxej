import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ContainerProps {
  className?: string;
  children: ReactNode;
  as?: 'div' | 'section' | 'header' | 'footer';
}

export function Container({ className, children, as: Component = 'div' }: ContainerProps) {
  return <Component className={cn('container', className)}>{children}</Component>;
}
