const alert = document.querySelector(".alert");
const formulario = document.getElementById("formulario");
const pintarTodo = document.getElementById("pintarTodo");
const templateTodo = document.getElementById("templateTodo").content;

let todos = [];

const agregarTodo = (todo) => {
  const objetoTodo = {
    nombre: todo,
    id: `${Date.now()}`,
  };

  todos.push(objetoTodo);
};

const pintarTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));

  pintarTodo.textContent = "";

  const fragment = document.createDocumentFragment();

  todos.forEach((item) => {
    const clone = templateTodo.cloneNode(true);
    clone.getElementById("captura").textContent = item.nombre;

    clone.querySelector(".btn").dataset.id = item.id;
    fragment.appendChild(clone);
  });

  pintarTodo.appendChild(fragment);
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-danger")) {
    todos = todos.filter((item) => item.id !== e.target.dataset.id);
    pintarTodos();
  }
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  alert.classList.add("d-none");

  const data = new FormData(formulario);
  const [todo] = [...data.values()];

  if (!todo.trim()) {
    console.log("Todo vacio");
    alert.classList.remove("d-none");
    return;
  }

  agregarTodo(todo);
  pintarTodos();
});

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    pintarTodos();
  }
});
