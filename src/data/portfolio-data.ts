export interface IPortfolio {
  id: number;
  slug: string;
  titleKey: string;
  category: string;
  heroImage: string;
  detailImages: string[];
  detailVideos?: string[];
  detailPdf?: string;
}

const portfolio_data: IPortfolio[] = [
  {
    id: 1,
    slug: "atleta",
    titleKey: "atleta",
    category: "[ Sports Marketing ]",
    heroImage: "https://lh3.googleusercontent.com/d/1P0O68OGqNajLdTFUObLE4OlWvebnLVfX=w2000",
    detailImages: [],
    detailVideos: [
      "/assets/videos/portfolio/atleta/CopyfATHLETICALPHABET.mp4",
      "/assets/videos/portfolio/atleta/CopyfSequence06.mp4",
      "/assets/videos/portfolio/atleta/CopyofELJEZNIČAR.mp4",
    ],
  },
  {
    id: 2,
    slug: "atraktiv",
    titleKey: "atraktiv",
    category: "[ Marketing ]",
    heroImage: "https://lh3.googleusercontent.com/d/1pjUA3nGPiKDhcBgiOsVQLOjJe_rmb4LL=w2000",
    detailImages: [],
    detailVideos: [
      "/assets/videos/portfolio/atraktiv/CopyofATRAKTIV.mp4",
      "/assets/videos/portfolio/atraktiv/CopyfTRAKTIVMAGACIN.mp4",
    ],
  },
  {
    id: 3,
    slug: "bestdrive",
    titleKey: "BestDrive",
    category: "[ Automotive ]",
    heroImage: "https://lh3.googleusercontent.com/d/18g8lkNLIMW-vRNrqIfvC45iRXBHmYWxE=w2000",
    detailImages: [
      "https://lh3.googleusercontent.com/d/1SbnU3ghtZjJxXkJ8MIC8UO-UHhwI_Nm7=w2000",
      "https://lh3.googleusercontent.com/d/1mRaU9V7y0KjBNBiadX-IKcrwnWm3-2aJ=w2000",
      "https://lh3.googleusercontent.com/d/1Sr3IGhCHJjYZq2rROsQsnlBRyl4HtBKV=w2000",
      "https://lh3.googleusercontent.com/d/1oJWfqMvDYoSfXUU2czeDIfeWs667bzm6=w2000",
      "https://lh3.googleusercontent.com/d/1lKVcGWmHRnlJ5GX9OzJKnPH7qsvxsvC3=w2000",
      "https://lh3.googleusercontent.com/d/1Qy2xyYRphiZB7VBgZyvTXwq5AyBuwLOX=w2000",
    ],
    detailVideos: [
      "/assets/videos/portfolio/bestDrive/CopyESTDRIVEANDARAGEPULSE.mp4",
      "/assets/videos/portfolio/bestDrive/Copyfin.mp4",
      "/assets/videos/portfolio/bestDrive/Copyoffin.mp4",
    ],
  },
  {
    id: 4,
    slug: "cheyf",
    titleKey: "Cheyf",
    category: "[ Food & Beverage ]",
    heroImage: "https://lh3.googleusercontent.com/d/1SbnU3ghtZjJxXkJ8MIC8UO-UHhwI_Nm7=w2000",
    detailImages: [],
    detailVideos: [
      "/assets/videos/portfolio/cheyf/CheyfxNomad.mp4",
      "/assets/videos/portfolio/cheyf/Copycc.mp4",
      "/assets/videos/portfolio/cheyf/Sequence01.mp4",
      "/assets/videos/portfolio/cheyf/sffeparation.mp4",
      "/assets/videos/portfolio/cheyf/UrbanHikeReels.mp4",
    ],
  },
  {
    id: 5,
    slug: "cheyf-accommodations",
    titleKey: "Cheyf Accommodations",
    category: "[ Hospitality ]",
    heroImage: "https://lh3.googleusercontent.com/d/1SbnU3ghtZjJxXkJ8MIC8UO-UHhwI_Nm7=w2000",
    detailImages: [],
    detailVideos: [
      "/assets/videos/portfolio/cheyfAccomodations/CopyACC.mp4",
      "/assets/videos/portfolio/cheyfAccomodations/CopyESTATE.mp4",
      "/assets/videos/portfolio/cheyfAccomodations/Sequence1.mp4",
    ],
  },
  {
    id: 6,
    slug: "eureka-filaments",
    titleKey: "Eureka Filaments",
    category: "[ Manufacturing ]",
    heroImage: "https://lh3.googleusercontent.com/d/1NOTbmUwJftpaejQvyx0IuCiE8GDtl2BV=w2000",
    detailImages: [
      "https://lh3.googleusercontent.com/d/1YFqmBPOxhldt3fJgYn7dIY-DnGmySj3z=w2000",
      "https://lh3.googleusercontent.com/d/1Tstk0cLPXOJxVRqW7hQHNNZHOAMBGaSl=w2000",
      "https://lh3.googleusercontent.com/d/1Z85DNq3zKc911ZgFJUzm-CL1gyFnPdv7=w2000",
      "https://lh3.googleusercontent.com/d/1niALyzjfrb4l7d1BzIEr3e4o4OFhClaP=w2000",
      "https://lh3.googleusercontent.com/d/1U6aDByK7a3w_SvHinhhuXc5fFtKijuZO=w2000",
      "https://lh3.googleusercontent.com/d/1VYC4MaiBTXAghHaVFYx1WzEzkkl9yBj7=w2000",
    ],
    detailVideos: [],
  },
  {
    id: 7,
    slug: "get-energy-canada",
    titleKey: "Get Energy Canada",
    category: "[ Energy ]",
    heroImage: "https://lh3.googleusercontent.com/d/1NssRxWkohKAzhz2H-O33xo3KowOb5Ug0=w2000",
    detailImages: [
      "https://lh3.googleusercontent.com/d/1NssRxWkohKAzhz2H-O33xo3KowOb5Ug0=w2000",
      "https://lh3.googleusercontent.com/d/1WRLCYgBaTyxmG_OcXrtKnxON2rESyxZD=w2000",
      "https://lh3.googleusercontent.com/d/1APYvnPKjq1qchdaRR6j-pgX0tJK8dJDy=w2000",
      "https://lh3.googleusercontent.com/d/1k-kqiVQ_dikeB1VwvEjUGT0kdE0PoCFc=w2000",
    ],
    detailVideos: [],
  },
  {
    id: 8,
    slug: "ibm",
    titleKey: "IBM",
    category: "[ Integrated Body Movement ]",
    heroImage: "https://lh3.googleusercontent.com/d/1Z1rB2XvU2UdX5N8_og61Og94K-hEgP0H=w2000",
    detailImages: [
      "https://lh3.googleusercontent.com/d/1v4R4CPY5aMNoDxRQh-yqeD9RQDeMQuiQ=w2000",
      "https://lh3.googleusercontent.com/d/1Lwn2h_Ij4aWAoiwuoSBaKCHXYatFGznp=w2000",
      "https://lh3.googleusercontent.com/d/1_enTMnyuS4NglQ8kJj-pJ-pYpLS7wsoB=w2000",
      "https://lh3.googleusercontent.com/d/15tYWS7t6qbpKfVEWhIRdVXwjHu75cQWX=w2000",
    ],
    detailVideos: [],
  },
  {
    id: 9,
    slug: "legacy-vacations",
    titleKey: "Legacy Vacations",
    category: "[ Travel & Tourism ]",
    heroImage: "https://lh3.googleusercontent.com/d/1_ldbdxILkVtkf_eH25sloLJ_lco7SKe5=w2000",
    detailImages: [
      "https://lh3.googleusercontent.com/d/1_ldbdxILkVtkf_eH25sloLJ_lco7SKe5=w2000",
      "https://lh3.googleusercontent.com/d/1wjqkMhVxtSoX0bqYA3KqeD2DFSr0XKeg=w2000",
      "https://lh3.googleusercontent.com/d/1pIWLhhyIsm_4Gn7m_18Bycn5s805Z-hd=w2000",
      "https://lh3.googleusercontent.com/d/1F8aRoTMaqhBEz0tLdRL_I7NkCu9dykoT=w2000",
    ],
    detailVideos: [],
  },
  {
    id: 10,
    slug: "property-alchemy",
    titleKey: "Property Alchemy",
    category: "[ Real Estate ]",
    heroImage: "https://lh3.googleusercontent.com/d/115UEp9FHUdxme_12YBjroqvbhp8rgI3w=w2000",
    detailImages: [
      "https://lh3.googleusercontent.com/d/115UEp9FHUdxme_12YBjroqvbhp8rgI3w=w2000",
      "https://lh3.googleusercontent.com/d/1D-0Lwf9_DxH3XG5kDYkOLAEiWON52qc3=w2000",
      "https://lh3.googleusercontent.com/d/1b178-QL5CtMoAXKqFmI0vMpDsKzOUqpP=w2000",
      "https://lh3.googleusercontent.com/d/1B6-Rz9NSVXNIJuw4XQRkBcpRrErAM_qD=w2000",
    ],
    detailVideos: [],
  },
  {
    id: 11,
    slug: "sommerhagen",
    titleKey: "Sommerhagen",
    category: "[ Travel & Tourism ]",
    heroImage: "https://lh3.googleusercontent.com/d/1o30u9yQUsCu2TpO07rjYk2RxOQSToB1m=w2000",
    detailImages: [],
    detailVideos: [
      "/assets/videos/portfolio/sommerhagen/CanueSafari.mp4",
      "/assets/videos/portfolio/sommerhagen/Herzegovina vibes.mp4",
      "/assets/videos/portfolio/sommerhagen/hutovo.mp4",
      "/assets/videos/portfolio/sommerhagen/smokvee.mp4",
      "/assets/videos/portfolio/sommerhagen/Sommerhagene.mp4",
      "/assets/videos/portfolio/sommerhagen/Spots.mp4",
    ],
  },
  {
    id: 12,
    slug: "zamzam",
    titleKey: "Zamzam",
    category: "[ Food & Beverage ]",
    heroImage: "https://lh3.googleusercontent.com/d/1SbnU3ghtZjJxXkJ8MIC8UO-UHhwI_Nm7=w2000",
    detailImages: [],
    detailVideos: [
      "/assets/videos/portfolio/zamzam/Sequence2_1.mp4",
      "/assets/videos/portfolio/zamzam/Sequence23.mp4",
    ],
  },
];

export default portfolio_data;
