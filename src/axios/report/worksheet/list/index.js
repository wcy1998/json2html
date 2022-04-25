import { server } from '@/axios';
export function listWorksheet (params) {
    return server({
        url: 'report/worksheet/list',
        method: 'post',
        params,
    });
}
