"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getClientDataSources } from "@/lib/client-helpers";

import { ProjectShape, RightArrow } from "../svg";

// Client data with images
const clientsData = [
  {
    slug: "zamzam-project",
    title: "Zamzam Project",
    image:
      "https://lh3.googleusercontent.com/d/1wdltTWMil6MlFZkRR2JTskE0_6DtIdIJ",
  },
  {
    slug: "quickie-liga",
    title: "Quickie Liga",
    image:
      "https://lh3.googleusercontent.com/d/1Dagvblv3IaDb34ZrQoKxr8xYXb4TWxgS",
  },
  {
    slug: "it-works-marketing",
    title: "It Works",
    image:
      "https://lh3.googleusercontent.com/d/19i6ZjuYoBgHOhFJw-bC2kcyCUoif7uhr",
  },
  {
    slug: "green-concept-houses",
    title: "Green Concept Houses",
    image:
      "https://lh3.googleusercontent.com/d/1gLBiiTUSgRbr7GdVv3-JghJQVJ97x_2F",
  },
  {
    slug: "getenergy",
    title: "Get Energy",
    image:
      "https://lh3.googleusercontent.com/d/1BukMDRuSppdwOwLoTs-IGPbhcEu33zHj",
  },
  {
    slug: "cheyf",
    title: "Cheyf",
    image:
      "https://lh3.googleusercontent.com/d/1GH5azLN2Ex4y25AStOHP-f-PA8lzoi93",
  },
  {
    slug: "cheyf-accommodation",
    title: "Cheyf Accommodations",
    image:
      "https://lh3.googleusercontent.com/d/1GH5azLN2Ex4y25AStOHP-f-PA8lzoi93",
  },
  {
    slug: "atleta",
    title: "Atletska Kondicija",
    image:
      "https://lh3.googleusercontent.com/d/1mEnrbZy5w0lAg-IwQAXbUvFMGVVhrgar",
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
            <div className="col-xl-7">
              <div className="tp-project-3-title-box p-relative mb-150">
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
                <div key={item.id} className="tp-project-3-wrap">
                  <div className="row">
                    {/* Left Image */}
                    <div className="col-xl-4 col-lg-4">
                      <div
                        className="tp-project-3-thumb pro-img-1"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "400px",
                        }}
                      >
                        <Image
                          src={item.client_1.image}
                          alt={item.client_1.title}
                          width={700}
                          height={1500}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            objectFit: "contain",
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
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          gap: "50px",
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
                            style={{ fontSize: "24px", marginBottom: "10px" }}
                          >
                            {item.client_1.title}
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              justifyContent: "flex-start",
                            }}
                          >
                            {dataSource1.hasPortfolio && (
                              <Link
                                href={`/portfolio/${item.client_1.slug}`}
                                className="tp-btn-border"
                                style={{
                                  fontSize: "14px",
                                  padding: "8px 16px",
                                }}
                              >
                                Portfolio
                              </Link>
                            )}
                            {dataSource1.hasStudyCase && (
                              <Link
                                href={`/study-cases/${item.client_1.slug}`}
                                className="tp-btn-border"
                                style={{
                                  fontSize: "14px",
                                  padding: "8px 16px",
                                }}
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
                              style={{ fontSize: "24px", marginBottom: "10px" }}
                            >
                              {item.client_2.title}
                            </h4>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "flex-end",
                              }}
                            >
                              {dataSource2.hasPortfolio && (
                                <Link
                                  href={`/portfolio/${item.client_2.slug}`}
                                  className="tp-btn-border"
                                  style={{
                                    fontSize: "14px",
                                    padding: "8px 16px",
                                  }}
                                >
                                  Portfolio
                                </Link>
                              )}
                              {dataSource2.hasStudyCase && (
                                <Link
                                  href={`/study-cases/${item.client_2.slug}`}
                                  className="tp-btn-border"
                                  style={{
                                    fontSize: "14px",
                                    padding: "8px 16px",
                                  }}
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
                            height: "400px",
                          }}
                        >
                          <Image
                            src={item.client_2.image}
                            alt={item.client_2.title}
                            width={700}
                            height={1500}
                            style={{
                              height: "auto",
                              maxWidth: "100%",
                              objectFit: "contain",
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

        {/* Mobile Layout: Image, Content, Content, Image pattern */}
        <div className="row d-lg-none">
          <div className="col-12">
            {project_data.map((item) => {
              const dataSource1 = getClientDataSources(item.client_1.slug);
              const dataSource2 = item.client_2
                ? getClientDataSources(item.client_2.slug)
                : null;

              return (
                <div key={item.id} className="tp-project-3-wrap">
                  {/* Image 1 */}
                  <div className="tp-project-3-thumb pro-img-1 mb-30">
                    <Image
                      src={item.client_1.image}
                      alt={item.client_1.title}
                      style={{ height: "auto" }}
                      width={800}
                      height={600}
                    />
                  </div>

                  {/* Content 1 */}
                  <div className="tp-project-3-content text-start mb-40">
                    <h4
                      className="tp-project-3-title-sm"
                      style={{ fontSize: "32px" }}
                    >
                      {item.client_1.title}
                    </h4>
                    <div style={{ marginTop: "15px" }}>
                      {dataSource1.hasPortfolio && (
                        <Link
                          href={`/portfolio/${item.client_1.slug}`}
                          className="tp-btn-border"
                          style={{
                            marginRight: "10px",
                            display: "inline-block",
                          }}
                        >
                          Portfolio
                        </Link>
                      )}
                      {dataSource1.hasStudyCase && (
                        <Link
                          href={`/study-cases/${item.client_1.slug}`}
                          className="tp-btn-border"
                          style={{ display: "inline-block" }}
                        >
                          Case Study
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Content 2 */}
                  {item.client_2 && dataSource2 && (
                    <>
                      <div className="tp-project-3-content text-start mb-30">
                        <h4
                          className="tp-project-3-title-sm"
                          style={{ fontSize: "32px" }}
                        >
                          {item.client_2.title}
                        </h4>
                        <div style={{ marginTop: "15px" }}>
                          {dataSource2.hasPortfolio && (
                            <Link
                              href={`/portfolio/${item.client_2.slug}`}
                              className="tp-btn-border"
                              style={{
                                marginRight: "10px",
                                display: "inline-block",
                              }}
                            >
                              Portfolio
                            </Link>
                          )}
                          {dataSource2.hasStudyCase && (
                            <Link
                              href={`/study-cases/${item.client_2.slug}`}
                              className="tp-btn-border"
                              style={{ display: "inline-block" }}
                            >
                              Case Study
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Image 2 */}
                      <div className="tp-project-3-thumb pro-img-2 mb-60">
                        <Image
                          src={item.client_2.image}
                          alt={item.client_2.title}
                          style={{ height: "auto" }}
                          width={800}
                          height={600}
                        />
                      </div>
                    </>
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
