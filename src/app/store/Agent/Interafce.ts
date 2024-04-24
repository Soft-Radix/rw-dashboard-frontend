import { Url } from "url";

export interface AgentType {
  first_name: string;
  last_name: string;
  email: string;
  id?: number;
  role_id?: number;
  country_code?: number;
  phone_number?: number;
  address?: string;
  user_image?: any
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
  agentDetail?: object;
  list: AgentType[];
  selectedColumn: string[];
};

export interface AgentState {
  status: string;
  successMsg: string;
  errorMsg: string;
  list: AgentType[];
  selectedColumn: string[];
}

export interface AgentRootState {
  agent: AgentState; // Add other slices if needed
}

export interface agentIDType {
  agent_id: string;
}
