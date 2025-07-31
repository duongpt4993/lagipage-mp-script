const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const infoShop = {
    id: '1942283994',
    apiKey: '8417827e527f490aa559c1b72f8b00aa',
    warehouseId: 'f9a8ff35-5f5f-49dc-aad9-1f7a0ea72477',
    variationId: '5a0d9a4c-8923-434c-a452-af89e0ad50b8',
  };

  let quantity = 0;
  const match = data?.order?.match?.(/combo\s+(\d+)/i) || [];
  if (match[1]) {
    quantity = Number(match[1]);
    quantity = isNaN(quantity) ? 0 : quantity;
  }

  const _dataPos = {
    bill_full_name: data.name,
    bill_phone_number: data.phone,
    shipping_address: { address: data.address, full_name: data.name, phone_number: data.phone },
    note: data.order,
    warehouse_id: infoShop.warehouseId,
    items: [{ quantity, variation_id: infoShop.variationId }],
  };

  fetch(`https://pos.pages.fm/api/v1/shops/${infoShop.id}/orders?api_key=${infoShop.apiKey}`, {
    method: 'POST',
    body: JSON.stringify(_dataPos),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((result) => console.log('✅ Server trả về:', result))
    .catch((err) => console.log('❌ Lỗi:', err));
});
