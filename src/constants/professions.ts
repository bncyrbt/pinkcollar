import { Profession } from "@/lib/pinkcollar/auth";

export const professionOptions: Profession[] = [
  // Fashion group
  { id: "fashion-designer", groupId: "Fashion", label: "Fashion Designer" },
  { id: "pattern-maker", groupId: "Fashion", label: "Pattern Maker" },
  { id: "sawer", groupId: "Fashion", label: "Sawer" },
  { id: "textile-designer", groupId: "Fashion", label: "Textile Designer" },
  { id: "fashion-student", groupId: "Fashion", label: "Fashion Student" },

  // Digital Arts group
  {
    id: "graphic-designer",
    groupId: "Digital Arts",
    label: "Graphic Designer",
  },
  { id: "3d-artist", groupId: "Digital Arts", label: "3D Artist" },

  // Business group
  { id: "fashion-boutique", groupId: "Business", label: "Fashion Boutique" },
  { id: "brand-owner", groupId: "Business", label: "Brand Owner" },
];
