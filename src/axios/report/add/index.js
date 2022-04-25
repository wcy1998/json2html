
             import { server } from '@/axios';
             export function add (params) {
                 return server({
                     url: 'report/add',
                     method: 'post',
                     params,
                 });
             }