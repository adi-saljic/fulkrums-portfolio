"use client";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from 'next-intl';
import ErrorMsg from "../error-msg";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
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

  const onSubmit = handleSubmit(async (data: FormData) => {
    setIsSending(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: `${data.firstName} ${data.lastName}`,
          from_email: data.email,
          phone: data.phone || "Not provided",
          message: data.message,
          to_email: "office@fulkrums.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast.success(t('success'), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      reset();
      if (typeof setShowModal === 'function') {
        if (setShowModal.length === 0) {
          (setShowModal as () => void)();
        } else {
          (setShowModal as React.Dispatch<React.SetStateAction<boolean>>)(false);
        }
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
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
            <div className="cn-contactform-btn text-center">
              <button
                className="submit-btn"
                type="submit"
                disabled={isSending || !isValid}
                style={{
                  opacity: isSending || !isValid ? 0.5 : 1,
                  cursor: isSending || !isValid ? 'not-allowed' : 'pointer'
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
