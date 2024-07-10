import {Page} from "@playwright/test";

export class IssuePage {
    constructor(private page: Page) {}

    async createIssue(title: string, description: string, assignees: string[], labels: string[]) {
        await this.page.click('a[href*="/issues/new/choose"]');

        await this.page.waitForSelector('input[name="issue[title]"]', { state: 'visible', timeout: 20000 });
        await this.page.fill('input[name="issue[title]"]', title);
        await this.page.fill('textarea[name="issue[body]"]', description);

        for (const assignee of assignees) {
            await this.page.click('summary[data-menu-trigger="assignees-select-menu"]');
            await this.page.fill('input[aria-label="Type or choose a user"]', assignee);
            await this.page.click(`.js-username:has-text("${assignee}")`);
            await this.page.click('div[id="repo-content-pjax-container"]');
        }

        for (const label of labels) {
            await this.page.click('details[id="labels-select-menu"]');
            await this.page.fill('input[aria-label="Filter labels"]', label);
            await this.page.click(`label[data-prio-filter-value="${label}"]`);
            await this.page.click('div[id="repo-content-pjax-container"]');
        }
        await this.page.click('button:has-text("Submit new issue")');
    }

    async isIssueCreated(title: string): Promise<boolean> {
        await this.page.waitForSelector('div.js-check-all-container');
        const issues = await this.page.$$('a:has-text("' + title + '")');
        return issues.length !== 0;
    }

    async openIssue(title: string) {
        await this.page.click(`a:has-text("${title}")`);
    }

    async editIssue(newDescription: string) {
        await this.page.click('svg[aria-label="Show options"]');
        await this.page.click('button[aria-label="Edit comment"]');
        await this.page.fill('textarea[name="issue[body]"]', newDescription);
        await this.page.click('span:has-text("Update comment")');
    }

    async isIssueEdited(title: string, newDescription: string): Promise<boolean> {
        await this.page.waitForSelector(`p:has-text("${newDescription}")`);
        const issueDescription = await this.page.innerText(`p:has-text("${newDescription}")`);
        return issueDescription.includes(newDescription);
    }

    async deleteIssue() {
        await this.page.click('strong:has-text("Delete issue")');
        await this.page.click('button[name="verify_delete"]');
    }

    async isIssueDeleted(title: string): Promise<boolean> {
        await this.page.waitForSelector('div.js-check-all-container');
        const issues = await this.page.$$('a:has-text("' + title + '")');
        return issues.length === 0;
    }
}
