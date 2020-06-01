import { Role } from './role';
import { Kecamatan } from './kecamatan';
import { Desa } from './desa';

export interface User {
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: any;
    name: string;
    username: string;
    password: string;
    email: string;
    is_active: boolean;
    role_id: number;
    role: Role;
    id_kecamatan: number;
    kecamatan: Kecamatan;
    id_desa: number;
    desa: Desa;
}