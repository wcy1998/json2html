
             import { server } from '@/axios';
             export function addClassify (params) {
                 return server({
                     url: 'report/classify/add',
                     method: 'post',
                     params,
                 });
             }