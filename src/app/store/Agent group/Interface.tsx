export interface AgentGroupType {
  group_name?: string;
  id?: number;
  deleted_at?: string;
  createdAt?: string;
  user_id?: number;
  updatedAt?: string;
  members_count?: number;
  group_members?: [];
}

export interface filterType {
  start: number;
  limit: number;
  search: string;
}

// export interface deleteAgentGroupType {
//   client_ids: number[];
// }

/**
 * The type definition for the initial state of the auth slice.
 */
export type initialStateProps = {
  status: string;
  successMsg: string;
  errorMsg: string;
  fetchStatus?: string;
  agentGroupDetail?: AgentGroupType;
  list: AgentGroupType[];
  total_records: number;
  selectedColumn: string[];
  actionStatus: boolean;
};
export interface AgentGroupRootState {
  agentGroup: initialStateProps; // Add other slices if needed
}

export interface AgentGroupIDType {
  group_id: string;
}
export interface deleteAgentGroupType {
  group_id: number;
}

// Type for the payload that updateProfile expects
export interface UpdateAgentGroupPayload {
  formData: FormData; // The form data object
}

// export interface ChangePassword {
//     type: number;
//     client_id?: number | string;
//     old_password?: string;
//     new_password: string;
// }
