export type ViewMode = 'home' | 'products' | 'product-detail' | 'videos' | 'contact';

export interface EquipmentItem {
  id: string;
  model: string;
  title: string;
  category: string;
  capacityRange: string;
  minCap: number;
  maxCap: number;
  image: string;
  altText: string;
  badgeRef?: string;
  cadRef?: string;
  tempRating?: string;
  description: string;
  applicationBay: string;
  specLinkText?: string;
  featuredSpecs?: { label: string; value: string }[];
}

export interface VideoTape {
  id: string;
  camId: string;
  camLocation: string;
  duration: string;
  views?: string;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
  modelRef: string;
  proofRating: string;
  operatingTemp?: string;
  observation?: string;
  site?: string;
  telemetryNote?: string;
}

export interface RfqFormData {
  equipmentType: string;
  swl: number;
  femClass: string;
  millBay: string;
  heatEnvelope: string;
  hookStandard: string;
  hookSize: string;
  maxHeadroom: string;
  engineerName: string;
  companyName: string;
  email: string;
  phone: string;
  timeline: string;
  voltage: string;
  specialNotes: string;
  fileName?: string;
}
