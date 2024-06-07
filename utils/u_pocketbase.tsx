import PocketBase from 'pocketbase';
import { u_p_server } from '@/utils/u_paths';

export const pb = new PocketBase(u_p_server.BASE_URL);
