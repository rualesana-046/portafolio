"use client";

import { Copy } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useCallback, useMemo } from "react";
import { BurntLetter } from "@/components/ui/BurntLetter";
import { Envelope } from "@/components/ui/Envelope";
import { FormField } from "@/components/ui/FormField";
import { LazyIllustration } from "@/components/ui/LazyIllustration";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { WAX_SEAL_PRESS_MS, WaxSeal } from "@/components/ui/WaxSeal";
import { contact } from "@/data/contact";
import { illustrations } from "@/data/illustrations";
import { sections } from "@/data/sections";
import { socialLinks } from "@/data/social-links";
import { formStatusMessages, ui, validationMessages } from "@/data/ui";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useLocalized } from "@/hooks/useLocalized";
import { cn } from "@/lib/cn";
import { openUrl } from "@/lib/dom";
import { buildMailtoUrl, composeLetter, formatLetterForClipboard, getEmailAddress } from "@/lib/mailto";
import {
  codePointLength,
  EMAIL_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  NAME_MAX_LENGTH,
  SUBJECT_MAX_LENGTH,
} from "@/lib/validators";
import type { ContactFieldName, ContactFormValues, LetterLabels } from "@/types/contact";

const EMAIL_ADDRESS = getEmailAddress(socialLinks) ?? "";
const TITLE_ID = "contact-letter-title";
const ELSEWHERE_ID = "contact-elsewhere";
const FIELD_ID: Record<ContactFieldName, string> = {
  name: "contact-name",
  email: "contact-email",
  subject: "contact-subject",
  message: "contact-message",
};

export function Contact() {
  const t = useLocalized();
  const shouldReduceMotion = useReducedMotion();

  const labels = useMemo<LetterLabels>(
    () => ({
      subjectPrefix: t(ui.mailSubjectPrefix),
      name: t(ui.mailBodyName),
      email: t(ui.mailBodyEmail),
      message: t(ui.mailBodyMessage),
      to: t(ui.mailTo),
      subject: t(ui.mailSubject),
    }),
    [t],
  );

  const openLetter = useCallback(
    (values: ContactFormValues) => openUrl(buildMailtoUrl(EMAIL_ADDRESS, composeLetter(values, labels))),
    [labels],
  );
  const getClipboardText = useCallback(
    (values: ContactFormValues) => formatLetterForClipboard(EMAIL_ADDRESS, composeLetter(values, labels), labels),
    [labels],
  );

  const form = useFormValidation({
    stampDelay: shouldReduceMotion ? 0 : WAX_SEAL_PRESS_MS,
    onOpen: openLetter,
    getClipboardText,
  });

  const messageLength = codePointLength(form.values.message);
  const isProblemStatus = form.status === "copyFailed" || (form.status === "idle" && form.showFormErrors);
  const statusMessage =
    form.status === "idle" ? (form.showFormErrors ? t(ui.formHasErrors) : "") : t(formStatusMessages[form.status]);

  const fieldProps = (field: ContactFieldName) => {
    const error = form.errors[field];
    return {
      id: FIELD_ID[field],
      label: t(contact.fields[field].label),
      placeholder: t(contact.fields[field].placeholder),
      value: form.values[field],
      error: error ? t(validationMessages[error]) : undefined,
      fieldRef: form.registerField(field),
      onChange: form.handleChange(field),
      onBlur: form.handleBlur(field),
    };
  };

  return (
    <Section id="contact" heading={sections.contact}>
      <Reveal className="mx-auto max-w-3xl">
        <Envelope
          label={t(ui.openLetter)}
          hint={t(ui.envelopeHint)}
          pointerFocusId={TITLE_ID}
          keyboardFocusId={FIELD_ID.name}
        >
          <BurntLetter>
            <div className="space-y-5">
              <h3 id={TITLE_ID} tabIndex={-1} className="font-title text-3xl font-semibold outline-none sm:text-4xl">
                {t(contact.title)}
              </h3>
              <LazyIllustration
                illustration={illustrations.perchedOwl}
                className="hidden sm:float-right sm:mb-3 sm:ml-8 sm:block sm:w-40"
              />
              <p className="text-lg italic">{t(contact.greeting)}</p>
              <p className="text-base leading-relaxed sm:text-lg">{t(contact.body)}</p>
              <form noValidate aria-labelledby={TITLE_ID} onSubmit={form.handleSubmit} className="flex flex-col gap-5 sm:clear-both">
                <p className="text-sm text-letter-muted">{t(ui.allFieldsRequired)}</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField {...fieldProps("name")} autoComplete="name" maxLength={NAME_MAX_LENGTH} />
                  <FormField {...fieldProps("email")} type="email" autoComplete="email" maxLength={EMAIL_MAX_LENGTH} />
                </div>
                <FormField
                  {...fieldProps("subject")}
                  maxLength={SUBJECT_MAX_LENGTH}
                  help={`${t(ui.upTo)} ${SUBJECT_MAX_LENGTH} ${t(ui.characters)}.`}
                />
                <FormField
                  {...fieldProps("message")}
                  multiline
                  help={`${t(ui.between)} ${MESSAGE_MIN_LENGTH} ${t(ui.and)} ${MESSAGE_MAX_LENGTH} ${t(ui.characters)}.`}
                  counter={`${messageLength} / ${MESSAGE_MAX_LENGTH}`}
                  isCounterOver={messageLength > MESSAGE_MAX_LENGTH}
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="focus-ring-letter inline-flex items-center justify-center gap-3 rounded-full bg-letter-ink py-2 pl-2 pr-6 font-semibold text-letter-paper-light transition hover:bg-letter-ink/90"
                  >
                    <WaxSeal isPressing={form.status === "stamping"} className="h-11 w-11" />
                    {t(ui.sendLetter)}
                  </button>
                  <button
                    type="button"
                    onClick={form.copyLetter}
                    className="focus-ring-letter inline-flex items-center justify-center gap-2 rounded-full border border-letter-line px-5 py-3 font-semibold text-letter-ink transition hover:bg-letter-paper-light"
                  >
                    <Copy aria-hidden="true" className="h-4 w-4" />
                    {t(ui.copyMessage)}
                  </button>
                </div>
                <p
                  role="status"
                  aria-live="polite"
                  className={cn("min-h-6 text-sm font-semibold", isProblemStatus ? "text-letter-danger" : "text-letter-ink")}
                >
                  {statusMessage}
                </p>
              </form>
              <p className="text-right italic text-letter-muted">{t(contact.signature)}</p>
            </div>
          </BurntLetter>
        </Envelope>
      </Reveal>
      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <p id={ELSEWHERE_ID} className="text-muted">
          {t(ui.contactElsewhere)}
        </p>
        <SocialLinks variant="labeled" labelledBy={ELSEWHERE_ID} />
      </div>
    </Section>
  );
}
