import {storage} from '@/core/utils';

function createRecord(name, link, date) {
  return `
            <li class="db__list-record">
                <a href="#${link.split(':').join('/')}">${name}</a>
                <strong>${new Date(+date).toLocaleDateString('uk-UK') }</strong>
            </li>
    `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes('excel')) keys.push({link: key, value: storage(key)});
    else continue;
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (keys.length) {
    return `      <div class="db__list-header">
                      <span>Name</span>
                      <span>Opening date</span>
                  </div>
                    <ul class="db__list">
                      ${keys.map((key) => createRecord(key.value.title, key.link, key.value.lastOpening)).join('')}
                    </ul>`;
  } else {
    return `<h3 class="db__list-warning">There are no records here</h3>`;
  }
}


