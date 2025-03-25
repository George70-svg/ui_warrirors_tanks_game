### Описание проекта
Игра Battle City аналог легендарной аркадной игры для dandy

[Демонстрация приложения](https://disk.yandex.ru/d/Ez6kTkumh4S8aw)

[Документация](docs/README.md)

### Как запускать?

Для запуска проекта необходим установленный стек технологий:

- Node > 16
- Docker
- Yarn  - установка `npm install -g yarn`

1. `yarn bootstrap` - Перед запуском проекта устанавливаем bootstrap обязательно
2. `yarn dev` - Запустить полный проект в Dev режиме
3. `yarn dev --scope=client` - Запустить в Dev режиме только front
4. `yarn dev --scope=server` - Запустить в Dev режиме только back


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```

Для добавления в dev зависимости, запускаем команду с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг
В проекте расширяется конфиг typescript-eslint/recommended

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`
