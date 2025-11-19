document.addEventListener("DOMContentLoaded", function () {
  initExperts();
  initSponsors();
});


   //Gestão de Experts

function initExperts() {
  const tableBody = document.getElementById("expertsTableBody");
  if (!tableBody) {
    return; // Não está na página de Experts
  }

  const viewModalEl = document.getElementById("viewExpertModal");
  const editModalEl = document.getElementById("editExpertModal");
  if (!viewModalEl || !editModalEl) {
    return;
  }

  const viewModal = new bootstrap.Modal(viewModalEl);
  const editModal = new bootstrap.Modal(editModalEl);

  const viewNome = document.getElementById("viewNome");
  const viewContacto = document.getElementById("viewContacto");
  const viewArea = document.getElementById("viewArea");

  const editForm = document.getElementById("editExpertForm");
  const editNome = document.getElementById("editNome");
  const editContacto = document.getElementById("editContacto");
  const editArea = document.getElementById("editArea");
  const editTitle = document.getElementById("editExpertLabel");

  const btnAddExpert = document.getElementById("btnAddExpert");

  let currentRow = null;

  function atualizarNumeracaoExperts() {
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row, index) => {
      row.cells[0].innerText = index + 1;
    });
  }

  if (btnAddExpert) {
    btnAddExpert.addEventListener("click", function () {
      currentRow = null;
      editTitle.textContent = "Adicionar Expert";
      editNome.value = "";
      editContacto.value = "";
      editArea.value = "";
      editModal.show();
    });
  }

  tableBody.addEventListener("click", function (e) {
    const btnView = e.target.closest(".btn-view");
    const btnEdit = e.target.closest(".btn-edit");
    const btnDelete = e.target.closest(".btn-delete");

    if (btnView) {
      const row = btnView.closest("tr");
      viewNome.textContent = row.cells[1].innerText;
      viewContacto.textContent = row.cells[2].innerText;
      viewArea.textContent = row.cells[3].innerText;
      viewModal.show();
      return;
    }

    if (btnEdit) {
      currentRow = btnEdit.closest("tr");
      editTitle.textContent = "Editar Expert";
      editNome.value = currentRow.cells[1].innerText;
      editContacto.value = currentRow.cells[2].innerText;
      editArea.value = currentRow.cells[3].innerText;
      editModal.show();
      return;
    }

    if (btnDelete) {
      const row = btnDelete.closest("tr");
      const nome = row.cells[1].innerText;
      const confirmar = confirm("Tem a certeza que pretende remover o expert '" + nome + "'?");
      if (confirmar) {
        row.remove();
        atualizarNumeracaoExperts();
      }
    }
  });

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = editNome.value.trim();
    const contacto = editContacto.value.trim();
    const area = editArea.value.trim();

    if (!nome || !contacto || !area) {
      alert("Por favor preencha todos os campos.");
      return;
    }

    if (currentRow) {
      currentRow.cells[1].innerText = nome;
      currentRow.cells[2].innerText = contacto;
      currentRow.cells[3].innerText = area;
    } else {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <th scope="row"></th>
        <td>${nome}</td>
        <td>${contacto}</td>
        <td>${area}</td>
        <td>
          <button type="button" class="btn btn-success btn-sm btn-edit">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button type="button" class="btn btn-primary btn-sm btn-view">
            <i class="far fa-eye"></i> Ver
          </button>
          <button type="button" class="btn btn-danger btn-sm btn-delete">
            <i class="far fa-trash-alt"></i> Remover
          </button>
        </td>
      `;
      tableBody.appendChild(newRow);
      atualizarNumeracaoExperts();
    }

    editModal.hide();
  });
}


   //Gestão de Sponsors

function initSponsors() {
  const tableBody = document.getElementById("sponsorsTableBody");
  if (!tableBody) {
    return; // Não está na página de Sponsors
  }

  const viewModalEl = document.getElementById("viewSponsorModal");
  const editModalEl = document.getElementById("editSponsorModal");
  if (!viewModalEl || !editModalEl) {
    return;
  }

  const viewModal = new bootstrap.Modal(viewModalEl);
  const editModal = new bootstrap.Modal(editModalEl);

  const viewNome = document.getElementById("viewNome");
  const viewContacto = document.getElementById("viewContacto");
  const viewAnimal = document.getElementById("viewAnimal");

  const editForm = document.getElementById("editSponsorForm");
  const editNome = document.getElementById("editNome");
  const editContacto = document.getElementById("editContacto");
  const editAnimal = document.getElementById("editAnimal");
  const editTitle = document.getElementById("editSponsorLabel");

  const btnAddSponsor = document.getElementById("btnAddSponsor");

  let currentRow = null;

  function atualizarNumeracaoSponsors() {
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row, index) => {
      row.cells[0].innerText = index + 1;
    });
  }

  if (btnAddSponsor) {
    btnAddSponsor.addEventListener("click", function () {
      currentRow = null;
      editTitle.textContent = "Adicionar Sponsor";
      editNome.value = "";
      editContacto.value = "";
      editAnimal.value = "";
      editModal.show();
    });
  }

  tableBody.addEventListener("click", function (e) {
    const btnView = e.target.closest(".btn-view");
    const btnEdit = e.target.closest(".btn-edit");
    const btnDelete = e.target.closest(".btn-delete");

    if (btnView) {
      const row = btnView.closest("tr");
      viewNome.textContent = row.cells[1].innerText;
      viewContacto.textContent = row.cells[2].innerText;
      viewAnimal.textContent = row.cells[3].innerText;
      viewModal.show();
      return;
    }

    if (btnEdit) {
      currentRow = btnEdit.closest("tr");
      editTitle.textContent = "Editar Sponsor";
      editNome.value = currentRow.cells[1].innerText;
      editContacto.value = currentRow.cells[2].innerText;
      editAnimal.value = currentRow.cells[3].innerText;
      editModal.show();
      return;
    }

    if (btnDelete) {
      const row = btnDelete.closest("tr");
      const nome = row.cells[1].innerText;
      const confirmar = confirm("Tem a certeza que pretende remover o sponsor '" + nome + "'?");
      if (confirmar) {
        row.remove();
        atualizarNumeracaoSponsors();
      }
    }
  });

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = editNome.value.trim();
    const contacto = editContacto.value.trim();
    const animal = editAnimal.value.trim();

    if (!nome || !contacto || !animal) {
      alert("Por favor preencha todos os campos.");
      return;
    }

    if (currentRow) {
      currentRow.cells[1].innerText = nome;
      currentRow.cells[2].innerText = contacto;
      currentRow.cells[3].innerText = animal;
    } else {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <th scope="row"></th>
        <td>${nome}</td>
        <td>${contacto}</td>
        <td>${animal}</td>
        <td>
          <button type="button" class="btn btn-success btn-sm btn-edit">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button type="button" class="btn btn-primary btn-sm btn-view">
            <i class="far fa-eye"></i> Ver
          </button>
          <button type="button" class="btn btn-danger btn-sm btn-delete">
            <i class="far fa-trash-alt"></i> Remover
          </button>
        </td>
      `;
      tableBody.appendChild(newRow);
      atualizarNumeracaoSponsors();
    }

    editModal.hide();
  });
}
