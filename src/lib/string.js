String.prototype.isEmpty = function() {
    let curIsEmpty = (this !== undefined) && (this === '');
    // console.log('String isEmpty function?: this=', this, ' ,curIsEmpty=', curIsEmpty);
    return curIsEmpty;
};

//from string to JSON dict
export function toJson(jsonStrOrJson){
  let convertedJson = jsonStrOrJson;
  let curType = typeof(jsonStrOrJson);
  console.log('toJson: curType=', curType);
  if (curType === 'string') {
    if (!jsonStrOrJson.isEmpty()) {
      convertedJson = JSON.parse(jsonStrOrJson);      
    }
  }

  console.log('convertedJson=', convertedJson);
  return convertedJson;
}