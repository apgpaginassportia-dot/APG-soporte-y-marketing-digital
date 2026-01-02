
import { ReactNode } from 'react';

export interface CustomServiceOption {
  id: string;
  label: string;
  description?: string;
  price: number;
  unit: string;
}

export interface Milestone {
  amount: string;
  label: string;
}

export interface PlanFeature {
  label: string;
  description: string;
}

export interface Plan {
  id: 'basic' | 'intermediate' | 'advanced' | 'custom' | 'school' | 'team' | 'team_custom';
  title: string;
  priceDisplay: string;
  monthlyPriceDisplay?: string;
  basePrice: number;
  subtitle: string;
  description: string; // Short description for Card
  tagline?: string;    // Subtitle above description
  details?: string;    // Long description for Modal
  features: string[] | PlanFeature[];
  milestones?: Milestone[];
  isRecommended?: boolean;
  recommendationLabel?: string;
  footerLabel?: string;
  buttonText: string;
}

export interface ServiceCatalogItem {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface SchoolServiceItem {
  title: string;
  description: string;
  iconName: string;
}

export interface TeamServiceItem {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  iconName: string;
  highlight?: boolean;
}

export interface LeadForm {
  name: string;
  email: string;
  phone: string;
  selectedServices: string[]; // For custom plan
  message?: string;
  pricePerStudent?: string; // Changed from difficulty to pricePerStudent
}

export interface Benefit {
  title: string;
  description: string;
  icon: ReactNode;
}