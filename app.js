// Storage Controller =======================================================================================


// Item Controller ==========================================================================================
const ItemCtrl = (function () {
  // Item Constructor 
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data structure / State 
  const data = {
    items: [
      // {
      //   id: 0,
      //   name: 'Steak Dinner',
      //   calories: 1200
      // },
      // {
      //   id: 1,
      //   name: 'Cookie',
      //   calories: 400
      // },
      // {
      //   id: 2,
      //   name: 'Eggs',
      //   calories: 300
      // }
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public Methods 
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;

      // Create ID 
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number 
      calories = parseInt(calories);

      // Create new item 
      newItem = new Item(ID, name, calories);

      // Add to items array 
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function (id) {
      let found = null;
      // Loop through the items 
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: function (name, calories) {
      // Turn the calories to a number 
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    deleteItem: function (id) {
      // Get Ids 
      const ids = data.items.map(function (item) {
        return item.id;
      });

      // Get index 
      const index = ids.indexOf(id);

      // Remove item 
      data.items.splice(index, 1);
    },
    clearAllItems: function () {
      data.items = [];
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    getTotalCalories: function () {
      let total = 0;
      // Loop through the items and add up the calories 
      data.items.forEach(function (item) {
        total += item.calories;
      });
      // Set total calories in data structure
      data.totalCalories = total;

      // Return total 
      return data.totalCalories;
    },
    logData: function () {
      return data;
    }
  }
})();










// UI Controller ============================================================================================
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
    listItems: '#item-list li'
  }

  // Public Methods
  return {
    populateItemList: function (items) {
      let html = '';

      items.forEach(function (item) {
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong><em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>
        `
      });

      // Insert list items 
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function (item) {
      // Show list 
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element 
      const li = document.createElement('li');
      // Add classes to the li 
      li.className = 'collection-item';
      // Add ID 
      li.id = `item-${item.id}`;
      // Add html 
      li.innerHTML = `
      <strong>${item.name}: </strong><em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
      `;
      // Insert item 
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node List into array 
      listItems = Array.from(listItems);

      listItems.forEach(function (listItem) {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>`
        }
      });
    },
    deleteListItem: function (id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    removeItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node List into an array 
      listItems = Array.from(listItems);

      listItems.forEach(function (item) {
        item.remove();
      });
    },
    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors: function () {
      return UISelectors;
    }
  }
})();











// App Controller ===========================================================================================
const App = (function (ItemCtrl, UICtrl) {
  // Load event listeners 
  const loadEventListeners = function () {
    // Get UI selectors 
    const UISelectors = UICtrl.getSelectors();

    // Add item event 
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit by enter key 
    document.addEventListener('keypress', function (e) {
      if (e.keycode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit Icon click event 
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event 
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete button event 
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Clear button event 
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

    // Back button event 
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

  }

  // Add item submit 
  const itemAddSubmit = function (e) {
    // Get form input from UI Controler 
    const input = UICtrl.getItemInput();

    // Check for name and calorie input 
    if (input.name !== '' && input.calories !== '') {
      // Add item 
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // Add item to the UI list 
      UICtrl.addListItem(newItem);
      // Get total calories 
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to the UI 
      UICtrl.showTotalCalories(totalCalories);
      // Clear input fields 
      UICtrl.clearInput();
    }


    e.preventDefault();
  }

  // Click Edit item 
  const itemEditClick = function (e) {
    if (e.target.classList.contains('edit-item')) {
      // Get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array 
      const listIdArr = listId.split('-');

      // Get the actual ID 
      const id = parseInt(listIdArr[1]);

      // Get Item 
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set Current Item 
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to the form 
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  }

  // Item update submit 
  const itemUpdateSubmit = function (e) {
    // Get item input 
    const input = UICtrl.getItemInput();

    // Update Item 
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI 
    UICtrl.updateListItem(updatedItem);

    // Get total calories 
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to the UI 
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  }

  // Item Delete button 
  const itemDeleteSubmit = function (e) {
    // Get current item 
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure 
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI 
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories 
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to the UI 
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  }

  // Clear items event 
  const clearAllItemsClick = function () {
    // Delete all items from data structure 
    ItemCtrl.clearAllItems();

    // Get total calories 
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the UI 
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI 
    UICtrl.removeItems();

    // Hide UL 
    UICtrl.hideList();


  }
  // Public methods
  return {
    init: function () {
      // Clear edit state / set initial state 
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items exist 
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate List with items 
        UICtrl.populateItemList(items);
      }
      // Get total calories 
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to the UI 
      UICtrl.showTotalCalories(totalCalories);


      // Load event listeners 
      loadEventListeners();

    }
  }
})(ItemCtrl, UICtrl);

// Init 
App.init();