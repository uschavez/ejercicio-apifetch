document.getElementById('fetchUsersBtn').addEventListener('click', fetchUsers);

async function fetchUsers() {
  try {
    /* Spinner */
    document.getElementById('spinner').classList.remove('d-none');

    let usersData;

    /* Verificación de datos de usuarios en el almacenamiento local */
    const storedUsersData = localStorage.getItem('usersData');

    if (storedUsersData) {
      usersData = JSON.parse(storedUsersData);
      setTimeout(() => {
        document.getElementById('spinner').classList.add('d-none');
        displayUsers(usersData.data);
      }, 1000);
    } else {
      /* Realizar la solicitud fetch si no hay datos en el almacenamiento local  */
      const response = await fetch('https://reqres.in/api/users?delay=3');
      usersData = await response.json();

      /* Se guardan los datos de usuarios en el almacenamiento local */
      localStorage.setItem('usersData', JSON.stringify(usersData));

      /* Se oculta el spinner después de recibir los datos y mostrar los usuarios */
      document.getElementById('spinner').classList.add('d-none');
      displayUsers(usersData.data);
    }
  } catch (error) {
    console.error('Error al recuperar usuarios:', error);
    document.getElementById('spinner').classList.add('d-none');
  }
}

function displayUsers(users) {
  const userCardsContainer = document.getElementById('userCards');
  userCardsContainer.innerHTML = '';

  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card', 'col-md-4');
    userCard.innerHTML = `
      <div class="card user-card">
        <img src="${user.avatar}" class="card-img-top user-avatar" alt="Avatar">
        <div class="card-body">
          <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
          <p class="card-text">${user.email}</p>
        </div>
      </div>
    `;
    userCardsContainer.appendChild(userCard);
  });
}
