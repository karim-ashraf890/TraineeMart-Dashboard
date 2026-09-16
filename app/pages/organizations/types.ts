export interface Organization {
  id: number;
  email: string;
  phone_code: string;
  phone_number: string;
  serviceType_name_en: string;
  serviceType_name_ar: string;
  name: string;
  approved: number;
  created_at: string;
  created_by_organizationName: string | null;
  updated_at: string | null;
  updated_by_organizationName: string | null;
  created_by_adminName: string | null;
  created_by_studentName: string | null;
  updated_by_adminName: string | null;
  updated_by_studentName: string | null;
}

export interface OrganizationFormData {
  name: string;
  license_number: string;
  commercial_registration_number: string;
  communication_officer: string;
  serviceType_id: string;
  courseTypes: string[];
  subtitle_en: string;
  subtitle_ar: string;
  badge_en: string;
  badge_ar: string;
  brief_en: string;
  brief_ar: string;
  wage: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  contact_email: string;
  official_website_url: string;
  keywords: string[];
  skills: string[];
}
