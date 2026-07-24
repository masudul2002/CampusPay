import { ReactNode } from "react";

export type ServiceId = 
  | "cash-in" 
  | "cash-out" 
  | "mobile-recharge" 
  | "bank-transfer" 
  | "bill-payment" 
  | "charge-calculator";

export interface ServiceItem {
  id: ServiceId;
  title: string;
  shortDescription: string;
  iconName: string;
  badge?: string;
  gradient: string;
  accentColor: string;
  detailedFeatures: string[];
}

export interface DeveloperContactInfo {
  name: string;
  department: string;
  university: string;
  room: string;
  phone: string;
  whatsapp: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface FeaturePoint {
  id: string;
  title: string;
  description: string;
  iconName: string;
  gradient: string;
}
