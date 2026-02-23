import { getPortfolioData } from "@/data/portfolio-data";
import project_data from "@/data/project-data";

export interface ClientDataSource {
  hasPortfolio: boolean;
  hasStudyCase: boolean;
  portfolioSlug?: string;
  studyCaseSlug?: string;
}

/**
 * Detects if a client exists in portfolio data, study cases data, or both
 * @param slug - The client slug to search for
 * @returns Object indicating which data sources contain the client
 */
export function getClientDataSources(slug: string): ClientDataSource {
  const portfolio_data = getPortfolioData();
  const portfolioItem = portfolio_data.find((item) => item.slug === slug);
  const studyCaseItem = project_data.find((item) => item.slug === slug);

  return {
    hasPortfolio: !!portfolioItem,
    hasStudyCase: !!studyCaseItem,
    portfolioSlug: portfolioItem?.slug,
    studyCaseSlug: studyCaseItem?.slug,
  };
}
