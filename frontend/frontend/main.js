const API_URL = 'http://localhost:3000/items';

   document.addEventListener('DOMContentLoaded', () => {
       fetchItems();
   });

   function fetchItems() {
       fetch(API_URL)                                                                                                                                                                
           .then(response => response.json())
           .then(data => {
               const itemList = document.getElementById('itemList');
               itemList.innerHTML = '';
               data.forEach(item => {
                   const li = document.createElement('li');
                   li.textContent = item.name;
                   li.id = item.id;

                   const editBtn = document.createElement('button');
                   editBtn.textContent = 'Edit';
                   editBtn.className = 'edit';
                   editBtn.onclick = () => editItem(item.id);

                   const deleteBtn = document.createElement('button');
                   deleteBtn.textContent = 'Delete';
                   deleteBtn.className = 'delete';
                   deleteBtn.onclick = () => deleteItem(item.id);

                   li.appendChild(editBtn);
                   li.appendChild(deleteBtn);
                   itemList.appendChild(li);
               });
           });
   }

   function addItem() {
       const itemName = document.getElementById('itemName').value;
       fetch(API_URL, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({ name: itemName }),
       })
           .then(response => response.json())
           .then(data => {
               fetchItems();
               document.getElementById('itemName').value = '';
           });
   }

   function editItem(id) {
       const newName = prompt("Enter new name:");
       fetch(`${API_URL}/${id}`, {
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({ name: newName }),
       })
           .then(response => response.json())
           .then(data => {
               fetchItems();
           });
   }

   function deleteItem(id) {
       fetch(`${API_URL}/${id}`, {
           method: 'DELETE',
       })
           .then(() => {
               fetchItems();
           });
   }