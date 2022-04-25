
             import { server } from '@/axios';
             export function listClassify (params) {
                 return server({
                     url: 'report/classify/list',
                     method: 'post',
                     params,
                 });
             }