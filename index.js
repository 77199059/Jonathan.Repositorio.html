function handleFormSubmit(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const editId = submitButton.dataset.editId;

    const formData = new FormData(form); // Obtiene los datos del formulario
    const task = Object.fromEntries(formData); // Convierte los datos a un objeto
    task.id = editId || Date.now(); // Usa el ID existente si estamos editando

    const taskElement = createTaskElement(task); // Crea un elemento para la tarea
    const taskList = document.getElementById('task-list-container'); // Obtiene la lista de tareas del DOM
    if (!taskList) return; // Verifica si el contenedor de tareas existe antes de agregar la tarea

    taskList.appendChild(taskElement); // Agrega el elemento de la tarea a la lista de tareas

    submitButton.textContent = 'Entregar';
    delete submitButton.dataset.editId;
    form.reset();
}

function createTaskElement(task) {
    const divTaskContent = document.createElement('div'); // Crea un contenedor para las acciones de la tarea
    divTaskContent.classList.add('task-content'); // Agrega una clase para estilos

    const h3Title = document.createElement('h3'); // Crea un elemento para el título de la tarea
    h3Title.textContent = task.title; // Establece el texto del título de la tarea

    const pDescription = document.createElement('p'); // Crea un elemento para la descripción de la tarea
    pDescription.textContent = task.description; // Establece el texto de la descripción de la tarea

    divTaskContent.appendChild(h3Title); // Agrega el título al contenedor de la tarea
    divTaskContent.appendChild(pDescription); // Agrega la descripción al contenedor de la tarea

    const divTaskActions = document.createElement('div'); // Crea un contenedor para las acciones de la tarea
    divTaskActions.classList.add('task-actions'); // Agrega una clase para estilos

    const li = document.createElement('li'); // Crea un elemento de lista
    li.classList.add('task-item'); // Agrega una clase para estilos
    li.id = task.id; // Asigna el ID de la tarea al elemento

    const deleteButton = document.createElement('button'); // Crea un botón para eliminar la tarea
    deleteButton.textContent = 'Eliminar'; // Establece el texto del botón de eliminar
    deleteButton.addEventListener('click', () => {
        li.remove();
    });

    //creamo buton de editar
    const edtButton = document.createElement('button'); // Crea un botón para editar la tarea
    edtButton.textContent = 'Editar'; // Establece el texto del botón de editar
    edtButton.addEventListener('click', () => {
        const form = document.querySelector('form');
        const titleInput = form.querySelector('input[name="title"]');
        const descriptionInput = form.querySelector('textarea[name="description"]');
        const submitButton = form.querySelector('button[type="submit"]');

        titleInput.value = task.title;
        descriptionInput.value = task.description;
        submitButton.textContent = 'Guardar';
        submitButton.dataset.editId = task.id;

        li.remove();
    });

    divTaskActions.appendChild(deleteButton); // Agrega el botón de eliminar al contenedor de acciones
    divTaskActions.appendChild(edtButton); // Agrega el botón de editar al contenedor de acciones
    li.appendChild(divTaskContent); // Agrega el contenido de la tarea al elemento de lista
    li.appendChild(divTaskActions); // Agrega las acciones de la tarea al elemento de lista

    return li; // Devuelve el elemento de lista completo para ser agregado al DOM
}
