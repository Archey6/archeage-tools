export const substitute = (template, obj, showKey) => template.replace(/\${([\w_]+)(\[["']?([\w_]+)["']?])?}/gi, (match, key, _, index) => {
  let val;
  if (_) {
    val = obj[key] ? obj[key][index] : null;
  } else {
    val = obj[key];
  }
  if (showKey) {
    val = `<span class="text-white">[${key}]</span> ${val}`;
  }
  return val;
});

export const getNavId = (path) => path && path.substr(1).replace('/', '_');

export const setTitle = (title) => {
  if (title) {
    document.title = `${title} - ArcheRage Tools`;
  } else {
    document.title = 'ArcheRage Tools';
  }
};

export const scrollTo = (elementId, behavior = 'smooth', block = 'start') => {
  document.getElementById(elementId).scrollIntoView({ behavior, block });
};

export const scrollToTop = () => {
  scrollTo('app');
};

export const validateQuantity = (min, max) => (value) => {
  if (!value) return;
  if (String(value).indexOf('.') >= 0) return Math.floor(value);
  if (value <= min) value = min;
  if (value > max) value = max;
  return value;
};

export const pascalCase = (s) => {
  return s.replace(/(\w)(\w*)/g, (g0, g1, g2) => {
    return g1.toUpperCase() + g2.toLowerCase();
  }).replace(/([^\w])/g, () => '');
};

export const delimitName = (text) => {
  return text.replace(/([^0-9])([A-Z0-9])/g, '$1-$2').trim().toLowerCase();
};

export const slug = (text) => {
  return text.toLowerCase()
  .replace(/[^\w ]+/g, '')
  .split(' ')
  .join('-');
};

export const unslug = (slug) => {
  return slug.toLowerCase()
  .split('-')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join('');
};

export const transformLines = (string) => string.replace(/\n/g, '<br />');

export const encodeColors = (string) => {
  string = string.replace(/\|c([A-Z_]+)\|/g, (match, capture) => `<span class="text-${capture.toLowerCase()}">`);
  string = string.replace(/\|c\|/g, () => `</span>`);
  return transformLines(string);
};

export const eqIgnoreCase = (str1, str2) => {
  if (str1 === null && str2 === null) {
    return true;
  }

  str1 = String(str1);
  str2 = String(str2);

  if (str1 === str2) {
    return true;
  }

  return (str1.toLowerCase() === str2.toLowerCase());
};

export const randomString = (length) => {
  return Math.random().toString(36).substring(2, Math.ceil(length / 2) + 2) + Math.random().toString(36).substring(2, Math.floor(length / 2) + 2);
};
