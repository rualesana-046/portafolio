import { CircleAlert } from "lucide-react";
import type { ChangeEvent } from "react";
import { cn } from "@/lib/cn";

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

interface FormFieldProps {
  readonly id: string;
  readonly label: string;
  readonly placeholder: string;
  readonly value: string;
  readonly error?: string;
  readonly help?: string;
  readonly counter?: string;
  readonly remaining?: string;
  readonly isCounterOver?: boolean;
  readonly multiline?: boolean;
  readonly type?: "text" | "email";
  readonly autoComplete?: string;
  readonly maxLength?: number;
  readonly fieldRef: (element: FieldElement | null) => void;
  readonly onChange: (event: ChangeEvent<FieldElement>) => void;
  readonly onBlur: () => void;
}

const fieldClassName =
  "focus-ring-letter w-full rounded-md border bg-letter-paper-light/70 px-3 py-2.5 text-base text-letter-ink placeholder:text-letter-muted";

export function FormField({
  id,
  label,
  placeholder,
  value,
  error,
  help,
  counter,
  remaining,
  isCounterOver = false,
  multiline = false,
  type = "text",
  autoComplete,
  maxLength,
  fieldRef,
  onChange,
  onBlur,
}: FormFieldProps) {
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const remainingId = `${id}-remaining`;
  const describedBy = [help && helpId, remaining && remainingId, error && errorId].filter(Boolean).join(" ") || undefined;
  const sharedProps = {
    id,
    name: id,
    value,
    placeholder,
    required: true,
    maxLength,
    onChange,
    onBlur,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: cn(fieldClassName, error ? "border-letter-danger" : "border-letter-line"),
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-semibold text-letter-ink">
        {label}
      </label>
      {multiline ? (
        <textarea ref={fieldRef} rows={6} {...sharedProps} className={cn(sharedProps.className, "resize-y")} />
      ) : (
        <input ref={fieldRef} type={type} autoComplete={autoComplete} {...sharedProps} />
      )}
      {(help || counter) && (
        <div className="flex items-start justify-between gap-3 text-sm text-letter-muted">
          {help && <p id={helpId}>{help}</p>}
          {counter && (
            <span aria-hidden="true" className={cn("ml-auto tabular-nums", isCounterOver && "text-letter-danger")}>
              {counter}
            </span>
          )}
          {remaining && (
            <span id={remainingId} className="sr-only">
              {remaining}
            </span>
          )}
        </div>
      )}
      {error && (
        <p id={errorId} className="flex items-start gap-1.5 text-sm font-semibold text-letter-danger">
          <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
