import { FastCodeConfig } from './types/vue';

export function generateDefaultConfig (FastCodeConfig: FastCodeConfig): FastCodeConfig {
    const { frame = 'vue', base = ' ', mixinCss = false } = FastCodeConfig;

    return { ...FastCodeConfig, frame, base, mixinCss };
}
