const icons = {
  TCI: "home",
  COM: "attach_money",
  PAT: "directions_car",
  TUP: "directions_bus",
  VIV: "holiday_village",
  PRE: "money",
  ALQ: "home_work",
  LYT: "gavel",
  PFP: "real_estate_agent",
  MUL: "privacy_tip",
  CEM: "shield_moon",
  MOR: "school",
  REN: "newspaper",
  LEG: "school",
  INM: "disabled_by_default",
  FEV: "disabled_by_default",
  MTC: "construction",
  VAR: "bolt",
  CNT: "person",
};

export const getIconFromTitle = (key: string): string | undefined => {
  return icons[key as keyof typeof icons];
};
