/**
 * Event Helper
 * v2017.08.24
 */

export function stopEventPropgation(e){
  console.log(`stopEventPropgation:`);
  console.log(e);

  // most case not work here
  // but indeed WORK for form submit
  e.preventDefault();
  
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
}
