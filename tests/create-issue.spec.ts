import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from './pages/login.page';
import { DashboardPage } from './pages/dashboard.page';
import { IssuePage } from './pages/issue.page';
import 'dotenv/config'

test.describe('Создание, изменение и удаления issue в GitHub', () => {
    const username = process.env['GITHUB_USERNAME']!;
    const password = process.env['GITHUB_PASSWORD']!;
    const repoName = process.env['GITHUB_REPO']!;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();

        const isLoggedIn = await loginPage.isLoggedIn();
        if (!isLoggedIn) {
            await loginPage.login(username, password);
        }
    });

    test('Создание issue', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const issuePage = new IssuePage(page);

        await allure.step('Перейти в репозиторий', async () => {
            await dashboardPage.navigateToRepository(username, repoName);
        });

        await allure.step('Открыть список Issues', async () => {
            await dashboardPage.openIssues();
        });

        const issueTitle = 'Issue1';
        const issueDescription = 'Я нашел баг';
        const assignees = [username];
        const labels = ['bug'];

        await allure.step('Создать новый issue', async () => {
            await issuePage.createIssue(issueTitle, issueDescription, assignees, labels);
        });

        await allure.step('Убедиться, что Issue был создан', async () => {
            const isCreated = await issuePage.isIssueCreated(issueTitle);
            expect(isCreated).toBe(true);
        });
    });

    test('Изменение issue', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const issuePage = new IssuePage(page);

        await allure.step('Перейти в репозиторий', async () => {
            await dashboardPage.navigateToRepository(username, repoName);
        });

        await allure.step('Открыть список Issues', async () => {
            await dashboardPage.openIssues();
        });

        const issueTitle = 'Issue1';

        await allure.step('Открыть существующеее Issue', async () => {
            await issuePage.openIssue(issueTitle);
        });

        const newIssueDescription = 'Я нашел новый баг';

        await allure.step('Изменить issue', async () => {
            await issuePage.editIssue(newIssueDescription);
        });

        await allure.step('Убедиться, что Issue был изменен', async () => {
            const isEdited = await issuePage.isIssueEdited(issueTitle, newIssueDescription);
            expect(isEdited).toBe(true);
        });
    });

    test('Удалить issue', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const issuePage = new IssuePage(page);

        await allure.step('Перейти в репозиторий', async () => {
            await dashboardPage.navigateToRepository(username, repoName);
        });

        await allure.step('Открыть список Issues', async () => {
            await dashboardPage.openIssues();
        });

        const issueTitle = 'Issue1';

        await allure.step('Открыть существующеее Issue', async () => {
            await issuePage.openIssue(issueTitle);
        });

        await allure.step('Удалить Issue', async () => {
            await issuePage.deleteIssue();
        });

        await allure.step('Убедиться, что Issue был удален', async () => {
            const isDeleted = await issuePage.isIssueDeleted(issueTitle);
            expect(isDeleted).toBe(true);
        });
    });
});