console.log('Client-side code running');

//------------------------------------------------------
//constructor function for order

function Order(storeId, salesPersonId, cdId, pricePaid, date) {
  this.storeId = storeId;
  this.salesPersonId = salesPersonId;
  this.cdId = cdId;
  this.pricePaid = pricePaid;
  this.date = date;
}

//---------------------------------------------------------

const dateOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};

//----------------------------------------------------------

const create_button = document.getElementById('create-btn');
create_button.addEventListener('click', function (e) {
  console.log('create button was clicked');

  const order = createRandomOrder();

  // Get the order table element
  const orderTable = document.getElementById('order-table');

  // Get the table body element
  const tableBody = orderTable.getElementsByTagName('tbody')[0];

  // Clear existing rows
  console.log('Clearing table body...');
  tableBody.innerHTML = '';


  const row = document.createElement('tr');
  const storeIdCell = document.createElement('td');
  storeIdCell.textContent = order.storeId;
  row.appendChild(storeIdCell);
  const salesPersonIdCell = document.createElement('td');
  salesPersonIdCell.textContent = order.salesPersonId;
  row.appendChild(salesPersonIdCell);
  const cdIdCell = document.createElement('td');
  cdIdCell.textContent = order.cdId;
  row.appendChild(cdIdCell);
  const pricePaidCell = document.createElement('td');
  pricePaidCell.textContent = order.pricePaid;
  row.appendChild(pricePaidCell);
  const dateCell = document.createElement('td');
  dateCell.textContent = order.date;
  const date = new Date(order.date);
  dateCell.textContent = date.toLocaleDateString('en-US', dateOptions);
  row.appendChild(dateCell);

  tableBody.appendChild(row);

  console.log('Rendered order');
});

//-----------------------------------------------------------

const submit1_button = document.getElementById('submit-one-btn');
submit1_button.addEventListener('click', function (e) {
  console.log('submit 1 button was clicked');

  const order = createRandomOrder();
  submitOrder(order);

});

const submit500_button = document.getElementById('submit-500-btn');
submit500_button.addEventListener('click', function (e) {
  console.log('submit 500 button was clicked');

  for (let i = 1; i <= 500; i++) {
    const order = createRandomOrder();
    submitOrder(order);
  }
});


const selectLatest_button = document.getElementById('selectLatest-btn');
selectLatest_button.addEventListener('click', function (e) {
  console.log('select Latest button was clicked');

  getSelectLatest();

})

const selectMaxSalesPer_button = document.getElementById('selectMaxSalesPer-btn');
selectMaxSalesPer_button.addEventListener('click', function (e) {
  console.log('select Max SalesPerson button was clicked');

  getSelectMaxSalesPer();

})


function createRandomOrder() {
  const storeIds = [98053, 98007, 98077, 98055, 98011, 98046];

  const salesPersonIds = {
    98053: [1, 2, 3, 4],
    98007: [5, 6, 7, 8],
    98077: [9, 10, 11, 12],
    98055: [13, 14, 15, 16],
    98011: [17, 18, 19, 20],
    98046: [21, 22, 23, 24]
  };
  const cdIds = [123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453, 623451];
  const pricePaid = Math.floor(Math.random() * 11) + 5; // Generates a random integer between 5 and 15
  const date = new Date().toLocaleString();

  const storeId = storeIds[Math.floor(Math.random() * storeIds.length)];

  const allowedSalesPersonIds = salesPersonIds[storeId];
  const salesPersonId = allowedSalesPersonIds[Math.floor(Math.random() * allowedSalesPersonIds.length)];

  const cdId = cdIds[Math.floor(Math.random() * cdIds.length)];

  return new Order(storeId, salesPersonId, cdId, pricePaid, date);
};

//-----------------------------------------------------------------------

function submitOrder(order) {

  fetch('/submitOrder1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getSelectLatest() {

  fetch('/getSelectLatest', {
    method: 'GET'
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderOrders(data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getSelectMaxSalesPer() {

  fetch('/getSelectMaxSalesPer', {
    method: 'GET'
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderOrders(data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function renderOrders(orders) {
  // Get the order table element
  const orderTable = document.getElementById('order-table');
  console.log('Order table:', orderTable);

  // Get the table body element
  const tableBody = orderTable.getElementsByTagName('tbody')[0];
  console.log('Table body:', tableBody);

  // Clear existing rows
  console.log('Clearing table body...');
  tableBody.innerHTML = '';

  orders.forEach(function (order) {
    const row = document.createElement('tr');
    const storeIdCell = document.createElement('td');
    storeIdCell.textContent = order.storeId;
    row.appendChild(storeIdCell);
    const salesPersonIdCell = document.createElement('td');
    salesPersonIdCell.textContent = order.salesPersonId;
    row.appendChild(salesPersonIdCell);
    const cdIdCell = document.createElement('td');
    cdIdCell.textContent = order.cdId;
    row.appendChild(cdIdCell);
    const pricePaidCell = document.createElement('td');
    pricePaidCell.textContent = order.pricePaid;
    row.appendChild(pricePaidCell);
    const dateCell = document.createElement('td');
    const date = new Date(order.date);
    dateCell.textContent = date.toLocaleDateString('en-US', dateOptions);
    row.appendChild(dateCell);

    tableBody.appendChild(row);
  });

  console.log('Rendered orders:', orders);
}






