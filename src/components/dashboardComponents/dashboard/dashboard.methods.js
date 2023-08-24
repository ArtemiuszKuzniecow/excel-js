import {storage} from '@/core/utils';

function createRecord(name, date) {
  const formattedDate = date.split(':')[1];
  const dateToDisplay = new Date(+formattedDate);
  return `
            <li class="db__list-record">
                <a href="#${date.split(':').join('/')}">${name}</a>
                <strong>${dateToDisplay.toLocaleDateString('uk-UK') }</strong>
            </li>
    `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes('excel')) keys.push({name: key, value: storage(key)});
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
                      ${keys.map((key) => createRecord(key.value.title, key.name)).join('')}
                    </ul>`;
  } else {
    return `<h3 class="db__list-warning">There are no records here</h3>`;
  }
}


