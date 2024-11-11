const translations = {
    en: {
        notification: "Notification",
        //Desktop context menu
        iconsView: "View",
        createNewFile: "New",
        smallIcons: "Small icons",
        mediumIcons: "Medium icons",
        bigIcons: "Large icons",
        folder: "Folder",
        textDocument: "Text Document",
        newFolder: "New folder",
        newTextDocument: "New text document",
        //
        fullscreenAdvice:
            "For better experience, use full screen mode. To switch normal <--> full screen mode, use F11 button.",
        //Text window
        textFileWasChangeMarker: "changed",
        textFileWasSaved: "Saved",
        confirmationUnsaveTitle: "Do you want to save your changes?",
        confirmationUnsaveSubTitle: "You have unsaved changes.",
        //Basic
        save: "Save",
        unsave: "Do not store",
        cancel: "Cancel",
        moveTo: "Move to:",
        keyboardLayout: "Keyboard layout",
        readMeFile: "",
        shutdown: "Shutting down...",
        restart: "Restarting...",
    },
    ua: {
        notification: "Сповіщення",
        //Desktop context menu
        iconsView: "Вигляд",
        createNewFile: "Створити",
        smallIcons: "Дрібні піктограми",
        mediumIcons: "Середні піктограми",
        bigIcons: "Великі піктограми",
        folder: "Папка",
        textDocument: "Текстовий документ",
        newFolder: "Нова папка",
        newTextDocument: "Новий текстовий документ",
        //
        fullscreenAdvice:
            "Для кращого досвіду використовуйте повноекранний режим. Що б перемикатися між режимами, використовуйте кнопку F11.",
        //Text window
        textFileWasChangeMarker: "змінено",
        textFileWasSaved: "Збережено",
        confirmationUnsaveTitle: "Хочете зберегти зміни?",
        confirmationUnsaveSubTitle: "У вас є незбережені зміни.",
        //Basic
        save: "Зберегти",
        unsave: "Не зберігати",
        cancel: "Скасувати",
        moveTo: "Перемістити до:",
        keyboardLayout: "Розкладка клавіатури",
        readMeFile: `                                 ----- Лог системи -----

1. Перетягування/переміщення файлів і папок.
    1.1 Можливість переміщення файлів і папок по робочому столі.
    1.2 Можливість перетягування файлів в папку (як відкриту, так і в ярлик папки).
    1.3 Не можливо перетягнути файл сам в себе.
2. Меню по кліку правої кнопки мишки по робочому столі.
    2.1 Зміна розмірів ярликів.
        2.1.1 Оберіть один із запропонованих розмірів ярликів.
        2.1.2 Доступна зміна розмірів через hotkeys.
    2.2 Створення файлів.
        2.2.1 Можливість створити новий текстовий документ.
        2.2.2 Можливість створити нову папку.
3. Відкриття файлів.
    3.1 Можливість відкрити як один так і декілька файлів подвійним кліком або натиснувши кнопку Enter попередньо виділивши їх.
4. Видалення файлів
    4.1 Можливість видалення як одного так і більше файлів нажавши кнопку Delete попередньо виділивши їх.
5. Редактування текстового файлу.
    5.1 Маркери не збереженого файла
        5.1.1 При редактуванні файла в правому нижньому вуглі з'явиться надпис "змінено".
        5.1.2 При закритті не збереженого файла з'явиться попереждення.
    5.2 Можливість збереження файла натиснувши Ctrl + S з відображенням відповідного повідомлення.
6. Зміна розміру (ресайз) відкритого вікна.
    6.1 Можливість змінити розміри вікна навівши курсор на правий, нижній або правий нижній кут.
    6.2 Повноекранний режим
        6.2.1 Можливість переходу в повноекранний режим натиснувши кнопку "вікна" в правому верхньому вуглі.
        6.2.2 Можливість перемикати режими подвійним кліком по верхній (хедер) частині вікна.
        6.2.3 Вікно зберігає позицію і розміри які були до повноекранного режиму.
7. Можливість зміни мови введення (імітація).
    7.1 Можливість зміни натиснувши Shift + Alt.
    7.2 Можливість зміни натиснувши на відповідний значок в правому вуглі панелі задач.`,
        restart: "Перезавантаження...",
        shutdown: "Вихід з системи...",
    },
    pol: {
        notification: "Powiadomienie",
        //Desktop context menu
        iconsView: "Wygląd",
        createNewFile: "Stworzyć",
        smallIcons: "Małe ikony",
        mediumIcons: "Średnie ikony",
        bigIcons: "Duże ikony",
        folder: "Teczka",
        textDocument: "Dokument tekstowy",
        newFolder: "Nowy teczka",
        newTextDocument: "Nowy dokument tekstowy",
        //
        fullscreenAdvice:
            "Aby uzyskać lepsze wrażenia, użyj trybu pełnoekranowego. Aby przełączyć tryb normalny <--> pełnoekranowy, użyj przycisku F11.",
        //Text window
        textFileWasChangeMarker: "zmieniony",
        textFileWasSaved: "Zapisane",
        confirmationUnsaveTitle: "Czy chcesz zapisać zmiany?",
        confirmationUnsaveSubTitle: "Masz niezapisane zmiany.",
        //Basic
        save: "Ratować",
        unsave: "Nie przechowywać",
        cancel: "Anulować",
        moveTo: "Przenieś do:",
        keyboardLayout: "Układ klawiatury",
        readMeFile: "",
        shutdown: "Wyłączanie...",
        restart: "Ponowne uruchomienie...",
    },
};

export default translations;
