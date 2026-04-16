const inventory = [
  {
    code: 'E03-1',
    name: 'Downlight Recessed Type MR16',
    category: 'Downlights',
    supplier: 'Biglite',
    cost: 0,
    sellingPrice: 75,
    stockQty: 0,
  },
  {
    code: 'E07-1',
    name: 'Downlight Recessed Type MR16',
    category: 'Downlights',
    supplier: 'Biglite',
    cost: 0,
    sellingPrice: 66,
    stockQty: 0,
  },
  {
    code: 'E86-1',
    name: 'Downlight Recessed Type MR16',
    category: 'Downlights',
    supplier: 'Biglite',
    cost: 0,
    sellingPrice: 150,
    stockQty: 0,
  },
  {
    code: '3034 WH',
    name: 'Downlight Recessed Type MR16',
    category: 'Downlights',
    supplier: 'Biglite',
    cost: 0,
    sellingPrice: 165,
    stockQty: 0,
  },
  {
    code: 'BL-4404 4W DL/WW',
    name: 'RD LED Slim Downlight 4W',
    category: 'Downlights',
    supplier: 'Biglite',
    cost: 0,
    sellingPrice: 170,
    stockQty: 0,
  },
  {
    code: 'BL-4406 6W DL/WW',
    name: 'RD LED Slim Downlight 6W',
    category: 'Downlights',
    supplier: 'Biglite',
    cost: 0,
    sellingPrice: 185,
    stockQty: 0,
  },
  {
    code: 'BL-4409 9W DL/WW',
    name: 'RD LED Slim Downlight 9W',
    category: 'Downlights',
    supplier: 'Biglite',
    cost: 0,
    sellingPrice: 215,
    stockQty: 0,
  },
  {
    code: 'BL-4412 12W DL/WW',
    name: 'RD LED Slim Downlight 12W',
    category: 'Downlights',
    supplier: 'Biglite',
    cost: 0,
    sellingPrice: 250,
    stockQty: 0,
  }
];

const inventoryBody = document.getElementById('inventoryBody');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

function formatMoney(value) {
  return value.toFixed(2);
}

function grossProfitPerItem(item) {
  return item.sellingPrice - item.cost;
}

function renderTable(items) {
  if (!items.length) {
    inventoryBody.innerHTML =
      '<tr class="empty-row"><td colspan="8">No products found.</td></tr>';
    return;
  }

  inventoryBody.innerHTML = items
    .map((item) => {
      const grossProfit = grossProfitPerItem(item);
      return `
        <tr>
          <td>${item.code}</td>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>${item.supplier}</td>
          <td>${formatMoney(item.cost)}</td>
          <td>${formatMoney(item.sellingPrice)}</td>
          <td>${item.stockQty}</td>
          <td>${formatMoney(grossProfit)}</td>
        </tr>
      `;
    })
    .join('');
}

function fillCategoryFilter() {
  const categories = [...new Set(inventory.map((item) => item.category))].sort();
  for (const category of categories) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  }
}

function filterInventory() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = inventory.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    const searchableText = `${item.code} ${item.name} ${item.category} ${item.supplier}`.toLowerCase();
    const matchesSearch = searchableText.includes(searchValue);

    return matchesCategory && matchesSearch;
  });

  renderTable(filtered);
}

searchInput.addEventListener('input', filterInventory);
categoryFilter.addEventListener('change', filterInventory);

fillCategoryFilter();
renderTable(inventory);
