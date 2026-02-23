"use client";
import React from "react";
import ClientCard from "./client-card";
import { getClientDataSources } from "@/lib/client-helpers";

export interface ClientData {
  slug: string;
  title: string;
  image: string;
}

interface ClientCardsSectionProps {
  clients: ClientData[];
}

export default function ClientCardsSection({ clients }: ClientCardsSectionProps) {
  return (
    <div className="tp-client-cards-area pb-120">
      <div className="container container-1400">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-client-cards-wrapper">
              <div className="row g-4">
                {clients.map((client) => {
                  const dataSource = getClientDataSources(client.slug);

                  return (
                    <div key={client.slug} className="col-xl-3 col-lg-4 col-md-6">
                      <ClientCard
                        title={client.title}
                        image={client.image}
                        slug={client.slug}
                        hasPortfolio={dataSource.hasPortfolio}
                        hasStudyCase={dataSource.hasStudyCase}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
