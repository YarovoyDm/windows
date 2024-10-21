export const getRandomCenterCoordinates = () => {
    const leftPadding = 300; // Відступ зліва
    const rightPadding = 702; // Відступ справа
    const topPadding = 300; // Відступ зверху
    const bottomPadding = 702; // Відступ знизу

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Обчислюємо допустимий діапазон координат
    const minX = leftPadding; // Зліва
    const maxX = screenWidth - rightPadding; // Справа
    const minY = topPadding; // Зверху
    const maxY = screenHeight - bottomPadding; // Знизу

    // Генеруємо випадкові координати в межах
    const randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
    const randomY = Math.floor(Math.random() * (maxY - minY)) + minY;

    return { x: randomX, y: randomY };
};
