import { Check, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { UpdateFields } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function generateUpdateField(
  updateFields: UpdateFields[],
  userRole: string,
  onSubmit: (
    //eslint-disable-next-line
    data: { email?: string; username?: string; password?: string },
    //eslint-disable-next-line
    action: unknown
  ) => void
) {
  return updateFields.map((field) => (
    <Form key={field.name} {...field.form}>
      <form
        onSubmit={field.form.handleSubmit(onSubmit)}
        className={cn(
          'w-full flex items-center gap-2',
          field.name === 'password' && field.isEdit
            ? 'flex-col !items-start'
            : ''
        )}
      >
        <TextInputField
          control={field.form.control}
          name={field.name}
          label={field.label}
          className={cn(
            'full grow self-stretch',
            field.name === 'password' && field.isEdit && 'pr-12'
          )}
        >
          <Input
            disabled={!field.isEdit}
            type={field.name === 'password' ? 'password' : 'text'}
          />
        </TextInputField>
        <div
          className={cn(
            'flex items-center',
            field.name === 'password' && field.isEdit && 'grow w-full'
          )}
        >
          {field.isEdit && field.name === 'password' && (
            <TextInputField
              control={field.form.control}
              name='confirmPassword'
              label='Confirm password'
              className='full grow'
            >
              <Input type='password' />
            </TextInputField>
          )}
          {field.isEdit ? (
            <>
              <Button type='submit' variant={'ghost'} className='mb-2 !px-2'>
                <Check aria-label={`Submit updated ${field.name}`} />
              </Button>
              <Button
                variant={'ghost'}
                onClick={() => {
                  field.setIsEdit(false);
                  field.form.reset();
                }}
                className='mb-2 !px-2'
              >
                <X aria-label={`Cancel editing ${field.name}`} />
              </Button>
            </>
          ) : (
            <Button
              variant={'ghost'}
              onClick={() => field.setIsEdit(true)}
              className='mb-2 !px-2'
              disabled={
                field.form.formState.isSubmitting ||
                (field.name === 'email' && userRole !== 'SUPER_ADMIN')
              }
            >
              <Pencil aria-label='Edit field' />
            </Button>
          )}
        </div>
      </form>
    </Form>
  ));
}
