export function nano(template: string, data: any) {
  return template.replace(/\{([\w\-\.]*)}/g, (str: string, key: string) => {
    const keys = key.split('.');
    let value = data[keys.shift()];
    for (const key of keys) {
      if (value.hasOwnProperty(key)) {
        value = value[key];
      } else {
        value = str;
      }
    }
    return value;
  });
}
