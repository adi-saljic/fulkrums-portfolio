import React from 'react';
import Marquee from 'react-fast-marquee';

export default function GalleryOne() {
  return (
    <div className="tp-gallery-area fix p-relative">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-gallery-slider-wrap">
              <div className="swiper-container tp-gallery-slider-active">
                <Marquee className="tp-gallery-titming" speed={100} direction='left'>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
