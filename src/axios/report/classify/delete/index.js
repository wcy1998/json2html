
             import { server } from '@/axios';
             export function deleteClassify (params) {
                 return server({
                     url: 'report/classify/delete',
                     method: 'post',
                     params,
                 });
             }