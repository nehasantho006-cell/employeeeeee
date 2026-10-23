// ─── Frontend JavaScript (dist/app.js) ───────────────────────────────────────
// This file is part of the dist build — DO NOT EDIT

const API_BASE = "/api/employees";

// ── DOM References ────────────────────────────────────────────────────────────
const tableBody      = document.getElementById("employeeTableBody");
const totalCount     = document.getElementById("totalCount");
const modalOverlay   = document.getElementById("modalOverlay");
const modalTitle     = document.getElementById("modalTitle");
const employeeForm   = document.getElementById("employeeForm");
const addEmployeeBtn = document.getElementById("addEmployeeBtn");
const cancelBtn      = document.getElementById("cancelBtn");
const modalClose     = document.getElementById("modalClose");
const toast          = document.getElementById("toast");

// ── Utility: Show Toast ───────────────────────────────────────────────────────
function showToast(message, type = "success") {
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => { toast.className = "toast"; }, 3000);
}

// ── Utility: Open / Close Modal ───────────────────────────────────────────────
function openModal(title = "Add Employee") {
  modalTitle.textContent = title;
  modalOverlay.classList.add("active");
}
function closeModal() {
  modalOverlay.classList.remove("active");
  employeeForm.reset();
  document.getElementById("employeeId").value = "";
}

// ── Fetch: GET All Employees ──────────────────────────────────────────────────
async function fetchEmployees() {
  tableBody.innerHTML = `<tr><td colspan="8" class="loading-row">Loading…</td></tr>`;
  try {
    const res  = await fetch(API_BASE);
    const json = await res.json();
    renderTable(json.data || []);
  } catch {
    tableBody.innerHTML = `<tr><td colspan="8" class="loading-row" style="color:#ef4444">Failed to load employees. Is the server running?</td></tr>`;
  }
}

// ── Render Table ──────────────────────────────────────────────────────────────
function renderTable(employees) {
  totalCount.textContent = employees.length;
  if (!employees.length) {
    tableBody.innerHTML = `<tr><td colspan="8" class="empty-row">No employees found. Click <strong>+ Add Employee</strong> to get started.</td></tr>`;
    return;
  }
  tableBody.innerHTML = employees.map((emp, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.position}</td>
      <td>${emp.department}</td>
      <td>₹${Number(emp.salary).toLocaleString("en-IN")}</td>
      <td>${emp.phone || "—"}</td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-edit"   onclick="editEmployee('${emp._id}')">Edit</button>
          <button class="btn btn-delete" onclick="deleteEmployee('${emp._id}')">Delete</button>
        </div>
      </td>
    </tr>
  `).join("");
}

// ── Fetch: GET One Employee (for Edit) ───────────────────────────────────────
async function editEmployee(id) {
  try {
    const res  = await fetch(`${API_BASE}/${id}`);
    const json = await res.json();
    const emp  = json.data;
    document.getElementById("employeeId").value  = emp._id;
    document.getElementById("name").value        = emp.name;
    document.getElementById("email").value       = emp.email;
    document.getElementById("position").value    = emp.position;
    document.getElementById("department").value  = emp.department;
    document.getElementById("salary").value      = emp.salary;
    document.getElementById("phone").value       = emp.phone || "";
    openModal("Edit Employee");
  } catch {
    showToast("Could not load employee data", "error");
  }
}

// ── Fetch: DELETE Employee ────────────────────────────────────────────────────
async function deleteEmployee(id) {
  if (!confirm("Are you sure you want to delete this employee?")) return;
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Employee deleted successfully");
      fetchEmployees();
    } else {
      showToast("Delete failed", "error");
    }
  } catch {
    showToast("Server error", "error");
  }
}

// ── Form Submit: POST (add) or PUT (update) ───────────────────────────────────
employeeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("employeeId").value;
  const payload = {
    name:       document.getElementById("name").value.trim(),
    email:      document.getElementById("email").value.trim(),
    position:   document.getElementById("position").value.trim(),
    department: document.getElementById("department").value.trim(),
    salary:     Number(document.getElementById("salary").value),
    phone:      document.getElementById("phone").value.trim(),
  };

  try {
    const url    = id ? `${API_BASE}/${id}` : API_BASE;
    const method = id ? "PUT" : "POST";
    const res    = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (res.ok) {
      showToast(json.message || "Saved successfully");
      closeModal();
      fetchEmployees();
    } else {
      showToast(json.message || "Save failed", "error");
    }
  } catch {
    showToast("Server error", "error");
  }
});

// ── Event Listeners ───────────────────────────────────────────────────────────
addEmployeeBtn.addEventListener("click", () => openModal("Add Employee"));
cancelBtn.addEventListener("click", closeModal);
modalClose.addEventListener("click", (e) => {
  e.stopPropagation();
  closeModal();
});
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// ── Initial Load ──────────────────────────────────────────────────────────────
fetchEmployees();
