'use client';

import {
  AccessContext,
  IAccessContext,
} from '@/components/providers/AccessContextProvider';
import React, { useContext, useEffect } from 'react';
import {
  RegisterMemberSchema,
  UpdateEmailSchema,
  UpdatePasswordSchema,
  UpdateUsernameSchema,
} from '@/lib/schemas/updateAccountForm';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { UpdateFields } from '@/lib/types';
import generateUpdateField from './generateUpdateField';
import { updateUser } from '@/app/(auth)/actions';
import { useForm } from 'react-hook-form';
import useQueryHandler from '@/lib/hooks/useQueryHandler';
import { useRouter } from 'next/navigation';
import { Input as vInput } from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';

const UpdateAccountForm = () => {
  const { userData } = useContext<IAccessContext>(AccessContext);
  const router = useRouter();
  const [isEditEmail, setIsEditEmail] = React.useState<boolean>(false);
  const [isEditUsername, setIsEditUsername] = React.useState<boolean>(false);
  const [isEditPassword, setIsEditPassword] = React.useState<boolean>(false);

  const registerMemberForm = useForm<vInput<typeof RegisterMemberSchema>>({
    resolver: valibotResolver(RegisterMemberSchema),
    defaultValues: {
      username: '',
      email: userData?.email || '',
      password: '',
      confirmPassword: '',
    },
  });

  const updateUsernameForm = useForm<vInput<typeof UpdateUsernameSchema>>({
    resolver: valibotResolver(UpdateUsernameSchema),
    defaultValues: {
      username: '',
    },
  });

  const updateEmailForm = useForm<vInput<typeof UpdateEmailSchema>>({
    resolver: valibotResolver(UpdateEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const updatePasswordForm = useForm<vInput<typeof UpdatePasswordSchema>>({
    resolver: valibotResolver(UpdatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    updateEmailForm.reset({
      email: userData?.email || '',
    });
    updateUsernameForm.reset({
      username: userData?.username || '',
    });
    updatePasswordForm.reset({
      password: '',
      confirmPassword: '',
    });
    registerMemberForm.reset({
      email: userData?.email || '',
    });

    setIsEditUsername(!Boolean(userData?.username));
    setIsEditPassword(!Boolean(userData?.username));
  }, [
    updateEmailForm,
    updateUsernameForm,
    updatePasswordForm,
    registerMemberForm,
    userData,
  ]);

  const { triggerQuery: triggerUpdateUser } = useQueryHandler({
    query: updateUser,
    queryOnMount: false,
  });
  const onSubmit = async (data: {
    email?: string;
    username?: string;
    password?: string;
  }) => {
    const res = await triggerUpdateUser({
      email: data?.email,
      username: data?.username,
      password: data?.password,
    });

    if (res.ok) router.refresh();
  };

  const updateFields: UpdateFields[] = [
    {
      name: 'username',
      label: 'Username',
      schema: UpdateUsernameSchema,
      form: updateUsernameForm,
      isEdit: isEditUsername,
      setIsEdit: setIsEditUsername,
    },
    {
      name: 'email',
      label: 'Email',
      schema: UpdateEmailSchema,
      form: updateEmailForm,
      isEdit: isEditEmail,
      setIsEdit: setIsEditEmail,
    },
    {
      name: 'password',
      label: 'Password',
      schema: UpdatePasswordSchema,
      form: updatePasswordForm,
      isEdit: isEditPassword,
      setIsEdit: setIsEditPassword,
    },
  ];

  return (
    <div>
      {!userData?.username && (
        <div className='tw-mb-4 tw-bg-secondary tw-p-2 tw-border tw-rounded-md'>
          <p>Please set your username and password first.</p>
        </div>
      )}
      {userData?.username ? (
        generateUpdateField(updateFields, userData?.role, onSubmit)
      ) : (
        <Form {...registerMemberForm}>
          <form
            onSubmit={registerMemberForm.handleSubmit(onSubmit)}
            className='tw-w-full'
          >
            <TextInputField
              control={registerMemberForm.control}
              name='username'
              label='Username'
              className='tw-full tw-grow'
            >
              <Input />
            </TextInputField>
            <TextInputField
              control={registerMemberForm.control}
              name='email'
              label='Email'
              className='tw-full tw-grow'
            >
              <Input disabled />
            </TextInputField>
            <TextInputField
              control={registerMemberForm.control}
              name='password'
              label='Password'
              className='tw-full tw-grow'
            >
              <Input type='password' />
            </TextInputField>
            <TextInputField
              control={registerMemberForm.control}
              name='confirmPassword'
              label='Confirm password'
              className='tw-full tw-grow'
            >
              <Input type='password' />
            </TextInputField>

            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default UpdateAccountForm;
