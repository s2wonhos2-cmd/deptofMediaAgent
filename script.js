const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
const categoryLabel = document.querySelector('#current-category');
const categoryCount = document.querySelector('#current-count');

function activateTab(tab, moveFocus = false) {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  panels.forEach((panel) => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
  categoryLabel.textContent = tab.dataset.label;
  categoryCount.textContent = tab.dataset.count;
  if (moveFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    let nextIndex;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    }
  });
});
