export function updateButtonState(buttonElement, isSaving) {
    if (isSaving) {
      buttonElement.textContent = "Сохранение...";
      buttonElement.disabled = true;
    } else {
      buttonElement.textContent = "Сохранить";
      buttonElement.disabled = false;
    }
  }