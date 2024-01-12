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

const TextInputField = ({
  children,
  control,
  label,
  name,
}: {
  children: React.ReactElement;
  control: Control<any>;
  label: string;
  name: string;
}) => {
  const renderChildren = (field: ControllerRenderProps) => {
    return cloneElement(children, { ...field });
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='tw-h-[6.5rem]'>
          <FormLabel>{label}</FormLabel>
          <FormControl>{renderChildren(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInputField;
