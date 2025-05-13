### Описание проекта
Игра Battle City аналог легендарной аркадной игры для dandy

[Демонстрация приложения](https://disk.yandex.ru/d/Ez6kTkumh4S8aw)

[Документация](docs/README.md)

### Как запускать?

Для запуска проекта в dev режиме
1. `yarn link` - запускаем в каталоге client
2. `yarn link client` - запускаем в каталоге server (в результате в каталоге server/node_modules должен отобразиться пакет client)
3. В каталоге server копируем .env.example в .env и настраиваем переменные среды
4. `docker compose up`  - запускаем в каталоге server
5. `yarn dev` - запускаем в каталоге server

Для запуска проекта в production режиме (все запускаем в корневом каталоге)
1. Копируем .env.example в .env и настраиваем переменные среды
2. `yarn build:ssr --scope client`
3. `yarn build --scope client`
4. `docker compose up`

Для запуска проекта необходим установленный стек технологий:

- Node > 16
- Docker
- Yarn  - установка `npm install -g yarn`

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
