const initialState = {
    assets: [{
        id: '0000-0001',
        type: "iphone", //or ESP8266, ESP32, Nefly, and more.
        view: {x: 4, y: 0, w: 3, h: 2}, // TBD: should be removed. Layoute follows 'layout' state.
        name: "my iPhone",
        dispId: "123456", // 製造番号相当
        place: "description",
        img: "./assets/asset_espr.jpg",
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
        img: "./assets/asset_espr.jpg",
    },
    {
        id: "esp32",
        name: "ESP32 DevKitC",
        desc: "Development Board of ESP-WROOM-32.",
        img: "./assets/asset_esp32.jpg",
    },
    {
        id: "uno",
        name: "Arduino UNO",
        desc: "A microcontroller board based on the ATmega328P.",
        img: "./assets/asset_arduino.jpg",
    },
    {
        id: "iphone",
        name: "iPhone",
        desc: "iPhone has many sensors, such as gps, acceleration, illuminance, and so on..",
        img: "./assets/asset_iphone.png",
    },
    ],
    currentAssetId: 0,
    assetConfigIsOpen: false,
    assetAddDialogIsOpen: false,
    layout: [],
    assetImgParamIsOpen: false,
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
    case 'ASSET_PARAM':
        if (action.method === 'update') {
        let assets = JSON.parse(JSON.stringify(state.assets));
        assets[action.assetIndex][action.name] = action.value;
            return {
                ...state,
                assets: assets,
            };
        }
        return state;
    case 'ASSET_PARAM_IMG_FIELD':
        let value: boolean;
        if (action.value === 'toggle') {
            value = !state.assetImgParamIsOpen;
        } else {
            value = action.value;
        }
            
        return {
            ...state,
            assetImgParamIsOpen: value,
        };
    case 'CURRENT_ASSET':
        console.log('currentAsset is ... ' + action.value);
        let asset = state.assets.filter((asset) => (asset.id === action.value))[0];
        let index = state.assets.indexOf(asset);
        return {
            ...state,
            currentAssetId: action.value,
            currentAssetIndex: index,
        }
    default:
      // console.log('default assets reducer is called.');
      return state;
  }
} 

