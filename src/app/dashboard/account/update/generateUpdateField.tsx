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
          'tw-w-full tw-flex tw-items-center tw-gap-2',
          field.name === 'password' && field.isEdit
            ? 'tw-flex-col !tw-items-start'
            : ''
        )}
      >
        <TextInputField
          control={field.form.control}
          name={field.name}
          label={field.label}
          className={cn(
            'tw-full tw-grow tw-self-stretch',
            field.name === 'password' && field.isEdit && 'tw-pr-12'
          )}
        >
          <Input
            disabled={!field.isEdit}
            type={field.name === 'password' ? 'password' : 'text'}
          />
        </TextInputField>
        <div
          className={cn(
            'tw-flex tw-items-center',
            field.name === 'password' && field.isEdit && 'tw-grow tw-w-full'
          )}
        >
          {field.isEdit && field.name === 'password' && (
            <TextInputField
              control={field.form.control}
              name='confirmPassword'
              label='Confirm password'
              className='tw-full tw-grow'
            >
              <Input type='password' />
            </TextInputField>
          )}
          {field.isEdit ? (
            <>
              <Button
                type='submit'
                variant={'ghost'}
                className='tw-mb-2 !tw-px-2'
              >
                <Check aria-label={`Submit updated ${field.name}`} />
              </Button>
              <Button
                variant={'ghost'}
                onClick={() => {
                  field.setIsEdit(false);
                  field.form.reset();
                }}
                className='tw-mb-2 !tw-px-2'
              >
                <X aria-label={`Cancel editing ${field.name}`} />
              </Button>
            </>
          ) : (
            <Button
              variant={'ghost'}
              onClick={() => field.setIsEdit(true)}
              className='tw-mb-2 !tw-px-2'
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
