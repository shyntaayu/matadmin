export interface Role {
    id: number;
    name: string;
    created_at: Date;
    permissions?: any;
    is_admin: boolean;
}
