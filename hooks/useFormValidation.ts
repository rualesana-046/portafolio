import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CONTACT_FIELDS, normalizeValues, validateForm } from "@/lib/validators";
import type { ContactFieldName, ContactFormErrors, ContactFormStatus, ContactFormValues } from "@/types/contact";

type FieldElement = HTMLInputElement | HTMLTextAreaElement;
type TouchedFields = Partial<Record<ContactFieldName, boolean>>;

const EMPTY_VALUES: ContactFormValues = { name: "", email: "", subject: "", message: "" };
const ALL_TOUCHED: TouchedFields = { name: true, email: true, subject: true, message: true };

interface FormValidationOptions {
  readonly stampDelay: number;
  readonly onOpen: (values: ContactFormValues) => void;
  readonly getClipboardText: (values: ContactFormValues) => string;
}

export interface FormValidation {
  readonly values: ContactFormValues;
  readonly errors: ContactFormErrors;
  readonly status: ContactFormStatus;
  readonly showFormErrors: boolean;
  readonly registerField: (field: ContactFieldName) => (element: FieldElement | null) => void;
  readonly handleChange: (field: ContactFieldName) => (event: ChangeEvent<FieldElement>) => void;
  readonly handleBlur: (field: ContactFieldName) => () => void;
  readonly handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  readonly copyLetter: () => Promise<void>;
}

export function useFormValidation({ stampDelay, onOpen, getClipboardText }: FormValidationOptions): FormValidation {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [touched, setTouched] = useState<TouchedFields>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const fieldRefs = useRef<Partial<Record<ContactFieldName, FieldElement | null>>>({});
  const timerRef = useRef<number | undefined>(undefined);

  const allErrors = useMemo(() => validateForm(values), [values]);
  const errors = useMemo(
    () =>
      CONTACT_FIELDS.reduce<ContactFormErrors>((visible, field) => {
        const error = allErrors[field];
        return touched[field] && error ? { ...visible, [field]: error } : visible;
      }, {}),
    [allErrors, touched],
  );

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const registerField = useCallback(
    (field: ContactFieldName) => (element: FieldElement | null) => {
      fieldRefs.current[field] = element;
    },
    [],
  );

  const handleChange = useCallback(
    (field: ContactFieldName) => (event: ChangeEvent<FieldElement>) => {
      const { value } = event.target;
      setValues((previous) => ({ ...previous, [field]: value }));
      setStatus((previous) => (previous === "stamping" ? previous : "idle"));
    },
    [],
  );

  const handleBlur = useCallback(
    (field: ContactFieldName) => () => setTouched((previous) => ({ ...previous, [field]: true })),
    [],
  );

  const ensureValid = useCallback((): ContactFormValues | undefined => {
    setTouched(ALL_TOUCHED);
    setHasSubmitted(true);
    const firstInvalid = CONTACT_FIELDS.find((field) => allErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return undefined;
    }
    return normalizeValues(values);
  }, [allErrors, values]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (status === "stamping") {
        return;
      }
      const validValues = ensureValid();
      if (!validValues) {
        return;
      }
      setStatus("stamping");
      timerRef.current = window.setTimeout(() => {
        onOpen(validValues);
        setStatus("opened");
      }, stampDelay);
    },
    [ensureValid, onOpen, stampDelay, status],
  );

  const copyLetter = useCallback(async () => {
    const validValues = ensureValid();
    if (!validValues) {
      return;
    }
    try {
      await navigator.clipboard.writeText(getClipboardText(validValues));
      setStatus("copied");
    } catch {
      setStatus("copyFailed");
    }
  }, [ensureValid, getClipboardText]);

  return {
    values,
    errors,
    status,
    showFormErrors: hasSubmitted && Object.keys(allErrors).length > 0,
    registerField,
    handleChange,
    handleBlur,
    handleSubmit,
    copyLetter,
  };
}
