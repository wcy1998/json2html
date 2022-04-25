import { server } from '@/axios';
export function deleteWorksheet (params) {
    return server({
        url: 'report/worksheet/delete',
        method: 'post',
        params,
    });
}
