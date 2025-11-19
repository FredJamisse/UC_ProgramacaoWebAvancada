document.addEventListener('DOMContentLoaded', function () {
  console.log('script.js carregado ');

  const tableBody = document.getElementById('expertsTableBody');

  // Modais Bootstrap
  const viewModal = new bootstrap.Modal(document.getElementById('viewExpertModal'));
  const editModal = new bootstrap.Modal(document.getElementById('editExpertModal'));

  // Elementos do modal Ver
  const viewNome = document.getElementById('viewNome');
  const viewContacto = document.getElementById('viewContacto');
  const viewArea = document.getElementById('viewArea');

  // Elementos do modal Editar/Adicionar
  const editForm = document.getElementById('editExpertForm');
  const editNome = document.getElementById('editNome');
  const editContacto = document.getElementById('editContacto');
  const editArea = document.getElementById('editArea');
  const editTitle = document.getElementById('editExpertLabel');

  const btnAddExpert = document.getElementById('btnAddExpert');

  let currentRow = null; // null = modo Adicionar

  function atualizarNumeracao() {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach((row, index) => {
      row.cells[0].innerText = index + 1;
    });
  }

  // ---------- Adicionar Expert ----------
  btnAddExpert.addEventListener('click', function () {
    currentRow = null; // novo registo
    editTitle.textContent = 'Adicionar Expert';
    editNome.value = '';
    editContacto.value = '';
    editArea.value = '';
    editModal.show();
  });

  // ---------- Clicks na tabela (Ver, Editar, Remover) ----------
  tableBody.addEventListener('click', function (e) {
    const btnView = e.target.closest('.btn-view');
    const btnEdit = e.target.closest('.btn-edit');
    const btnDelete = e.target.closest('.btn-delete');

    // VER
    if (btnView) {
      const row = btnView.closest('tr');
      viewNome.textContent = row.cells[1].innerText;
      viewContacto.textContent = row.cells[2].innerText;
      viewArea.textContent = row.cells[3].innerText;
      viewModal.show();
      return;
    }

    // EDITAR
    if (btnEdit) {
      currentRow = btnEdit.closest('tr');
      editTitle.textContent = 'Editar Expert';
      editNome.value = currentRow.cells[1].innerText;
      editContacto.value = currentRow.cells[2].innerText;
      editArea.value = currentRow.cells[3].innerText;
      editModal.show();
      return;
    }

    // REMOVER
    if (btnDelete) {
      const row = btnDelete.closest('tr');
      const nome = row.cells[1].innerText;
      if (confirm('Tem a certeza que pretende remover o expert "' + nome + '"?')) {
        row.remove();
        atualizarNumeracao();
      }
    }
  });

  // ---------- Submit do formulário (Adicionar/Editar) ----------
  editForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = editNome.value.trim();
    const contacto = editContacto.value.trim();
    const area = editArea.value.trim();

    if (!nome || !contacto || !area) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (currentRow) {
      // Editar
      currentRow.cells[1].innerText = nome;
      currentRow.cells[2].innerText = contacto;
      currentRow.cells[3].innerText = area;
    } else {
      // Adicionar novo
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <th scope="row"></th>
        <td>${nome}</td>
        <td>${contacto}</td>
        <td>${area}</td>
        <td>
          <button type="button" class="btn btn-success btn-sm btn-edit">
            <i class="fas fa-edit"></i>
            <span>Editar</span>
          </button>
          <button type="button" class="btn btn-primary btn-sm btn-view">
            <i class="far fa-eye"></i>
            <span>Ver</span>
          </button>
          <button type="button" class="btn btn-danger btn-sm btn-delete">
            <i class="far fa-trash-alt"></i>
            <span>Remover</span>
          </button>
        </td>
      `;
      tableBody.appendChild(newRow);
      atualizarNumeracao();
    }

    editModal.hide();
  });
});
