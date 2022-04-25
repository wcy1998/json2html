
             import { server } from '@/axios';
             export function off (params) {
                 return server({
                     url: 'report/off',
                     method: 'post',
                     params,
                 });
             }