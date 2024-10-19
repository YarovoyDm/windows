import React, { useEffect, useState } from "react";
import styles from "./TextareaWithHighlight.module.scss";

const TextareaWithHighlight = ({ innerText }: { innerText: string }) => {
    const [text, setText] = useState<string>(innerText || ""); // Текст з текстової області
    const [currentLineIndex, setCurrentLineIndex] = useState<number | null>(
        null,
    ); // Індекс поточного рядка

    // Обробка зміни тексту
    // Обробка зміни тексту
    const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
        const newText = (event.target as HTMLDivElement).innerText || "";

        setText(newText);
        handleCursorPosition();
    };

    // Визначення позиції курсору та обчислення поточного рядка
    const handleCursorPosition = () => {
        const selection = window.getSelection();

        if (!selection) return;

        const textarea = document.getElementById(
            "editable-div",
        ) as HTMLDivElement;

        if (!textarea) return;

        const cursorPosition = selection.anchorOffset;
        const lines = text.split("\n");

        let charCount = 0;
        let lineIndex = 0;

        for (let i = 0; i < lines.length; i++) {
            charCount += lines[i].length + 1; // Додаємо +1 для нового рядка
            if (charCount > cursorPosition) {
                lineIndex = i;
                break;
            }
        }

        setCurrentLineIndex(lineIndex); // Оновлюємо стан поточного рядка
    };

    // Функція для рендерингу тексту з підсвіченим рядком
    const renderHighlightedText = () => {
        const lines = text.split("\n");

        return lines.map((line, index) => (
            <div
                key={index}
                className={index === currentLineIndex ? styles.highlight : ""}
                style={{ whiteSpace: "pre-wrap" }} // Зберігаємо форматування рядків
            >
                {line || <br />} {/* Щоб коректно відображати порожні рядки */}
            </div>
        ));
    };

    return (
        <div className={styles.container}>
            {/* Підсвічений фон */}
            <div className={styles.highlighContainer}>
                {renderHighlightedText()}
            </div>

            {/* Справжнє редаговане поле */}
            <div
                id='editable-div'
                contentEditable
                suppressContentEditableWarning={true}
                onInput={handleInput}
                onClick={handleCursorPosition}
                onKeyUp={handleCursorPosition}
                className={styles.editableDiv}
            >
                {text}
            </div>
        </div>
    );
};

export default TextareaWithHighlight;
