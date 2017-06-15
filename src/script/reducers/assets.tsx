const initialState = {
    assets: [{
        id: '0000-0001',
        type: "iphone", //or ESP8266, ESP32, Nefly, and more.
        view: {x: 4, y: 0, w: 3, h: 2}, // TBD: should be removed. Layoute follows 'layout' state.
        name: "my iPhone",
        dispId: "123456", // 製造番号相当
        place: "description",
        img: "url(./assets/asset_espr.jpg)",
        desc: "this is a iPhone",
        locale: {
            name: 'Japan',
            lat: 0.0,
            lng: 0.0,
        },
    }],
    assetTemplates: [{
        id: "espr",
        name: "ESPr Developer",
        desc: "Development Board of ESP8266 which is provided by Switch Science.",
        img: "url(./assets/asset_espr.jpg)",
    },
    {
        id: "esp32",
        name: "ESP32 DevKitC",
        desc: "Development Board of ESP-WROOM-32.",
        img: "url(./assets/asset_esp32.jpg)",
    },
    {
        id: "uno",
        name: "Arduino UNO",
        desc: "A microcontroller board based on the ATmega328P.",
        img: "url(./assets/asset_arduino.jpg)",
    },
    {
        id: "iphone",
        name: "iPhone",
        desc: "iPhone has many sensors, such as gps, acceleration, illuminance, and so on..",
        img: "url(./assets/asset_iphone.png",
    },
    ],
    currentAssetId: 0,
    assetConfigIsOpen: false,
    assetAddDialogIsOpen: false,
    layout: [],
}

export default function dashboard(state = initialState, action) {
  switch(action.type) {
    case 'openAddAssetDialog':
        console.log('reducer openAddAssetDialog is called.');
        return {
            ...state,
            assetAddDialogIsOpen: action.value,
        };
    case 'asset':
        console.log('add asset method is called');
        if (action.method === 'add') {
            return {
             ...state,
             assets: [...state.assets, action.asset ],
            };
        }
        return state;
    case 'LAYOUT':
        if (action.method === 'update') {
        console.log('===== update layout. =====');
            return {
                ...state,
                layout: action.layout,
            };
        }
        return state;
    default:
      // console.log('default assets reducer is called.');
      return state;
  }
} 

