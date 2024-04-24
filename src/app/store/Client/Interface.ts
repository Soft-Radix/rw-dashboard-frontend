export interface ClientType {
    first_name?: string,
    last_name?: string,
    email?: string;
    files?: File,
    company_name?: string,
    id?: number,
    client_id?: number | string,
    role_id?: number,
    role?: string,
    country_code?: number | string,
    phone_number?: number | string,
    address?: string,
    user_image?: string,
    status?: string,
    deleted_at?: string,
    created_at?: string,
    updated_at?: string,
    userName?: string
}

export interface filterType {
    start: number,
    limit: number,
    search: string
}

export interface deleteClientType {
    client_ids: number[]
}

/**
 * The type definition for the initial state of the auth slice.
 */
export type initialStateProps = {
    status: string;
    successMsg: string,
    errorMsg: string
    fetchStatus?: string,
    clientDetail?: object,
    list: ClientType[],
    selectedColumn: string[]
    actionStatus: boolean
};
export interface ClientRootState {
    client: initialStateProps; // Add other slices if needed
}

export interface clientIDType {
    client_id: string
}

// Type for the payload that updateProfile expects
export interface UpdateProfilePayload {
    formData: FormData; // The form data object
}


export interface ChangePassword {
    token: string,
    password: string
}
