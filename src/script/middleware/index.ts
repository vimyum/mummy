
export const logger = store => next => action => {
    console.log("action: ", action);
    console.log("before: ", store.getState());
    next(action);
    console.log("after: %0", store.getState());
};

export const shareCurrentAsset = store => next => action => {
    console.log('shareCurrentAsset is called.');
    let assetsState = store.getState().assets;
    action.currentAsset = assetsState.assets[assetsState.currentAssetIndex];
    next(action);
    console.log('shareCurrentAsset is end.');
};
