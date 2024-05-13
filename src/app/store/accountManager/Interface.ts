export interface AccManagerType {
  first_name?: string;
  last_name?: string;
  email?: string;
  id?: number;
  role_id?: number;
  country_code?: number;
  phone_number?: number;
  address?: string;
  user_image?: any;
  company_name?: string;
  status?: string;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
  userName?: string;
}

export interface filterType {
  start: number;
  limit: number;
  search: string;
}

/**
 * The type definition for the initial state of the auth slice.
 */
export type initialStateProps = {
  status: string;
  successMsg: string;
  errorMsg: string;
  fetchStatus?: string;
  accManagerDetail?: AccManagerType;
  list: AccManagerType[];
  selectedColumn: string[];
  actionStatus: boolean;
  total_records: number;
};

export interface AccManagerRootState {
  manager: initialStateProps; // Add other slices if needed
}

export interface accManagerIDType {
  accountManager_Id: string;
}
