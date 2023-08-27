export function onButtons(data, icon, content) {
  return `
            <div class="excel__header-buttons-item">
                <i class="${icon} material-icons"  data-header-button="${data}">${content}</i>
            </div>
    `;
}
