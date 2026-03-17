"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getClientDataSources } from "@/lib/client-helpers";

import { ProjectShape, RightArrow } from "../svg";

/**
 * Get homepage thumbnail from S3 media map
 * Falls back to placeholder if not found
 */
function getHomepageThumbnail(slug: string, fallbackUrl?: string): string {
  try {
    const mediaMap = require('@/data/generated/media-map.json');
    const homepageThumbnails = mediaMap['homepage-thumbnails'];

    if (homepageThumbnails && homepageThumbnails[slug]) {
      return homepageThumbnails[slug];
    }
  } catch (error) {
    console.warn(`Media map not found for slug: ${slug}`);
  }

  // Return fallback or use a placeholder to prevent empty URLs
  return fallbackUrl || '/assets/img/logo/logo.png';
}

// Client data with S3 images only - no fallback URLs
const clientsData = [
  {
    slug: "zamzam",
    title: "Zamzam Project",
    image: getHomepageThumbnail("zamzam", ""),
  },
  {
    slug: "quickie-liga",
    title: "Quickie Liga",
    image: getHomepageThumbnail("quickie-liga", ""),
  },
  {
    slug: "it-works-marketing",
    title: "It Works",
    image: getHomepageThumbnail("it-works-marketing", ""),
  },
  {
    slug: "green-concept",
    title: "Green Concept Houses",
    image: getHomepageThumbnail("green-concept-houses", ""),
  },
  {
    slug: "get-energy-canada",
    title: "Get Energy",
    image: getHomepageThumbnail("getenergy", ""),
  },
  {
    slug: "cheyf",
    title: "Cheyf",
    image: getHomepageThumbnail("cheyf", ""),
  },
  {
    slug: "cheyf-accommodations",
    title: "Cheyf Accommodations",
    image: getHomepageThumbnail("cheyf-accommodation", ""),
  },
  {
    slug: "atleta",
    title: "Atletska Kondicija",
    image: getHomepageThumbnail("atleta", ""),
  },
];

// Create pairs of clients for the layout (2 clients per row)
const createProjectPairs = () => {
  const pairs = [];
  for (let i = 0; i < clientsData.length; i += 2) {
    const client1 = clientsData[i];
    const client2 = clientsData[i + 1];

    pairs.push({
      id: Math.floor(i / 2) + 1,
      client_1: client1,
      client_2: client2 || null,
    });
  }
  return pairs;
};

const project_data = createProjectPairs();

// prop type
type IProps = {
  style_2?: boolean;
  showTitle?: boolean;
};

