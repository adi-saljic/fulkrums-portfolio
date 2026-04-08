import { Link } from "@/i18n/routing";
import React from "react";

type IProps = {
  cls?: string;
};

export default function BigText({ cls = "" }: IProps) {
  return (
    <div className={`sv-big-text-area pb-80 ${cls}`}>
      <div className="container container-1530">
        <div className="sv-small-text-box d-flex justify-content-between">
          <span>DIGITAL CREATIVE AGENCY</span>
          <span>VIDEO PRODUKCIJA</span>
        </div>
        <div className="sv-big-text-box">
          <h4 className="sv-big-text tp-char-animation">
            <Link href="/contact">Get in Touch</Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
