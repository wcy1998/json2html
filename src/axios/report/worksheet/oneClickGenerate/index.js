import { server } from '@/axios';
export function oneClickGenerateWorksheet (params) {
    return server({
        url: 'report/worksheet/oneClickGenerate',
        method: 'post',
        params,
    });
}
