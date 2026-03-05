// YouTube iframe embed codes for portfolio projects

export const youtubeVideos = {
  atleta: {
    portfolio: [
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/keCgYDYDfkU?si=b_NaIXi3IbbhpGEO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/ZU5Wpgxy-_Y?si=pnPy8UVyJi-Jjmid" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/sVYgmUy68IU?si=Jv75UWJWZxuV4wdW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/YOQz_10UL9A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    ],
    studyCase: [
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/IeO-NdmjOxU?si=jqzQ7DRbNuDkYXv5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    ],
  },
  sommerhagen: {
    portfolio: [
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/c0-r_OS9kIg?si=fYTZRY4VFNhbhK3X" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    ],
  },
  zamzam: {
    portfolio: [
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/01DTbDml_9g?si=Yp-S8ySVpI3fYfT-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    ],
  },
};

export type YouTubeVideoProject = keyof typeof youtubeVideos;
