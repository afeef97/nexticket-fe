'use client';

import { minLength, object, string, Input as vInput } from 'valibot';
import { Button } from '../ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

const VerifyFormSchema = object({
  token: string([minLength(1, 'Token is required')]),
});

const VerifyForm = () => {
  const verifyForm = useForm<vInput<typeof VerifyFormSchema>>({
    resolver: valibotResolver(VerifyFormSchema),
    defaultValues: {
      token: '',
    },
  });

  const onSubmit = async (data: vInput<typeof VerifyFormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...verifyForm}>
      <form onSubmit={verifyForm.handleSubmit(onSubmit)}>
        <TextInputField control={verifyForm.control} label='Token' name='token'>
          <Input placeholder='Please enter your token' />
        </TextInputField>

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default VerifyForm;
