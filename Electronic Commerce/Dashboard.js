// dashboard.js

// ==== NAVIGATION & LOGOUT ====
document.addEventListener('DOMContentLoaded', () => {
    const links  = document.querySelectorAll('.sidebar a');
    const views  = document.querySelectorAll('.view');
    const logout = document.getElementById('logout');
  
    // Switch between sections
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetView = link.getAttribute('data-view');
        views.forEach(v => v.hidden = true);
        document.getElementById(targetView).hidden = false;
      });
    });
  
    // Logout redirection
    logout.addEventListener('click', () => {
      window.location.href = 'hr-portal.html';
    });
  
    // INITIAL RENDER OF EMPLOYEES
    loadEmployees();
    renderEmployees();
  });
  
  
  // ==== EMPLOYEE MANAGEMENT WITH LOCAL STORAGE ====
  
  const STORAGE_KEY = 'hrPortalEmployees';
  let employees = [];
  
  // Load from localStorage or initialize
  function loadEmployees() {
    const stored = localStorage.getItem(STORAGE_KEY);
    employees = stored ? JSON.parse(stored) : [];
  }
  
  // Save current array to localStorage
  function saveEmployees() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }
  
  // Show the Add Employee form
  function showAddForm() {
    document.getElementById('add-form').hidden = false;
  }
  
  // Hide the Add/Edit form
  function hideAddForm() {
    document.getElementById('add-form').hidden = true;
    // reset form inputs
    document.querySelector('#add-form form').reset();
  }
  
  // Handle adding a new employee
  function addEmployee(e) {
    e.preventDefault();
    const [nameInput, deptInput] = e.target.querySelectorAll('input');
    const newEmp = {
      id: Date.now(),               // unique ID based on timestamp
      name: nameInput.value.trim(),
      dept: deptInput.value.trim()
    };
    employees.push(newEmp);
    saveEmployees();
    renderEmployees();
    hideAddForm();
  }
  
  // Handle deleting an employee
  function deleteEmployee(id) {
    if (!confirm('Delete this employee?')) return;
    employees = employees.filter(emp => emp.id !== id);
    saveEmployees();
    renderEmployees();
  }
  
  // Handle editing an employee (prefill form, then save)
  function editEmployee(id) {
    const emp = employees.find(e => e.id === id);
    if (!emp) return alert('Employee not found.');
    
    // Show form and prefill
    showAddForm();
    const form = document.querySelector('#add-form form');
    form.elements[0].value = emp.name;
    form.elements[1].value = emp.dept;
    
    // Swap handler: remove add listener, add update listener
    form.removeEventListener('submit', addEmployeeWrapper);
    form.addEventListener('submit', function updateEmployee(event) {
      event.preventDefault();
      emp.name = form.elements[0].value.trim();
      emp.dept = form.elements[1].value.trim();
      saveEmployees();
      renderEmployees();
      hideAddForm();
      // cleanup: restore addEmployee handler
      form.removeEventListener('submit', updateEmployee);
      form.addEventListener('submit', addEmployeeWrapper);
    });
  }
  
  // Helper to attach addEmployee as event listener
  function addEmployeeWrapper(e) { addEmployee(e); }
  
  // Render the table of employees
  function renderEmployees() {
    const tbody = document.getElementById('emp-table-body');
    tbody.innerHTML = '';
  
    if (employees.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center">No employees yet</td></tr>';
      return;
    }
  
    employees.forEach(emp => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.dept}</td>
        <td>
          <button onclick="editEmployee(${emp.id})">Edit</button>
          <button onclick="deleteEmployee(${emp.id})">Delete</button>
        </td>`;
      tbody.appendChild(row);
    });
  }

// dashboard.js

// ========== NAVIGATION LOGIC (unchanged) ==========
document.addEventListener('DOMContentLoaded', function () {
  // Switch between sections
  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const view = this.getAttribute('data-view');
      document.querySelectorAll('.view').forEach(v => v.hidden = true);
      document.getElementById(view).hidden = false;
    });
  });

  // INITIALIZE PERFORMANCE MANAGEMENT DATA
  loadGoals();
  loadReviews();
});

// ========== PERFORMANCE MANAGEMENT ==========

// Retrieve arrays (or initialize to empty)
let goals = JSON.parse(localStorage.getItem("goals") || "[]");
let reviews = JSON.parse(localStorage.getItem("reviews") || "[]");

/** Renders the goals table with a delete button in each row */
function renderGoals() {
  const list = document.getElementById("goal-list");
  list.innerHTML = "";  // clear existing rows

  goals.forEach((g, index) => {
    // Create a table row with four columns: desc, due, status, action
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${g.desc}</td>
      <td>${g.due}</td>
      <td>${g.status}</td>
      <td>
        <button onclick="deleteGoal(${index})">Delete</button>
      </td>
    `;
    list.appendChild(row);
  });
}

/** Adds a new goal to the array & localStorage, then re-renders */
function addGoal(e) {
  e.preventDefault();
  const desc = document.getElementById("goal-desc").value.trim();
  const due = document.getElementById("goal-due").value;
  const status = document.getElementById("goal-status").value;

  if (!desc || !due) return;  // basic validation

  goals.push({ desc, due, status });
  localStorage.setItem("goals", JSON.stringify(goals));
  renderGoals();
  e.target.reset();
}

/** Deletes a goal at the given index, updates localStorage, then re-renders */
function deleteGoal(index) {
  goals.splice(index, 1);
  localStorage.setItem("goals", JSON.stringify(goals));
  renderGoals();
}

