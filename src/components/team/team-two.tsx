import React from 'react';
import Image from 'next/image';

// images
import Link from 'next/link';

const placeholder_img = "https://drive.google.com/thumbnail?id=1P2cm97dtcE97ZgQDJih7zKdCUPKNTsmE&sz=w1000";

// team data
const team_data = [
  {
    id:1,
    img:placeholder_img,
    designation:"Art direction",
    name:"Jane Mills",
    socials:[
      {icon:'fa-brands fa-twitter',link:'https://twitter.com'},
      {icon:'fa-brands fa-facebook',link:'https://facebook.com'},
      {icon:'fa-brands fa-instagram',link:'https://instagram.com'},
      {icon:'fa-brands fa-linkedin-in',link:'https://linkedin.com'},
    ]
  },
  {
    id:2,
    img:placeholder_img,
    designation:"Designer",
    name:"Chigusa Kisa",
    socials:[
      {icon:'fa-brands fa-twitter',link:'https://twitter.com'},
      {icon:'fa-brands fa-facebook',link:'https://facebook.com'},
      {icon:'fa-brands fa-instagram',link:'https://instagram.com'},
      {icon:'fa-brands fa-linkedin-in',link:'https://linkedin.com'},
    ]
  },
  {
    id:3,
    img:placeholder_img,
    designation:"Developer",
    name:"Lilah Ioselev",
    socials:[
      {icon:'fa-brands fa-twitter',link:'https://twitter.com'},
      {icon:'fa-brands fa-facebook',link:'https://facebook.com'},
      {icon:'fa-brands fa-instagram',link:'https://instagram.com'},
      {icon:'fa-brands fa-linkedin-in',link:'https://linkedin.com'},
    ]
  }
]
export default function TeamTwo() {
  return (
    <div className="tp-team-4-area pt-120 pb-90" style={{backgroundImage:"url(/assets/img/home-04/brand/overly.png)"}}>
        <div className="container">
          <div className="row">
            {team_data.map((item) => (
              <div key={item.id} className="col-xl-4 col-lg-6 col-md-6 mb-30">
                <div className="tp-team-4-item text-center tp_fade_bottom">
                    <div className="tp-hover-btn-wrapper fix">
                      <div className="tp-hover-btn-item">
                          <Image style={{width:"100%", height:"auto"}} className="w-100" src={item.img} alt="team-img" width={400} height={500}/>
                      </div>
                    </div>
                    <div className="tp-team-4-content">
                      <span>{item.designation}</span>
                      <h4 className="tp-team-4-title-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <Link href="#">{item.name}</Link>
                      </h4>
                      <div className="tp-team-4-social">
                        {item.socials.map((social,i) => (
                          <Link key={i} href={social.link} target='_blank'>
                            <i className={social.icon}></i>
                          </Link>
                        ))}
                      </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}
