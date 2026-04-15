const inventory = [
  {
    code: 'LED-1001',
    name: '10W LED Bulb (Warm White)',
    category: 'Bulbs',
    supplier: 'BrightSource Co',
    cost: 2.1,
    sellingPrice: 4.8,
    stockQty: 320,
  },
  {
    code: 'PAN-2004',
    name: '24W Ceiling Panel Light',
    category: 'Panels',
    supplier: 'Luma Supplies',
    cost: 12.5,
    sellingPrice: 21.0,
    stockQty: 85,
  },
  {
    code: 'STR-3012',
    name: 'RGB Strip Light 5m',
    category: 'Strips',
    supplier: 'GlowTech Imports',
    cost: 7.4,
    sellingPrice: 14.9,
    stockQty: 140,
  },
  {
    code: 'SPT-4100',
    name: 'Adjustable Spot Light',
    category: 'Spotlights',
    supplier: 'BrightSource Co',
    cost: 9.2,
    sellingPrice: 18.0,
    stockQty: 60,
  },
  {
    code: 'OUT-5208',
    name: 'Outdoor Wall Lantern',
    category: 'Outdoor',
    supplier: 'North Beam Ltd',
    cost: 16.5,
    sellingPrice: 29.5,
    stockQty: 42,
  },
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
