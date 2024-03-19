import { email, minLength, object, string, Input as vInput } from 'valibot';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import TextInputField from '@/components/shared/TextInputField';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

const AddAdminFormSchema = object({
  username: string([minLength(1, 'Username is required')]),
  email: string([email()]),
});

const AddAdminForm = () => {
  const addAdminForm = useForm<vInput<typeof AddAdminFormSchema>>({
    resolver: valibotResolver(AddAdminFormSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const onSubmit = async (data: vInput<typeof AddAdminFormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...addAdminForm}>
      <form onSubmit={addAdminForm.handleSubmit(onSubmit)}>
        <TextInputField name="username" label="Username" control={addAdminForm.control}>
          <Input placeholder="Enter their username here" />
        </TextInputField>
        <TextInputField name="email" label="Email" control={addAdminForm.control}>
          <Input placeholder="user@domain.com" />
        </TextInputField>

        <div className="flex justify-end gap-2">
          <Button variant={'outline'} onClick={() => addAdminForm.reset()}>
            Cancel
          </Button>
          <Button type="submit">Send Invitation</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddAdminForm;
