export const saveStateToLocalStorage = (state:any) => {
  let wayfair2Str = localStorage.getItem('wayfair2');

  let wayfair2;

  if(wayfair2Str) {
    wayfair2 = JSON.parse(wayfair2Str);
  } else {
    wayfair2 = {};
  }
  
  wayfair2 = { ...wayfair2, ...state };
  localStorage.setItem('wayfair2', JSON.stringify(wayfair2));
};

