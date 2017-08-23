export const SET_ZOOM_LEVEL = "SET_ZOOM_LEVEL";
export const SET_CENTER = "SET_CENTER";

export function setCenter(lat, lng) {
  return {
    type: SET_CENTER,
    payload: {
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    }
  };
}
