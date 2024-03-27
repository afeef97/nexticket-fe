import { PlusCircle, Trash2 } from 'lucide-react';
import { array, email, minLength, object, string, Input as vInput } from 'valibot';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import TextInputField from '@/components/shared/TextInputField';
import { inviteMembers } from '@/app/dashboard/users/actions';
import useQueryHandler from '@/lib/hooks/useQueryHandler';
import { useRouter } from 'next/navigation';
import { valibotResolver } from '@hookform/resolvers/valibot';

const AddAdminFormSchema = object({
  memberList: array(
    object({
      email: string([minLength(1, 'Email is required'), email()]),
      role: string([minLength(1, 'Role is required')]),
    })
  ),
});

const AddAdminForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}) => {
  const router = useRouter();
  const addAdminForm = useForm<vInput<typeof AddAdminFormSchema>>({
    resolver: valibotResolver(AddAdminFormSchema),
    defaultValues: {
      memberList: [{ email: '', role: 'PARLIAMENT_ADMIN' }],
    },
  });
  const addAdminFieldArray = useFieldArray({
    control: addAdminForm.control,
    name: 'memberList',
  });

  const { state: addAdminState, triggerQuery: triggerAddAdmin } =
    useQueryHandler({
      query: inviteMembers,
      queryOnMount: false,
    });

  const onSubmit = async (data: vInput<typeof AddAdminFormSchema>) => {
    const res = await triggerAddAdmin(data.memberList);

    if (!res.ok && res.data.existingEmails) {
      (res.data.existingEmails as string[]).forEach(
        (email: string, index: number) => {
          addAdminForm.setError(`memberList.${index}.email`, {
            message: email + ' already exists',
          });
        }
      );
      return;
    } else if (!res.ok) {
      addAdminForm.setError(`memberList.0.email`, {
        message: res.data.message,
      });
      return;
    }

    if (res.ok) {
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <Form {...addAdminForm}>
      <form onSubmit={addAdminForm.handleSubmit(onSubmit)}>
        {addAdminFieldArray.fields.map((field, index) => (
          <div key={field.id}>
            <div className='flex items-center gap-2'>
              <TextInputField
                control={addAdminForm.control}
                name={`memberList.${index}.email`}
                label='Email'
                className='grow'
              >
                <Input
                  placeholder='user@example.com'
                  className='w-full grow'
                />
              </TextInputField>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  addAdminFieldArray.append({ email: '', role: 'USER' });
                }}
                variant='ghost'
                className='mb-2 !p-2'
              >
                <PlusCircle />
              </Button>
              {index > 0 && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    addAdminFieldArray.remove(index);
                  }}
                  variant='ghost'
                  className='mb-2 !p-2'
                >
                  <Trash2 />
                </Button>
              )}
            </div>
          </div>
        ))}
        <div className='flex flex-row-reverse gap-2'>
          <Button
            type='submit'
            disabled={addAdminState === 'pending'}
          >
            Invite
          </Button>
          <Button
            variant='outline'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddAdminForm;
