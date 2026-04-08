"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from 'next-intl';
import { Turnstile } from '@marsidev/react-turnstile';
import ErrorMsg from "../error-msg";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  website?: string; // Honeypot field
};

const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  firstName: yup.string().required().label("First Name"),
  lastName: yup.string().required().label("Last Name"),
  email: yup.string().email().required().label("Email"),
  phone: yup.string().optional().label("Phone"),
  message: yup.string().required().label("Message"),
}) as any;

type IProps = {
  showModal: boolean;
  setShowModal: (() => void) | React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ContactModal({ showModal, setShowModal }: IProps) {
  const t = useTranslations('contact.modal');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [isSending, setIsSending] = React.useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [formOpenTime, setFormOpenTime] = useState<number>(0);

  // Track form open time for timing validation
  useEffect(() => {
    if (showModal) {
      setFormOpenTime(Date.now());
      setTurnstileToken(''); // Reset token when modal opens
    }
  }, [showModal]);

  const onSubmit = handleSubmit(async (data: FormData) => {
    setIsSending(true);

    try {
      // Validate Turnstile token exists
      if (!turnstileToken) {
        toast.error(t('verificationRequired'), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
        setIsSending(false);
        return;
      }

      // Call API route instead of EmailJS directly
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          message: data.message,
          website: data.website, // Honeypot field
          captchaToken: turnstileToken,
          formOpenTime: formOpenTime,
        }),
      });

      if (!response.ok) {
        const error = await response.json();

        // Handle specific error cases
        if (response.status === 429) {
          toast.error(t('rateLimitExceeded'), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'dark',
          });
        } else if (response.status === 403) {
          toast.error(t('verificationFailed'), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'dark',
          });
        } else {
          throw new Error(error.error || 'Submission failed');
        }

        setIsSending(false);
        return;
      }

      // Success
      toast.success(t('success'), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      reset();
      setTurnstileToken('');
      if (typeof setShowModal === 'function') {
        if (setShowModal.length === 0) {
          (setShowModal as () => void)();
        } else {
          (setShowModal as React.Dispatch<React.SetStateAction<boolean>>)(false);
        }
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(t('error'), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSending(false);
    }
  });

  const handleClose = () => {
    if (typeof setShowModal === 'function') {
      if (setShowModal.length === 0) {
        (setShowModal as () => void)();
      } else {
        (setShowModal as React.Dispatch<React.SetStateAction<boolean>>)(false);
      }
    }
    reset();
  };

  return (
    <>
      <ToastContainer />
      <style>{`
        .modal-60w {
          max-width: 60% !important;
        }
        @media (max-width: 768px) {
          .modal-60w {
            max-width: 95% !important;
            margin: 10px;
          }
          .tp-contact-modal .modal-body {
            padding: 30px 20px !important;
          }
        }
        .submit-btn {
          padding: 12px 40px;
          background-color: #FF6B35;
          color: #fff;
          border: none;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-block;
          text-align: center;
        }
        .submit-btn:hover {
          background-color: #fff;
          color: #FF6B35;
        }
      `}</style>
      <Modal
        show={showModal}
        onHide={handleClose}
        centered={true}
        className="tp-contact-modal"
        dialogClassName="modal-60w"
      >
      <Modal.Body style={{ backgroundColor: '#19191A', padding: '50px', position: 'relative' }}>
        <button
          onClick={handleClose}
          type="button"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <i className="fa-regular fa-xmark"></i>
        </button>

        <div className="tp-contact-modal-content">
          <h3 style={{ color: '#fff', marginBottom: '30px', textAlign: 'center', fontSize: '32px' }}>
            {t('title')}
          </h3>
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="cn-contactform-input mb-25">
                  <label style={{ color: '#fff', marginBottom: '10px', display: 'block' }}>{t('firstName')} *</label>
                  <input
                    id="firstName"
                    {...register("firstName")}
                    type="text"
                    placeholder={t('placeholders.firstName')}
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      backgroundColor: '#2a2a2a',
                      border: '1px solid #3a3a3a',
                      borderRadius: '4px',
                      color: '#fff',
                      fontSize: '16px'
                    }}
                  />
                  <ErrorMsg msg={errors.firstName?.message!} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="cn-contactform-input mb-25">
                  <label style={{ color: '#fff', marginBottom: '10px', display: 'block' }}>{t('lastName')} *</label>
                  <input
                    id="lastName"
                    {...register("lastName")}
                    type="text"
                    placeholder={t('placeholders.lastName')}
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      backgroundColor: '#2a2a2a',
                      border: '1px solid #3a3a3a',
                      borderRadius: '4px',
                      color: '#fff',
                      fontSize: '16px'
                    }}
                  />
                  <ErrorMsg msg={errors.lastName?.message!} />
                </div>
              </div>
            </div>
            <div className="cn-contactform-input mb-25">
              <label style={{ color: '#fff', marginBottom: '10px', display: 'block' }}>{t('email')} *</label>
              <input
                id="email"
                {...register("email")}
                type="email"
                placeholder={t('placeholders.email')}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #3a3a3a',
                  borderRadius: '4px',
                  color: '#fff',
                  fontSize: '16px'
                }}
              />
              <ErrorMsg msg={errors.email?.message!} />
            </div>
            <div className="cn-contactform-input mb-25">
              <label style={{ color: '#fff', marginBottom: '10px', display: 'block' }}>{t('phone')}</label>
              <input
                id="phone"
                {...register("phone")}
                type="tel"
                placeholder={t('placeholders.phone')}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #3a3a3a',
                  borderRadius: '4px',
                  color: '#fff',
                  fontSize: '16px'
                }}
              />
              <ErrorMsg msg={errors.phone?.message!} />
            </div>
            <div className="cn-contactform-input mb-25">
              <label style={{ color: '#fff', marginBottom: '10px', display: 'block' }}>{t('message')} *</label>
              <textarea
                id="message"
                {...register("message")}
                placeholder={t('placeholders.message')}
                rows={5}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #3a3a3a',
                  borderRadius: '4px',
                  color: '#fff',
                  fontSize: '16px',
                  resize: 'vertical'
                }}
              ></textarea>
              <ErrorMsg msg={errors.message?.message!} />
            </div>

            {/* Honeypot - hidden field to catch bots */}
            <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}>
              <input
                type="text"
                {...register("website")}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
            </div>

            {/* Cloudflare Turnstile - invisible bot protection */}
            <div className="mb-20">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setTurnstileToken('')}
                onExpire={() => setTurnstileToken('')}
                options={{
                  theme: 'dark',
                  size: 'invisible',
                }}
              />
            </div>

            <div className="cn-contactform-btn text-center">
              <button
                className="submit-btn"
                type="submit"
                disabled={isSending || !isValid || !turnstileToken}
                style={{
                  opacity: isSending || !isValid || !turnstileToken ? 0.5 : 1,
                  cursor: isSending || !isValid || !turnstileToken ? 'not-allowed' : 'pointer'
                }}
              >
                {isSending ? t('sending') : t('submit')}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
      </Modal>
    </>
  );
}
