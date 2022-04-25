
             import { server } from '@/axios';
             export function list (params) {
                 return server({
                     url: 'report/list',
                     method: 'post',
                     params,
                 });
             }