export interface ClientType {
    first_name: string,
    last_name: string,
    email: string;
    company_name: string,
    id?: number,
    role_id?: number,
    country_code?: number,
    phone_number?: number,
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

/**
 * The type definition for the initial state of the auth slice.
 */
export type initialStateProps = {
    status: string;
    successMsg: string,
    errorMsg: string
    fetchStatus?: string,
    clientDetail?: object,
    list: ClientType[]
};


export interface ClientState {
    status: string;
    successMsg: string,
    errorMsg: string,
    list: ClientType[]
}

export interface ClientRootState {
    client: ClientState; // Add other slices if needed
}

export interface clientIDType {
    client_id: string
}

