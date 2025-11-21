export interface ServiceModule {
  id: string;
  title: string;
  price: number;
  isMonthly?: boolean;
  features: string[];
  icon: string;
}

export interface Plan {
  id: string;
  title: string;
  price: number | 'dynamic';
  features: string[];
  isPopular?: boolean;
  description: string;
}