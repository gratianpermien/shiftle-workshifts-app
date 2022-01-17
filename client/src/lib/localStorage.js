//wahrscheinlich rauswerfen, nicht benötigt

const saveToLocal = (key, itemsToSet) =>
  localStorage.setItem(key, JSON.stringify(itemsToSet));

function loadFromLocal(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error.message);
  }
}

export { saveToLocal, loadFromLocal };
