import { ReactNode } from 'react';

export interface CustomServiceOption {
  id: string;
  label: string;
  description?: string;
  price: number;
  unit: string;
}

export interface Plan {
  id: 'basic' | 'intermediate' | 'advanced' | 'custom';
  title: string;
  priceDisplay: string;
  basePrice: number;
  subtitle: string;
  description: string; // Short description for Card
  details?: string;    // Long description for Modal
  features: string[];
  isRecommended?: boolean;
  buttonText: string;
}

export interface ServiceCatalogItem {
  title: string;
  iconName: string;
}

export interface LeadForm {
  name: string;
  email: string;
  phone: string;
  selectedServices: string[]; // For custom plan
  message?: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: ReactNode;
}