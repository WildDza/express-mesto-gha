const REGEXP_ID = /[a-f0-9]{24,24}/;
// eslint-disable-next-line no-useless-escape
const REGEXP_URL = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

module.exports = { REGEXP_ID, REGEXP_URL };
