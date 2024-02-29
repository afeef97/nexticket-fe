'use client';

import { Control, ControllerRenderProps } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cloneElement } from 'react';
import { cn } from '@/lib/utils';

const TextInputField = ({
  children,
  control,
  label,
  name,
  className,
}: {
  children: React.ReactElement;
  control: Control<any>;
  label: string;
  name: string;
  className?: string;
}) => {
  const renderChildren = (field: ControllerRenderProps) => {
    return cloneElement(children, { ...field });
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('min-h-[6.5rem] mb-2', className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>{renderChildren(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInputField;
