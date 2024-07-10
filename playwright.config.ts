import { defineConfig } from '@playwright/test';
import {testPlanFilter} from "allure-playwright/dist/testplan";

export default defineConfig({
    reporter: [
        ['list'],
        ['allure-playwright']
    ],
    use: {
        trace: 'on-first-retry',
        video: 'retain-on-failure'
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' }
        }
    ],
    grep: testPlanFilter(),
});
