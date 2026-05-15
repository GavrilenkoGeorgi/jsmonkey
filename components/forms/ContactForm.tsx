import { FC, useRef, useState } from "react";
import {
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "react-aria-components";

import { sendContactMsg } from "../../utils/mailSender";
import { isError } from "../../utils";
import { toastTypes } from "../../types";

import * as z from "zod";
import * as gtag from "../../utils/gtag";
import Button from "../layout/Button";
import styles from "./ContactForm.module.sass";
import globalStyles from "../../styles/Main.module.scss";

import { useToastMsgContext } from "../../context/toastMsgStore";

const ContactFormSchema = z.object({
  email: z.email("Please enter a valid email address"),
  message: z
    .string()
    .min(2, "Message must be at least 2 characters")
    .max(500, "Message cannot exceed 500 characters"),
});

const ContactForm: FC = () => {
  const { setToastMsg } = useToastMsgContext();
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: "", message: "" });
  const formStarted = useRef(false);

  const validateField = (name: "email" | "message", value: string) => {
    const result = ContactFormSchema.shape[name].safeParse(value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: result.success ? "" : result.error.issues[0].message,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Honeypot check — bots fill fields humans never see
    if (data.website) {
      form.reset();
      setToastMsg({ message: "Nice! )", type: toastTypes.success });
      return;
    }

    const result = ContactFormSchema.safeParse(data);
    if (!result.success) {
      const errors: Partial<Record<"email" | "message", string>> = {};
      result.error.issues.forEach((issue) => {
        const field = String(issue.path[0]) as "email" | "message";
        if (!errors[field]) errors[field] = issue.message;
      });
      setFieldErrors({
        email: errors.email ?? "",
        message: errors.message ?? "",
      });
      gtag.event({
        action: "contact_form_error",
        category: "engagement",
        label: Object.keys(errors).join(","),
      });
      return;
    }

    setSubmitting(true);

    try {
      const submit = await sendContactMsg(result.data);
      if (isError(submit)) {
        setToastMsg({ message: submit.message, type: toastTypes.error });
      } else {
        form.reset();
        setFieldErrors({ email: "", message: "" });
        gtag.event({ action: "contact_form_success", category: "engagement" });
        setToastMsg({ message: "Nice! )", type: toastTypes.success });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={globalStyles.containerMd}
      onFocus={() => {
        if (!formStarted.current) {
          formStarted.current = true;
          gtag.event({ action: "contact_form_start", category: "engagement" });
        }
      }}
    >
      <h2 className={styles.title}>Get in Touch</h2>
      <Form
        className={styles.form}
        validationBehavior="aria"
        onSubmit={handleSubmit}
      >
        {/* Honeypot field — must stay visually hidden, not type="hidden" */}
        <input
          type="text"
          name="website"
          className={styles.honeypot}
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
        />

        <TextField
          name="email"
          type="email"
          autoComplete="email"
          className={styles.field}
          isInvalid={!!fieldErrors.email}
        >
          <Label>Email</Label>
          <Input
            placeholder="Your email*"
            onBlur={(e) => validateField("email", e.target.value)}
          />
          <div className={styles.fieldErrorSlot}>
            <FieldError className={styles.errorMsg}>
              {fieldErrors.email}
            </FieldError>
          </div>
        </TextField>

        <TextField
          name="message"
          className={styles.field}
          isInvalid={!!fieldErrors.message}
        >
          <Label>Message</Label>
          <TextArea
            rows={5}
            placeholder="Message*"
            onBlur={(e) => validateField("message", e.target.value)}
          />
          <div className={styles.fieldErrorSlot}>
            <FieldError className={styles.errorMsg}>
              {fieldErrors.message}
            </FieldError>
          </div>
        </TextField>

        <Button type="submit" label="Submit" submitting={submitting} />
      </Form>
    </div>
  );
};

export default ContactForm;
