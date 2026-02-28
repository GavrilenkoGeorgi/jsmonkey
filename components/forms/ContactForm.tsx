import { FC, useCallback, useState } from "react";
import { useReCaptcha } from "next-recaptcha-v3";

import { sendContactMsg } from "../../utils/mailSender";
import { validateToken } from "../../utils/reCaptcha";
import { isError } from "../../utils";
import { contactFormMessage, toastTypes } from "../../types";

import Button from "../layout/Button";
import styles from "./ContactForm.module.sass";
import globalStyles from "../../styles/Main.module.scss";

import { useToastMsgContext } from "../../context/toastMsgStore";

interface FieldErrors {
  email: string | null;
  message: string | null;
}

const ContactForm: FC = () => {
  const { setToastMsg } = useToastMsgContext();

  const { executeRecaptcha } = useReCaptcha();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({
    email: null,
    message: null,
  });

  const validateEmail = (email: string): string | null => {
    if (!email || email.trim() === "") return "Email is required";
    if (email.length < 2) return "Email is too short";
    if (email.length > 33) return "Email is too long";
    return null;
  };

  const validateMessage = (msg: string): string | null => {
    if (!msg || msg.trim() === "") return "Message is required";
    if (msg.length < 2) return "Message is too short";
    if (msg.length > 500) return "Message is too long";
    return null;
  };

  const handleFieldBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    let error: string | null = null;

    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "message") {
      error = validateMessage(value);
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = useCallback(
    async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const formProps = Object.fromEntries(formData);

      // Validate all fields before submitting
      const emailError = validateEmail(String(formProps.email));
      const messageError = validateMessage(String(formProps.message));

      if (emailError || messageError) {
        setErrors({ email: emailError, message: messageError });
        return;
      }

      setSubmitting(true);

      const token = await executeRecaptcha("submit");
      const tokenScore = await validateToken(token);

      // submit and show errors
      if (isError(tokenScore)) {
        setToastMsg({
          message: tokenScore.message,
          type: toastTypes.error,
        });
      } else if (tokenScore.score < 0.5) {
        setToastMsg({
          message: `reCaptcha score is too low ${tokenScore.score}`,
          type: toastTypes.error,
        });
      } else {
        // all ok
        const msg: contactFormMessage = {
          email: String(formProps.email),
          message: String(formProps.message),
        };
        const submit = await sendContactMsg(msg);
        if (isError(submit)) {
          // can't send email
          setToastMsg({
            message: submit.message,
            type: toastTypes.error,
          });
        } else {
          form.reset();
          setErrors({ email: null, message: null });
          setToastMsg({
            message: "Nice! )",
            type: toastTypes.success,
          });
        }
      }
      setSubmitting(false);
    },
    [executeRecaptcha, setToastMsg],
  );

  return (
    <div className={globalStyles.containerMd}>
      <h2 className={styles.title}>Get in Touch</h2>
      <form onSubmit={handleSubmit} method="post" className={styles.form}>
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email*"
          required
          minLength={2}
          maxLength={33}
          autoComplete="true"
          onBlur={handleFieldBlur}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className={styles.errorMsg}>
            {errors.email}
          </p>
        )}

        <label htmlFor="message">Message</label>
        <textarea
          rows={5}
          id="message"
          name="message"
          placeholder="Message*"
          required
          minLength={2}
          maxLength={500}
          onBlur={handleFieldBlur}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className={styles.errorMsg}>
            {errors.message}
          </p>
        )}

        <Button type="submit" label="Submit" submitting={submitting} />
      </form>
    </div>
  );
};

export default ContactForm;
