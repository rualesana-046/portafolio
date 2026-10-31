import type {
  ContactFieldName,
  ContactFormErrors,
  ContactFormValues,
  ValidationErrorCode,
} from "@/types/contact";

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 60;
export const EMAIL_MAX_LENGTH = 254;
export const EMAIL_LOCAL_MAX_LENGTH = 64;
export const SUBJECT_MIN_LENGTH = 3;
export const SUBJECT_MAX_LENGTH = 120;
export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 1000;

export const CONTACT_FIELDS: readonly ContactFieldName[] = ["name", "email", "subject", "message"];

const NAME_PATTERN = /^\p{L}+(?:[ '’-]\p{L}+)*$/u;
const EMAIL_PATTERN =
  /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

export function normalizeInput(value: string): string {
  return value.normalize("NFC").trim();
}

export function codePointLength(value: string): number {
  return Array.from(value).length;
}

function validateName(value: string): ValidationErrorCode | undefined {
  const length = codePointLength(value);
  if (length > NAME_MAX_LENGTH) {
    return "nameTooLong";
  }
  return length < NAME_MIN_LENGTH || !NAME_PATTERN.test(value) ? "invalidName" : undefined;
}

function validateEmail(value: string): ValidationErrorCode | undefined {
  const localPart = value.split("@")[0] ?? "";
  const isWithinLimits =
    codePointLength(value) <= EMAIL_MAX_LENGTH && codePointLength(localPart) <= EMAIL_LOCAL_MAX_LENGTH;
  return isWithinLimits && EMAIL_PATTERN.test(value) ? undefined : "invalidEmail";
}

function validateSubject(value: string): ValidationErrorCode | undefined {
  const length = codePointLength(value);
  if (length < SUBJECT_MIN_LENGTH) {
    return "subjectTooShort";
  }
  return length > SUBJECT_MAX_LENGTH ? "subjectTooLong" : undefined;
}

function validateMessage(value: string): ValidationErrorCode | undefined {
  const length = codePointLength(value);
  if (length < MESSAGE_MIN_LENGTH) {
    return "messageTooShort";
  }
  return length > MESSAGE_MAX_LENGTH ? "messageTooLong" : undefined;
}

const fieldValidators: Record<ContactFieldName, (value: string) => ValidationErrorCode | undefined> = {
  name: validateName,
  email: validateEmail,
  subject: validateSubject,
  message: validateMessage,
};

export function validateField(field: ContactFieldName, rawValue: string): ValidationErrorCode | undefined {
  const value = normalizeInput(rawValue);
  return value === "" ? "required" : fieldValidators[field](value);
}

export function validateForm(values: ContactFormValues): ContactFormErrors {
  return CONTACT_FIELDS.reduce<ContactFormErrors>((errors, field) => {
    const error = validateField(field, values[field]);
    return error ? { ...errors, [field]: error } : errors;
  }, {});
}

export function normalizeValues(values: ContactFormValues): ContactFormValues {
  return {
    name: normalizeInput(values.name),
    email: normalizeInput(values.email),
    subject: normalizeInput(values.subject),
    message: normalizeInput(values.message),
  };
}
