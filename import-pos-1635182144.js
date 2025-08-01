function importToPos() {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (e) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('data: ', data);

    const infoShop = {
      id: '1635182144',
      apiKey: '10661cbe9c3c4c2ba2860c809fc9c990',
      warehouseId: 'f57de9b4-1238-4194-8143-94c9469c38a3',
      variationId: '2d09cea9-b970-4271-9244-697c14bc2e09',
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
}

function main() {
  console.log('Chạy hàm importToPos');
  importToPos();
}

main();
