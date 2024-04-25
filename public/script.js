const ul = document.querySelector('ul')

getUsers().then(showUsers)

function getUsers() {
  return fetch('/api/users').then(response => response.json())
}

function showUsers(users) {
  let html = ''

  for (const user of users) {
    html += `<li class="user">${user.name}</li>`
  }

  ul.innerHTML = html

}