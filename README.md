**Запуск тестов**
1. В коммандной строке, находясь в директории, написать: git clone https://github.com/Sparta16/vk_internship.git
2. В директории создать файл .env
3. Открыть файл .env
4. В данном файле написать имя пользователя, пароль пользователя и название репозитория по образцу:
GITHUB_USERNAME="User"

GITHUB_PASSWORD="password"

GITHUB_REPO="vk_internship"

5. Сохранить файл и закрыть.
6. В коммандной строке, находясь в директории, написать: npm i
7. В коммандной строке, находясь в директории, написать: npx playwright test
8. В коммандной строке, находясь в директории, написать: npx allure serve allure-results
