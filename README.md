# Routes

/api/v1.0

## Builds

(get) /builds                       - Список билдов

(get) /builds/create                - Создать новый пакет

(get) /builds/:buildId              - Информация по билду

(post) /builds/:buildId/deploy/:hostName - Деплой пакета на хост

## Hosts

(get) /hosts                        - Список хостов
