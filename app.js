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
    items: [{
        id: 0,
        name: 'Steak Dinner',
        calories: 1200
      },
      {
        id: 1,
        name: 'Cookie',
        calories: 400
      },
      {
        id: 2,
        name: 'Eggs',
        calories: 300
      }
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
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
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
    }


    e.preventDefault();
  }

  // Public methods
  return {
    init: function () {

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate List with items 
      UICtrl.populateItemList(items);

      // Load event listeners 
      loadEventListeners();

    }
  }
})(ItemCtrl, UICtrl);

// Init 
App.init();