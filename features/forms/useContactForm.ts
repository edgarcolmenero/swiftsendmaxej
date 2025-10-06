'use client';

import { FormEvent, useCallback, useMemo, useState } from 'react';

type ContactFields = {
  name: string;
  email: string;
  projectType: string;
  industry: string;
  message: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const initialValues: ContactFields = {
  name: '',
  email: '',
  projectType: '',
  industry: '',
  message: '',
};

export function useContactForm() {
  const [values, setValues] = useState<ContactFields>(initialValues);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const onChange = useCallback((field: keyof ContactFields, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setStatus('idle');
    setError(null);
  }, []);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!values.name || !values.email || !values.projectType || !values.message) {
        setStatus('error');
        setError('Please complete all required fields.');
        return;
      }

      setStatus('submitting');
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 600));

      setStatus('success');
    },
    [values],
  );

  const summary = useMemo(() => {
    if (!values.projectType) {
      return null;
    }

    return {
      plan: values.projectType,
      note: 'Estimated savings vs. typical agency rates.',
    };
  }, [values.projectType]);

  return {
    values,
    status,
    error,
    summary,
    onChange,
    onSubmit,
    reset,
  };
}
