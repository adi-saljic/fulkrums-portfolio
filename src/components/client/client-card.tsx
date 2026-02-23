"use client";
import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

interface ClientCardProps {
  title: string;
  image: string;
  slug: string;
  hasPortfolio: boolean;
  hasStudyCase: boolean;
}

export default function ClientCard({
  title,
  image,
  slug,
  hasPortfolio,
  hasStudyCase,
}: ClientCardProps) {
  return (
    <div className="client-card">
      <div className="client-card-image">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </div>
      <div className="client-card-content">
        <h3 className="client-card-title">{title}</h3>
        <div className="client-card-buttons">
          {hasPortfolio && (
            <Link href={`/portfolio/${slug}`} className="tp-btn-border">
              View Portfolio
            </Link>
          )}
          {hasStudyCase && (
            <Link href={`/study-cases/${slug}`} className="tp-btn-border">
              Case Study
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
