export interface AddClientType {
    first_name: string,
    last_name: string,
    email: string;
    company_name: string,
}
/**
 * The type definition for the initial state of the auth slice.
 */
export type initialStateProps = {
    status: string;
    successMsg: string,
    errorMsg: string
};


export interface ClientState {
    status: string;
    successMsg: string,
    errorMsg: string
}

export interface ClientRootState {
    client: ClientState; // Add other slices if needed
}
