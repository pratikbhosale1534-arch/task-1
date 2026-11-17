// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Contact form validation
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  subject: document.getElementById("subject"),
  message: document.getElementById("message")
};

function showError(fieldName, message) {
  document.getElementById(`${fieldName}Error`).textContent = message;
  fields[fieldName].classList.toggle("input-invalid", Boolean(message));
}

function validateForm() {
  let valid = true;
  const name = fields.name.value.trim();
  const email = fields.email.value.trim();
  const subject = fields.subject.value.trim();
  const message = fields.message.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const checks = {
    name: name ? "" : "Please enter your name.",
    email: !email ? "Please enter your email." : (!emailPattern.test(email) ? "Please enter a valid email address." : ""),
    subject: subject ? "" : "Please enter a subject.",
    message: message ? "" : "Please enter your message."
  };

  Object.entries(checks).forEach(([key, error]) => {
    showError(key, error);
    if (error) valid = false;
  });
  return valid;
}

Object.entries(fields).forEach(([key, input]) => {
  input.addEventListener("input", () => {
    showError(key, "");
    formStatus.textContent = "";
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";

  if (!validateForm()) {
    formStatus.textContent = "Please correct the highlighted fields.";
    formStatus.style.color = "#b64b42";
    return;
  }

  const name = fields.name.value.trim();
  formStatus.textContent = `Thank you, ${name}! Your form passed validation. (Demo only — no message was sent.)`;
  formStatus.style.color = "#105e57";
  contactForm.reset();
});

// Dynamic to-do list
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const clearCompletedButton = document.getElementById("clearCompleted");
let tasks = [];

function renderTasks() {
  todoList.innerHTML = "";
  const remaining = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = `${remaining} remaining · ${tasks.length} total`;

  if (tasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "No tasks yet. Add your first task above!";
    todoList.appendChild(empty);
    return;
  }

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `todo-item${task.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark ${task.text} as complete`);
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.text}`);
    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((currentTask) => currentTask.id !== task.id);
      renderTasks();
    });

    item.append(checkbox, text, deleteButton);
    todoList.appendChild(item);
  });
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (!text) {
    todoInput.focus();
    return;
  }

  tasks.push({ id: Date.now() + Math.random(), text, completed: false });
  todoInput.value = "";
  todoInput.focus();
  renderTasks();
});

clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
});

renderTasks();
