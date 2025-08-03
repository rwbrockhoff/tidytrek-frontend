import { Stack } from '@/components/layout';
import { TextField } from '@/components/alpine';
import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';

type ZodInputs = {
  password: string;
  confirmPassword: string;
  emailCode: string;
};

type PasswordChangeFormFieldsProps = {
  formErrors: ZodFormErrors<ZodInputs> | null;
  onClearErrors: (e: InputEvent | TextAreaEvent) => void;
};

export const PasswordChangeFormFields = ({
  formErrors,
  onClearErrors,
}: PasswordChangeFormFieldsProps) => {
  return (
    <Stack className="gap-1">
      <TextField.Input
        name="password"
        label="New Password"
        error={formErrors?.password}
        onChange={onClearErrors}
        type="password"
        placeholder="New Password"
      />

      <TextField.Input
        name="confirmPassword"
        label="Confirm Password"
        error={formErrors?.confirmPassword}
        onChange={onClearErrors}
        type="password"
        placeholder="Confirm Password"
      />

      <TextField.Input
        name="emailCode"
        label="Email Code"
        error={formErrors?.emailCode}
        onChange={onClearErrors}
        placeholder="Email Code"
      />
    </Stack>
  );
};