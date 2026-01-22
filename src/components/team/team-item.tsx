import React from "react";
import Image from "next/image";
import { ITeamDT } from "@/types/team-d-t";
import Link from "next/link";
import { useTranslations } from "next-intl";

// prop type
type IProps = {
  item: ITeamDT;
  handleTeamModal(team: ITeamDT): void;
}

export default function TeamItem({ item, handleTeamModal }: IProps) {
  const t = useTranslations();

  const getDesignation = (designation: string) => {
    if (designation.startsWith('team.')) {
      return t(designation as any);
    }
    return designation;
  };

  return (
    <div className="tp-team-item tp-hover-btn-wrapper marque fix mb-30">
      <div className="tp-hover-btn-item">
        <Image style={{ width: "auto", height: "auto" }} src={item.image} alt="team-img" width={375} height={464} />
      </div>
      <div className="tp-team-content">
        <span>{getDesignation(item.designation)}</span>
        <h4
          className="tp-team-title-sm"
          onClick={() => handleTeamModal(item)}
        >
          <Link href={`/team-details/${item.id}`}>{item.name}</Link>
        </h4>
      </div>
    </div>
  );
}
