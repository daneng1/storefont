let initialState = {
  products: [
    {category:'patio', 
    name: 'Teak Table', 
    description: 'Handmade Teak Table', 
    price: '$3665.99', 
    image: '../components/assets/outdoor-teak-extension-tables.jpeg',
    inventory: 35
  },
    {category:'patio', 
    name: 'Teak Chair', 
    description: 'Handmade Teak Chair', 
    price: '$629.99', 
    image: '../components/assets/Dining-Chairs-Teak.jpeg',
    inventory: 160,
    },
    {category:'patio',
    name: 'Outdoor Rug', 
    description: 'Washable Outdoor Rug', 
    price: '$565.99', 
    image: '../components/assets/ullio-black-ikat-indoor-outdoor-rugs.jpeg',
    inventory: 10 
    },
    {category:'kitchen', 
    name: 'Blender', 
    description: 'Handcrafted Blender with 12 speeds', 
    price: '$665.99',
    image: '../components/assets/kitchenaid-artisan-steel-blue-stand-mixer.jpeg', 
    inventory: 55 
    },
    {category:'kitchen', 
    name: 'Toaster', 
    description: 'Handcrafted Toaster with Bagel Slot', 
    price: '$165.99', 
    image: '../components/assets/haden-dorchester-toaster-sage.jpeg',
    inventory: 35,
    },
    {category:'kitchen', 
    name: 'Handspun Ceramic Dinnerware', 
    description: 'Handcrafted Dinnerware Set of 12', 
    price: '$1565.99', 
    image: '../components/assets/ora-16pc-dinnerware-set.jpeg',
    inventory: 5
    },
    {category:'games', 
    name: 'Exploding Kittens', 
    description: 'Exciting game with Kitten Guts', 
    price: '$65.99',
    images: '../components/assets/exploding.jpg', 
    inventory: 155 
    },
    {category:'games', 
    name: 'Bocceball Set', 
    description: 'Handcrafted Bocceball set', 
    price: '$365.99', 
    image: '../components/assets/bocce.jpg',
    inventory: 155
    }
  ]
}

export default function productReducer (state = initialState, action) {
  let { type, payload } = action;
  
  switch(type) {
    case 'ACTIVE_CATEGORY':
      let items = state.map((item) => {
        let displayItems = Object.assign({}, item);
        if(item.category === payload) {
          displayItems.active = true;
          return displayItems;
        } else {
          displayItems.active = false;
          return displayItems;
        }
      });
      return items;

      case 'RESET':
        return initialState;
  
      default:
        return state;
  }
}

export const activeProd = (category) => {
  return {
    type: 'ACTIVE',
    payload: category,
  };
};
