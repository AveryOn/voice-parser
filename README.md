# Парсер аудио -> текст
---

- Применяется в качестве вспомогательной системы для локального AI-ассистента.
- Это не окончательное production решение а только сырая наработка как отдельный модуль, для упрощения тестировния и разработки

## Установка

```bash
python -m venv whisper-venv
source whisper-venv/bin/activate  # или .\whisper-venv\Scripts\activate на Windows
pip install -r requirements.txt
```


## Запуск

```bash
# Запуск в разработке
npm run dev
```

```bash
# Запуск в проде
npm run start
```