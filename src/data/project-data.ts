export interface IProject {
  id: number;
  slug: string;
  titleKey: string;
  category: string;
  heroImage: string;
  detailImages: string[];
  detailVideos?: string[];
  detailPdf?: string;
}

const project_data: IProject[] = [
  {
    id: 1,
    slug: "quickie-liga",
    titleKey: "quickieLiga",
    category: "[ Sports Marketing ]",
    heroImage: "https://lh3.googleusercontent.com/d/1SZ-uDbAmwPLmE8mFNGtgJJZDtVtRfg8H",
    detailImages: [
      "https://lh3.googleusercontent.com/d/1GJFDqeu8T8wQkYqPmIkTOkiTTt80LcLP=w2000",
    ],
    detailVideos: [
      "/assets/videos/quickieLiga/QUICKIENAJAVA.mp4",
      "/assets/videos/quickieLiga/quickieVideo.mp4",
    ],
  },
  {
    id: 2,
    slug: "bestdrive-maja",
    titleKey: "bestdriveMaja",
    category: "[ E-commerce ]",
    heroImage: "https://lh3.googleusercontent.com/d/1rYgeIgd4UZvlvxTPD06B6GdfODCZIQ0g",
    detailImages: [
      "https://drive.google.com/thumbnail?id=1dPAwi5O7ya-MRAKsMydcfET_RxYkezcU&sz=w1000",
      "https://drive.google.com/thumbnail?id=1O038yQ0SOJ53cxZwdVJ58jL-dqAKPYj-&sz=w1000",
      "https://drive.google.com/thumbnail?id=1K9w7ylH2f-xYyZSYP_ZGMV8ALZ2r33rN&sz=w1000",
      "https://drive.google.com/thumbnail?id=1trCApxtkCiDnF9DiQh3BlgPy4qpfLdHm&sz=w1000",
      "https://drive.google.com/thumbnail?id=1a8n8bAIBMN2YVLk4_uI8x5-mFCv7ltuh&sz=w1000",
    ],
  },
  {
    id: 3,
    slug: "it-works-marketing",
    titleKey: "itWorksMarketing",
    category: "[ Health & Wellness ]",
    heroImage: "https://lh3.googleusercontent.com/d/10KalGhBxjaGVZCWEGXbqIMRMl33pauN6",
    detailImages: [
      "https://drive.google.com/thumbnail?id=14Lc1JnbsL-rCAAjHvPfoVgyyoTOrYtZ5&sz=w1000",
      "https://drive.google.com/thumbnail?id=1zHVw8bL7-J2hnEa6G67dXwbrEUlGtvpY&sz=w1000",
      "https://drive.google.com/thumbnail?id=1yLfvrdAqYk6ayk2uDAOUUEB6QY0yRcsq&sz=w1000",
      "https://drive.google.com/thumbnail?id=1JuT61AVw3KLFobPTtnQ04RUB7KRie7HE&sz=w1000",
    ],
    detailVideos: [
      "/assets/videos/itWorks/Video1.mp4",
      "/assets/videos/itWorks/Video2.mp4",
    ],
  },
  {
    id: 4,
    slug: "atleta",
    titleKey: "atleta",
    category: "[ Sports Marketing ]",
    heroImage: "https://lh3.googleusercontent.com/d/1NkgyqBmo7a0WarDdd6KL3G_hVb42K1OS",
    detailImages: [
      "https://drive.google.com/thumbnail?id=183HKaZw0NJfdAj-PbliSFfhS-n2azPVe&sz=w1000",
      "https://drive.google.com/thumbnail?id=1RMwAcwChgUDRPK5bPEHtGV3sTSMNkBcj&sz=w1000",
      "https://drive.google.com/thumbnail?id=1UnCWg6KuC1dIoQsy8bCUdngsaIHyBNI_&sz=w1000",
      "https://drive.google.com/thumbnail?id=15SxTcTfAqGR-YmfBug3-iD45Yo6R2PL8&sz=w1000",
    ],
    detailVideos: [
      "/assets/videos/atleta/fin.mp4",
      "/assets/videos/atleta/finRlls.mp4",
      "/assets/videos/atleta/Sequence03.mp4",
    ],
  },
  {
    id: 5,
    slug: "igny",
    titleKey: "igny",
    category: "[ App Development ]",
    heroImage: "https://lh3.googleusercontent.com/d/1CHr3Vb3oANNh6XT1-6PEY-E1lJFfS_qd",
    detailImages: [
      "https://lh3.googleusercontent.com/d/1PMpq011paL2Q7GnqsmAZYna8LxPaHYiG=w2000",
      "https://lh3.googleusercontent.com/d/1rhD5_OLunWLVmambAh-KQph2FmpJF4uK=w2000",
      "https://lh3.googleusercontent.com/d/1Ed9u44p2IO6DOk4fj-vRRDA0HtFBJSQc=w2000",
      "https://lh3.googleusercontent.com/d/1qJUyNkgK91VVAz4e0e3-hLAH7CfA3QA4=w2000",
    ],
  },
  {
    id: 6,
    slug: "sommerhagene",
    titleKey: "sommerhagene",
    category: "[ Real Estate Marketing ]",
    heroImage: "https://lh3.googleusercontent.com/d/1VlyHDZqEg2D0HnJGhL5CesYF3zo8VzGk",
    detailImages: [],
    detailVideos: [
      "/assets/videos/sommerhagen/1.mp4",
      "/assets/videos/sommerhagen/Sequence1.mp4",
      "/assets/videos/sommerhagen/Sequence3.mp4",
    ],
    detailPdf: "https://drive.google.com/file/d/1oYBk1aXgk-St39hVDhoz-oGIJu5_u7Hl/preview",
  },
];

// Portfolio interface (for portfolio slider/showcase)
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

export const portfolio_data: IPortfolio[] = [
  {
    id: 1,
    slug: "atleta",
    titleKey: "atleta",
    category: "[ Sports Marketing ]",
    heroImage: "https://lh3.googleusercontent.com/d/1NkgyqBmo7a0WarDdd6KL3G_hVb42K1OS",
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
    heroImage: "https://lh3.googleusercontent.com/d/1CHr3Vb3oANNh6XT1-6PEY-E1lJFfS_qd",
    detailImages: [],
    detailVideos: [
      "/assets/videos/portfolio/atraktiv/CopyofATRAKTIV.mp4",
      "/assets/videos/portfolio/atraktiv/CopyfTRAKTIVMAGACIN.mp4",
    ],
  },
];

export default project_data;
