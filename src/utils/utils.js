// Функция меняет текст кнопки
export const renderLoading = (popup, isLoading = false,originalText='Сохранить') => {
  const currentActiveButton = popup.querySelector('.popup__btn-save');
  if (isLoading) {
    currentActiveButton.textContent = "Сохранение...";
  } else {
    currentActiveButton.textContent = originalText;
  }
};
