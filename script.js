let inventory = [];

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const inventoryBody = document.getElementById('inventoryBody');

function formatNumber(value) {
  return Number(value || 0).toFixed(2);
}

function renderTable(items) {
  inventoryBody.innerHTML = '';

  items.forEach((item) => {
    const grossProfit = Number(item.sellingPrice || 0) - Number(item.cost || 0);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.code || ''}</td>
      <td>${item.name || ''}</td>
      <td>${item.category || ''}</td>
      <td>${item.supplier || ''}</td>
      <td>${formatNumber(item.cost)}</td>
      <td>${formatNumber(item.sellingPrice)}</td>
      <td>${item.stockQty ?? 0}</td>
      <td>${formatNumber(grossProfit)}</td>
    `;
    inventoryBody.appendChild(row);
  });
}

function fillCategoryFilter() {
  const categories = [...new Set(inventory.map((item) => item.category).filter(Boolean))];
  categories.sort();

  categoryFilter.innerHTML = '<option value="all">All categories</option>';

  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function filterInventory() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  const filtered = inventory.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    const searchableText = `
      ${item.code || ''}
      ${item.name || ''}
      ${item.category || ''}
      ${item.supplier || ''}
    `.toLowerCase();

    const matchesSearch = searchableText.includes(searchValue);

    return matchesCategory && matchesSearch;
  });

  renderTable(filtered);
}

async function loadInventory() {
  try {
    const response = await fetch('products.json');

    if (!response.ok) {
      throw new Error('Failed to load products.json');
    }

    inventory = await response.json();

    fillCategoryFilter();
    renderTable(inventory);
  } catch (error) {
    console.error('Inventory load error:', error);
    inventoryBody.innerHTML = `
      <tr>
        <td colspan="8">Failed to load inventory data.</td>
      </tr>
    `;
  }
}

searchInput.addEventListener('input', filterInventory);
categoryFilter.addEventListener('change', filterInventory);

loadInventory();
