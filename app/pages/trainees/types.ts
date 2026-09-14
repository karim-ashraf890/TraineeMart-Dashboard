export interface Student {
  id: number;
  email: string;
  phone_code: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  created_at: string;
  created_by_organizationName: string | null;
  updated_at: string;
  updated_by_organizationName: string | null;
  created_by_adminName: string | null;
  created_by_studentName: string | null;
  updated_by_adminName: string | null;
  updated_by_studentName: string | null;
}
