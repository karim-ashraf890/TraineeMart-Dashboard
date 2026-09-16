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
