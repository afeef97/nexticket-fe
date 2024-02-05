'use client';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { PlusCircle, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  array,
  email,
  minLength,
  object,
  string,
  Input as vInput,
} from 'valibot';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import TextInputField from '@/components/shared/TextInputField';
import { inviteMembers } from './actions';
import useQueryHandler from '@/lib/hooks/useQueryHandler';
import { valibotResolver } from '@hookform/resolvers/valibot';

export const InviteMembersFormSchema = object({
  memberList: array(
    object({
      email: string([minLength(1, 'Email is required'), email()]),
      role: string([minLength(1, 'Role is required')]),
    })
  ),
});

const InviteMembersForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}) => {
  const inviteMembersForm = useForm<vInput<typeof InviteMembersFormSchema>>({
    resolver: valibotResolver(InviteMembersFormSchema),
    defaultValues: {
      memberList: [{ email: '', role: 'USER' }],
    },
  });

  const inviteMembersFieldArray = useFieldArray({
    control: inviteMembersForm.control,
    name: 'memberList',
  });

  const {
    data: inviteMembersData,
    state: inviteMembersState,
    triggerQuery: triggerInviteMembers,
  } = useQueryHandler({
    query: inviteMembers,
    queryOnMount: false,
  });
  const onSubmit = async (data: vInput<typeof InviteMembersFormSchema>) => {
    const res = await triggerInviteMembers(data.memberList);
    console.log(res);

    if (!inviteMembersData.ok && res.data.existingEmails) {
      res.data.existingEmails.forEach((email: string, index: number) => {
        inviteMembersForm.setError(`memberList.${index}.email`, {
          message: email + ' already exists',
        });
      });
      return;
    }

    setOpen(false);
  };

  return (
    <Form {...inviteMembersForm}>
      <form onSubmit={inviteMembersForm.handleSubmit(onSubmit)}>
        {inviteMembersFieldArray.fields.map((field, index) => (
          <div key={field.id}>
            <div className='tw-flex tw-items-center tw-gap-2'>
              <TextInputField
                control={inviteMembersForm.control}
                name={`memberList.${index}.email`}
                label='Email'
                className='tw-grow'
              >
                <Input
                  placeholder='user@example.com'
                  className='tw-w-full tw-grow'
                />
              </TextInputField>
              <FormField
                control={inviteMembersForm.control}
                name={`memberList.${index}.role`}
                render={({ field }) => (
                  <FormItem className='tw-min-h-[6.5rem] tw-mb-2 tw-flex tw-items-center tw-w-24'>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a verified email to display' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='USER'>User</SelectItem>
                        <SelectItem value='ADMIN'>Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  inviteMembersFieldArray.append({ email: '', role: 'USER' });
                }}
                variant='ghost'
                className='tw-mb-2 !tw-p-2'
              >
                <PlusCircle />
              </Button>
              {index > 0 && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    inviteMembersFieldArray.remove(index);
                  }}
                  variant='ghost'
                  className='tw-mb-2 !tw-p-2'
                >
                  <Trash2 />
                </Button>
              )}
            </div>
          </div>
        ))}

        <Button type='submit' disabled={inviteMembersState === 'pending'}>
          Invite
        </Button>
      </form>
    </Form>
  );
};

export default InviteMembersForm;
