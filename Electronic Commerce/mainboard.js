document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.sidebar a');
  const views = document.querySelectorAll('.view');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');

      // Hide all views
      views.forEach(view => {
        view.style.display = 'none';
      });

      // Show the selected view
      const selected = document.getElementById(targetView);
      if (selected) {
        selected.style.display = 'block';
      }
    });
  });

  // Set default visible section on page load
  views.forEach(view => view.style.display = 'none'); // Hide all
  const defaultView = document.getElementById("Registration");
  if (defaultView) defaultView.style.display = 'block';
});


  let supplierList = JSON.parse(localStorage.getItem("supplierList")) || [];

function addSupplier() {
  const name = document.getElementById('supplierName').value.trim();
  const email = document.getElementById('supplierEmail').value.trim();
  const phone = document.getElementById('supplierPhone').value.trim();

  if (!name || !email || !phone) {
    alert("Please fill in all fields.");
    return;
  }

  supplierList.push({ name, email, phone });
  localStorage.setItem("supplierList", JSON.stringify(supplierList)); // Save to localStorage
  renderSupplierList();

  document.getElementById('supplierName').value = '';
  document.getElementById('supplierEmail').value = '';
  document.getElementById('supplierPhone').value = '';
}


function renderSupplierList() {
  const tbody = document.getElementById('supplierList');
  tbody.innerHTML = '';
  supplierList.forEach((supplier, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${supplier.name}</td>
        <td>${supplier.email}</td>
        <td>${supplier.phone}</td>
        <td>
          <button class="btn-edit" onclick="editSupplier(${index})">Edit</button>
          <button onclick="deleteSupplier(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

let editIndex = null;

function editSupplier(index) {
  const supplier = supplierList[index];
  document.getElementById('supplierName').value = supplier.name;
  document.getElementById('supplierEmail').value = supplier.email;
  document.getElementById('supplierPhone').value = supplier.phone;
  
  editIndex = index;

  // Change the button text to "Update"
  const registerBtn = document.querySelector('.supplier-form button');
  registerBtn.textContent = "Update Supplier";
  registerBtn.onclick = updateSupplier;
}

function deleteSupplier(index) {
  if (confirm("Are you sure you want to delete this supplier?")) {
    supplierList.splice(index, 1);
    localStorage.setItem("supplierList", JSON.stringify(supplierList)); // Update localStorage
    renderSupplierList();
  }
}

function searchSupplier() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.querySelectorAll('#supplierList tr');

  rows.forEach(row => {
    const name = row.cells[0].textContent.toLowerCase();
    row.style.display = name.includes(search) ? '' : 'none';
  });
}

function updateSupplier() {
  const name = document.getElementById('supplierName').value.trim();
  const email = document.getElementById('supplierEmail').value.trim();
  const phone = document.getElementById('supplierPhone').value.trim();

  if (!name || !email || !phone) {
    alert("Please fill in all fields.");
    return;
  }

  supplierList[editIndex] = { name, email, phone };
  renderSupplierList();

  // Reset form and state
  document.getElementById('supplierName').value = '';
  document.getElementById('supplierEmail').value = '';
  document.getElementById('supplierPhone').value = '';

  const registerBtn = document.querySelector('.supplier-form button');
  registerBtn.textContent = "Register Supplier";
  registerBtn.onclick = addSupplier;

  editIndex = null;
}

document.addEventListener("DOMContentLoaded", () => {   
  renderSupplierList();    
});

let orders = JSON.parse(localStorage.getItem("orders")) || [];
let editindex = null;

function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function addOrder() {
  const product = document.getElementById("orderProduct").value.trim();
  const quantity = document.getElementById("orderQuantity").value.trim();
  const price = document.getElementById("orderPrice").value.trim();
  const date = document.getElementById("orderDate").value.trim();

  if (!product || !quantity || !price || !date) {
    alert("Please fill in all fields.");
    return;
  }

  orders.push({ product, quantity, price, date });
  saveOrders();
  renderOrders();

  clearOrderForm();
}

function renderOrders() {
  const tbody = document.getElementById("orderList");
  tbody.innerHTML = "";

  orders.forEach((order, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${order.product}</td>
        <td>${order.quantity}</td>
        <td>${order.price}</td>
        <td>${order.date}</td>
        <td>
          <button class="btn-edit" onclick="editOrder(${index})">Edit</button>
          <button onclick="deleteOrder(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function clearOrderForm() {
  document.getElementById("orderProduct").value = "";
  document.getElementById("orderQuantity").value = "";
  document.getElementById("orderPrice").value = "";
  document.getElementById("orderDate").value = "";
}

function editOrder(index) {
  const order = orders[index];
  document.getElementById("orderProduct").value = order.product;
  document.getElementById("orderQuantity").value = order.quantity;
  document.getElementById("orderPrice").value = order.price;
  document.getElementById("orderDate").value = order.date;

  editIndex = index;

  const addBtn = document.querySelector(".order-form button");
  addBtn.textContent = "Update Order";
  addBtn.onclick = updateOrder;
}

function updateOrder() {
  const product = document.getElementById("orderProduct").value.trim();
  const quantity = document.getElementById("orderQuantity").value.trim();
  const price = document.getElementById("orderPrice").value.trim();
  const date = document.getElementById("orderDate").value.trim();

  if (!product || !quantity || !price || !date) {
    alert("Please fill in all fields.");
    return;
  }

  orders[editIndex] = { product, quantity, price, date };
  saveOrders();
  renderOrders();

  clearOrderForm();

  const addBtn = document.querySelector(".order-form button");
  addBtn.textContent = "Add Order";
  addBtn.onclick = addOrder;

  editindex = null;
}

function deleteOrder(index) {
  if (confirm("Are you sure you want to delete this order?")) {
    orders.splice(index, 1);
    saveOrders();
    renderOrders();
  }
}

function searchOrder() {
  const query = document.getElementById("orderSearchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#orderList tr");
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? "" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrders();
});

let contracts = JSON.parse(localStorage.getItem("contracts")) || [];
let contractEditIndex = null;

function saveContracts() {
  localStorage.setItem("contracts", JSON.stringify(contracts));
}

function addContract() {
  const name = document.getElementById("contractName").value.trim();
  const supplier = document.getElementById("contractSupplier").value.trim();
  const start = document.getElementById("contractStart").value;
  const end = document.getElementById("contractEnd").value;
  const details = document.getElementById("contractDetails").value.trim();

  if (!name || !supplier || !start || !end || !details) {
    alert("Please fill in all contract fields.");
    return;
  }

  if (contractEditIndex !== null) {
    contracts[contractEditIndex] = { name, supplier, start, end, details };
    contractEditIndex = null;
  } else {
    contracts.push({ name, supplier, start, end, details });
  }

  saveContracts();
  renderContracts();
  clearContractForm();
}

function renderContracts() {
  const tbody = document.getElementById("contractList");
  tbody.innerHTML = "";

  contracts.forEach((contract, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${contract.name}</td>
        <td>${contract.supplier}</td>
        <td>${contract.start}</td>
        <td>${contract.end}</td>
        <td>${contract.details}</td>
        <td>
          <button class="btn-edit" onclick="editContract(${index})">Edit</button>
  <button class="btn-delete" onclick="deleteContract(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function clearContractForm() {
  document.getElementById("contractName").value = '';
  document.getElementById("contractSupplier").value = '';
  document.getElementById("contractStart").value = '';
  document.getElementById("contractEnd").value = '';
  document.getElementById("contractDetails").value = '';
  document.querySelector(".contract-form button").textContent = "Add Contract";
}

function editContract(index) {
  const contract = contracts[index];
  document.getElementById("contractName").value = contract.name;
  document.getElementById("contractSupplier").value = contract.supplier;
  document.getElementById("contractStart").value = contract.start;
  document.getElementById("contractEnd").value = contract.end;
  document.getElementById("contractDetails").value = contract.details;
  contractEditIndex = index;
  document.querySelector(".contract-form button").textContent = "Update Contract";
}

function deleteContract(index) {
  if (confirm("Are you sure you want to delete this contract?")) {
    contracts.splice(index, 1);
    saveContracts();
    renderContracts();
  }
}

function searchContract() {
  const query = document.getElementById("contractSearch").value.toLowerCase();
  const rows = document.querySelectorAll("#contractList tr");
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? "" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderContracts();
});

let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
let editAnnouncementIndex = null;

function addAnnouncement() {
  const title = document.getElementById("announcementTitle").value.trim();
  const message = document.getElementById("announcementMessage").value.trim();

  if (!title || !message) return alert("Please enter both title and message.");

  if (editAnnouncementIndex !== null) {
    announcements[editAnnouncementIndex].title = title;
    announcements[editAnnouncementIndex].message = message;
    announcements[editAnnouncementIndex].date = new Date().toLocaleString();

    editAnnouncementIndex = null;
    document.getElementById("announcementSubmitBtn").textContent = "Post Announcement";
  } else {
    announcements.push({ title, message, date: new Date().toLocaleString() });
  }

  localStorage.setItem("announcements", JSON.stringify(announcements));
  renderAnnouncements();

  document.getElementById("announcementTitle").value = '';
  document.getElementById("announcementMessage").value = '';
}

function renderAnnouncements() {
  const list = document.getElementById("announcementList");
  list.innerHTML = '';

  announcements.forEach((a, index) => {
    list.innerHTML += `
  <li>
    <strong>${a.title}</strong> <em>(${a.date})</em><br>
    ${a.message}<br>
    <div class="btn-group">
      <button class="edit-btn" onclick="editAnnouncement(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteAnnouncement(${index})">Delete</button>
    </div>
  </li>
`;

  });
}

function editAnnouncement(index) {
  const announcement = announcements[index];
  document.getElementById("announcementTitle").value = announcement.title;
  document.getElementById("announcementMessage").value = announcement.message;

  editAnnouncementIndex = index;
  document.getElementById("announcementSubmitBtn").textContent = "Update Announcement";
}

function deleteAnnouncement(index) {
  if (confirm("Delete this announcement?")) {
    announcements.splice(index, 1);
    localStorage.setItem("announcements", JSON.stringify(announcements));
    renderAnnouncements();

    if (editAnnouncementIndex === index) {
      document.getElementById("announcementTitle").value = '';
      document.getElementById("announcementMessage").value = '';
      editAnnouncementIndex = null;
      document.getElementById("announcementSubmitBtn").textContent = "Post Announcement";
    }
  }
}

document.addEventListener("DOMContentLoaded", renderAnnouncements);


