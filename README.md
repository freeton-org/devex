# HTTP Notification Service

Особенности:
- Гарантированная доставка http уведомления
  - Отсутствие потерь даже в случае аварийной остановки сервера
  - Повторы доставки в случае недоступности получателя или его ошибки
  - Оптимизированная система доставки с настраиваемыми интервалами попыток и их длительностью
- Расширенная поддержка уведомления HTTP получателя (url)
  - базовая авторизация
  - поддержка HTTP методов POST, GET, PUT, JSON RPC
  - корректная работа с HTTPS получателями
  - поддержка нестандартного порта
- Все настройки и оптимизации в одном файле ([config.yml](docs/ConfigYML.md))
- Проверка владения доменом или страницей для защиты получателя
  - через robots.txt
  - через meta tags внутри html страницы или главной страницы сайта
  - конфигурирование исключений для отладки
- Корректная обработка ошибок
  - выдаёт коды ошибок с кратким сообщением.
  - сервис не ломается при подаче некорректных данных
- Логирование событий отправки в InfluxDB (для импорта в Grafana и т.д.)
- Встроенная защита от зависания останавливающая приложение в случае отсутствия активности
- В перспективе использование большего количества баз данных (PostgreSQL, H2, SQLite, Oracle, SQL Server), благодаря использованию ORM framework

## Документация
- [Installation](docs/INSTALL.md)
- [Usage](docs/USAGE.md)
  - [Подробнее по параметрам приложения](docs/ConfigYML.md)

## Тестирование
Для тестирования факта получения http уведомлений можно использовать общедоступные сервисы:
- https://pipedream.com/ (рекомендуемый, есть поддержка выключения)
- https://requestinspector.com/ (наиболее простой)
- https://mocklab.io/ (красивый)

### Тестирование с поддержкой дешифрования
Для получения уведомлений был разработан [специальный тестовый сервер](https://github.com/chain-action/httpserver4encoded-notifications) с поддержкой дешифрования [по протоколу](https://tonlabs.notion.site/Notification-provider-onboarding-3dd961bce8954d0da80208b9a908c773)

Information on the instructions https://github.com/freeton-org/readme will be placed in the repository, since the application number is not known before publication