/** Loads goals from localStorage and renders them */
function loadGoals() {
  goals = JSON.parse(localStorage.getItem("goals") || "[]");
  renderGoals();
}

// ===== PERFORMANCE REVIEWS =====

/** Renders the review history table with a delete button in each row */
function renderReviews() {
  const list = document.getElementById("review-history");
  list.innerHTML = "";  // clear existing rows

  reviews.forEach((r, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.date}</td>
      <td>${r.reviewer}</td>
      <td>${r.rating}</td>
      <td>${r.comment}</td>
      <td>
        <button onclick="deleteReview(${index})">Delete</button>
      </td>
    `;
    list.appendChild(row);
  });
}

/** Adds a new review to the array & localStorage, then re-renders */
function submitReview(e) {
  e.preventDefault();
  const reviewer = document.getElementById("reviewer").value.trim();
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value.trim();

  if (!reviewer || !rating || !comment) return;  // basic validation

  const date = new Date().toLocaleDateString();
  reviews.push({ reviewer, rating, comment, date });
  localStorage.setItem("reviews", JSON.stringify(reviews));
  renderReviews();
  e.target.reset();
}

/** Deletes a review at the given index, updates localStorage, then re-renders */
function deleteReview(index) {
  reviews.splice(index, 1);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  renderReviews();
}

/** Loads reviews from localStorage and renders them */
function loadReviews() {
  reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  renderReviews();
}

// Attach form listeners after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("goal-form").addEventListener("submit", addGoal);
  document.getElementById("review-form").addEventListener("submit", submitReview);
});

//==============Employee self-service===============
let profile = JSON.parse(localStorage.getItem("profile") || "{}");
let leaves = JSON.parse(localStorage.getItem("leaves") || "[]");

function updateProfile(e) {
  e.preventDefault();
  profile.name = document.getElementById("emp-name").value;
  profile.email = document.getElementById("emp-email").value;
  profile.phone = document.getElementById("emp-phone").value;
  localStorage.setItem("profile", JSON.stringify(profile));
  alert("Profile updated!");
}

function loadProfile() {
  document.getElementById("emp-name").value = profile.name || "";
  document.getElementById("emp-email").value = profile.email || "";
  document.getElementById("emp-phone").value = profile.phone || "";
}

function applyLeave(e) {
  e.preventDefault();
  const start = document.getElementById("leave-start").value;
  const end = document.getElementById("leave-end").value;
  const type = document.getElementById("leave-type").value;
  const reason = document.getElementById("leave-reason").value;
  const status = "Pending";

  leaves.push({ start, end, type, reason, status });
  localStorage.setItem("leaves", JSON.stringify(leaves));
  renderLeaves();
  e.target.reset();
}

function renderLeaves() {
  const tbody = document.getElementById("leave-history");
  tbody.innerHTML = "";
  leaves.forEach((l, index) => {
    const row = `
      <tr>
        <td>${l.start}</td>
        <td>${l.end}</td>
        <td>${l.type}</td>
        <td>${l.reason}</td>
        <td>${l.status}</td>
        <td><button onclick="deleteLeave(${index})">Delete</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function deleteLeave(index) {
  if (confirm("Are you sure you want to delete this leave record?")) {
    leaves.splice(index, 1); // remove item at index
    localStorage.setItem("leaves", JSON.stringify(leaves));
    renderLeaves();
  }
}

document.addEventListener("DOMContentLoaded", () => {   
  renderLeaves();    
});

//================ Announcement / News Board ================
let announcements = JSON.parse(localStorage.getItem("announcements") || "[]");

function addAnnouncement(e) {
  e.preventDefault();
  const title = document.getElementById("announce-title").value.trim();
  const body = document.getElementById("announce-body").value.trim();
  const date = new Date().toLocaleString();

  announcements.unshift({ title, body, date }); // newest first
  localStorage.setItem("announcements", JSON.stringify(announcements));
  renderAnnouncements();
  e.target.reset();
}

function renderAnnouncements() {
  const board = document.getElementById("announcement-list");
  board.innerHTML = "";

  if (announcements.length === 0) {
    board.innerHTML = "<p>No announcements yet.</p>";
    return;
  }

  announcements.forEach((a, index) => {
    const item = document.createElement("div");
    item.className = "announcement-item";
    item.innerHTML = `
      <h4>${a.title}</h4>
      <p><em>${a.date}</em></p>
      <p>${a.body}</p>
      <div class="announcement-actions">
    <button onclick="editAnnouncement(${index})">Edit</button>
    <button onclick="deleteAnnouncement(${index})">Delete</button>
      </div>
    `;
    board.appendChild(item);
  });
}

function deleteAnnouncement(index) {
  if (confirm("Are you sure you want to delete this announcement?")) {
    announcements.splice(index, 1);
    localStorage.setItem("announcements", JSON.stringify(announcements));
    renderAnnouncements();
  }
}

function editAnnouncement(index) {
  const updatedTitle = prompt("Edit Title:", announcements[index].title);
  if (updatedTitle === null) return; // cancelled

  const updatedBody = prompt("Edit Message:", announcements[index].body);
  if (updatedBody === null) return;

  announcements[index].title = updatedTitle.trim();
  announcements[index].body = updatedBody.trim();
  announcements[index].date = new Date().toLocaleString();

  localStorage.setItem("announcements", JSON.stringify(announcements));
  renderAnnouncements();
}

document.addEventListener("DOMContentLoaded", () => {   
  renderAnnouncements();    
});









