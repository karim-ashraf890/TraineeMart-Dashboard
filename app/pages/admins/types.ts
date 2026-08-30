export interface Admin {
  id: number;
  email: string;
  phone_code: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string | null;

  created_by_adminName: string | null;
  updated_by_adminName: string | null;
}
