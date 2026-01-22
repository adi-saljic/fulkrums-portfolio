"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { ProjectShape, RightArrow } from "../svg";
import cta from "@/assets/img/home-03/cta/cta-1.png";
import ContactModal from "../modal/contact-modal";
import { useContactModal } from '@/context/contact-modal-context';

export default function ContactOne() {
  const t = useTranslations('contact');
  const { showModal, openModal, closeModal } = useContactModal();

  return (
    <>
      <div className="tp-cta-area black-bg pt-120 pb-120 z-index fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="tp-cta-title-box text-center">
                <h4 className="tp-cta-title cta-text" style={{ fontSize: "clamp(50px, 6vw, 80px)", lineHeight: "1.3", marginBottom: "40px" }}>
                  {t('title')} <span>{t('titleHighlight')}</span>
                </h4>
                <p className="tp_fade_bottom" style={{ fontSize: "18px", maxWidth: "700px", margin: "0 auto 50px" }}>
                  {t('description')}
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      openModal();
                    }}
                    style={{
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "16px 35px",
                      backgroundColor: "#fff",
                      color: "#000",
                      border: "none",
                      borderRadius: "50px",
                      fontSize: "16px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      textTransform: "capitalize"
                    }}
                  >
                    {t('button')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal showModal={showModal} setShowModal={closeModal} />
    </>
  );
}
