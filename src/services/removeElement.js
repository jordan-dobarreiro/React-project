export default function removeElement(table, id) {
    var elements = JSON.parse(localStorage.getItem(table));
    elements.splice(elements.findIndex(x => x.id === id), 1);
    localStorage.setItem(table, JSON.stringify(elements));
}