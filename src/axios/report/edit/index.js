
             import { server } from '@/axios';
             export function edit (params) {
                 return server({
                     url: 'report/edit',
                     method: 'post',
                     params,
                 });
             }