/**
 * @description
 * @param {Array} arr
 * @returns Array
 */
export const sortObjArray = (arr) => {
  const res = arr.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });
  return res;
};
/**
 * @description
 * @param {String} url
 * @returns Boolean
 */
export const isImage = (url) => {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};