export default function ProjectFour({
  style_2 = false,
  showTitle = true,
}: IProps) {
  const t = useTranslations("projects");

  return (
    <div
      className={`tp-project-3-area ${
        style_2 ? "pt-60 pw-project-style" : "pt-130 black-bg"
      }`}
    >
      <div className="container container-1720">
        {!style_2 && showTitle && (
          <div className="row justify-content-center">
            <div className="col-xl-12">
              <div className="tp-project-3-title-box p-relative mb-60" style={{ textAlign: "center" }}>
                <h4
                  className="tp-section-title-200 tp_reveal_anim"
                  style={{ fontSize: "80px" }}
                >
                  {t("title")} <span>{t("titleHighlight")}</span>
                </h4>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Layout: 3 columns - Image | Content | Image */}
        <div className="row d-none d-lg-block">
          <div className="col-xl-12">
            {project_data.map((item) => {
              const dataSource1 = getClientDataSources(item.client_1.slug);
              const dataSource2 = item.client_2
                ? getClientDataSources(item.client_2.slug)
                : null;

              return (
                <div
                  key={item.id}
                  className="tp-project-3-wrap"
                  style={{
                    marginTop: "clamp(60px, 7vh, 120px)",
                    marginBottom: "clamp(60px, 7vh, 120px)"
                  }}
                >
                  <div className="row align-items-center">
                    {/* Left Image */}
                    <div className="col-xl-4 col-lg-4">
                      <div
                        className="tp-project-3-thumb pro-img-1"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "clamp(400px, 55vh, 650px)",
                          maxHeight: "650px",
                        }}
                      >
                        <Image
                          src={item.client_1.image}
                          alt={item.client_1.title}
                          width={1000}
                          height={2000}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>

                    {/* Middle Content */}
                    <div className="col-xl-4 col-lg-4">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "clamp(450px, 55vh, 700px)",
                          gap: "clamp(20px, 3vh, 50px)",
                          padding: "clamp(20px, 3vh, 40px) 0",
                        }}
                      >
                        {/* Top Content - Client 1 (from left) */}
                        <div
                          className="tp-project-3-content"
                          style={{
                            textAlign: "center",
                            alignSelf: "flex-start",
                            width: "100%",
                          }}
                        >
                          <h4
                            className="tp-project-3-title-sm"
                            style={{ marginBottom: "clamp(5px, 1vh, 10px)" }}
                          >
                            {item.client_1.title}
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              gap: "clamp(15px, 2.5vw, 25px)",
                              justifyContent: "flex-start",
                              marginTop: "clamp(10px, 1.5vh, 20px)",
                              flexWrap: "wrap",
                            }}
                          >
                            {dataSource1.hasPortfolio && (
                              <Link
                                href={`/portfolio/${item.client_1.slug}`}
                                className="tp-btn-simple"
                              >
                                Portfolio
                              </Link>
                            )}
                            {dataSource1.hasStudyCase && (
                              <Link
                                href={`/study-cases/${item.client_1.slug}`}
                                className="tp-btn-simple"
                              >
                                Case Study
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Bottom Content - Client 2 (from right) */}
                        {item.client_2 && dataSource2 && (
                          <div
                            className="tp-project-3-content"
                            style={{
                              textAlign: "center",
                              alignSelf: "flex-end",
                              width: "100%",
                            }}
                          >
                            <h4
                              className="tp-project-3-title-sm"
                              style={{ marginBottom: "clamp(5px, 1vh, 10px)" }}
                            >
                              {item.client_2.title}
                            </h4>
                            <div
                              style={{
                                display: "flex",
                                gap: "clamp(15px, 2.5vw, 25px)",
                                justifyContent: "flex-end",
                                marginTop: "clamp(10px, 1.5vh, 20px)",
                                flexWrap: "wrap",
                              }}
                            >
                              {dataSource2.hasPortfolio && (
                                <Link
                                  href={`/portfolio/${item.client_2.slug}`}
                                  className="tp-btn-simple"
                                >
                                  Portfolio
                                </Link>
                              )}
                              {dataSource2.hasStudyCase && (
                                <Link
                                  href={`/study-cases/${item.client_2.slug}`}
                                  className="tp-btn-simple"
                                >
                                  Case Study
                                </Link>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Image */}
                    <div className="col-xl-4 col-lg-4">
                      {item.client_2 && (
                        <div
                          className="tp-project-3-thumb pro-img-2"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "clamp(400px, 55vh, 650px)",
                            maxHeight: "650px",
                          }}
                        >
                          <Image
                            src={item.client_2.image}
                            alt={item.client_2.title}
                            width={1000}
                            height={2000}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "20px",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout: Vertical stack - Image, Title, Buttons */}
        <div className="row d-lg-none">
          <div className="col-12">
            {project_data.map((item) => {
              const dataSource1 = getClientDataSources(item.client_1.slug);
              const dataSource2 = item.client_2
                ? getClientDataSources(item.client_2.slug)
                : null;

              return (
                <div key={item.id}>
                  {/* Project 1 */}
                  <div style={{ marginBottom: "60px", textAlign: "center" }}>
                    {/* Image */}
                    <div style={{ marginBottom: "20px" }}>
                      <Image
                        src={item.client_1.image}
                        alt={item.client_1.title}
                        width={600}
                        height={800}
                        style={{
                          height: "auto",
                          width: "100%",
                          maxWidth: "100%",
                          objectFit: "contain",
                          margin: "0 auto"
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                        loading="lazy"
                      />
                    </div>

                    {/* Title */}
                    <h4
                      className="tp-project-3-title-sm"
                      style={{
                        fontSize: "28px",
                        marginBottom: "20px",
                        textAlign: "center"
                      }}
                    >
                      {item.client_1.title}
                    </h4>

                    {/* Buttons */}
                    <div style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "nowrap",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "0"
                    }}>
                      {dataSource1.hasPortfolio && (
                        <Link
                          href={`/portfolio/${item.client_1.slug}`}
                          className="tp-btn-border"
                          style={{
                            fontSize: "16px",
                            padding: "0 35px",
                            height: "50px",
                            lineHeight: "50px",
                            minWidth: "140px"
                          }}
                        >
                          <span className="tp-btn-border-wrap">
                            <span className="text-1">Portfolio</span>
                            <span className="text-2">Portfolio</span>
                          </span>
                        </Link>
                      )}
                      {dataSource1.hasStudyCase && (
                        <Link
                          href={`/study-cases/${item.client_1.slug}`}
                          className="tp-btn-border"
                          style={{
                            fontSize: "16px",
                            padding: "0 35px",
                            height: "50px",
                            lineHeight: "50px",
                            minWidth: "160px"
                          }}
                        >
                          <span className="tp-btn-border-wrap">
                            <span className="text-1">Case Study</span>
                            <span className="text-2">Case Study</span>
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Project 2 */}
                  {item.client_2 && dataSource2 && (
                    <div style={{ marginBottom: "60px", textAlign: "center" }}>
                      {/* Image */}
                      <div style={{ marginBottom: "20px" }}>
                        <Image
                          src={item.client_2.image}
                          alt={item.client_2.title}
                          width={600}
                          height={800}
                          style={{
                            height: "auto",
                            width: "100%",
                            maxWidth: "100%",
                            objectFit: "contain",
                            margin: "0 auto"
                          }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={false}
                          loading="lazy"
                        />
                      </div>

                      {/* Title */}
                      <h4
                        className="tp-project-3-title-sm"
                        style={{
                          fontSize: "28px",
                          marginBottom: "20px",
                          textAlign: "center"
                        }}
                      >
                        {item.client_2.title}
                      </h4>

                      {/* Buttons */}
                      <div style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "nowrap",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "0"
                      }}>
                        {dataSource2.hasPortfolio && (
                          <Link
                            href={`/portfolio/${item.client_2.slug}`}
                            className="tp-btn-border"
                            style={{
                              fontSize: "16px",
                              padding: "0 35px",
                              height: "50px",
                              lineHeight: "50px",
                              minWidth: "140px"
                            }}
                          >
                            <span className="tp-btn-border-wrap">
                              <span className="text-1">Portfolio</span>
                              <span className="text-2">Portfolio</span>
                            </span>
                          </Link>
                        )}
                        {dataSource2.hasStudyCase && (
                          <Link
                            href={`/study-cases/${item.client_2.slug}`}
                            className="tp-btn-border"
                            style={{
                              fontSize: "16px",
                              padding: "0 35px",
                              height: "50px",
                              lineHeight: "50px",
                              minWidth: "160px"
                            }}
                          >
                            <span className="tp-btn-border-wrap">
                              <span className="text-1">Case Study</span>
                              <span className="text-2">Case Study</span>
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
