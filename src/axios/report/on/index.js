
             import { server } from '@/axios';
             export function on (params) {
                 return server({
                     url: 'report/on',
                     method: 'post',
                     params,
                 });
             }