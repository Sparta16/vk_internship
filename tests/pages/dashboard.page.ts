import { Page } from '@playwright/test';

export class DashboardPage {
    constructor(private page: Page) {}

    async navigateToRepository(username: string, repo: string) {
        await this.page.goto(`https://github.com/${username}/${repo}`);
    }

    async openIssues() {
        await this.page.click('span[data-content="Issues"]');
    }
}