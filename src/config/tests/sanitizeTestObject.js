const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const sanitizeValue = (value, field, keys) => {
  // If this current field is specified on the `keys` array, we simply redefine it
  // so it stays the same on the snapshot
  if (keys.indexOf(field) !== -1) {
    return `FROZEN-${field.toUpperCase()}`;
  }

  // Check if value is boolean
  if (typeof value === 'boolean') {
    return value;
  }

  // If value is empty, return `EMPTY` value so it's easier to debug
  if (!value && value !== 0) {
    return 'EMPTY';
  }

  // Check if it's not an array and can be transformed into a string
  if (!Array.isArray(value) && typeof value.toString === 'function') {
    // Remove any non-alphanumeric character from value
    const cleanValue = value.toString().replace(/[^a-z0-9]/gi, '');

    // Check if it's a valid `ObjectId`, if so, replace it with a static value
    if (ObjectId.isValid(cleanValue) && value.toString().indexOf(cleanValue) !== -1) {
      return value.toString().replace(cleanValue, 'ObjectId');
    }
  }

  // if it's an array, sanitize the field
  if (Array.isArray(value)) {
    return value.map(item => sanitizeValue(item, null, keys));
  }

  // If it's an object, we call sanitizeTestObject function again to handle nested fields
  if (typeof value === 'object') {
    return sanitizeTestObject(value, keys);
  }

  return value;
};

const sanitizeTestObject = (payload, keys = ['id'], ignore = ['password']) => {
  return Object.keys(payload).reduce((sanitizedObj, field) => {
    if (ignore.indexOf(field) !== -1) {
      return sanitizedObj;
    }

    const value = payload[field];
    const sanitizedValue = sanitizeValue(value, field, keys);

    return {
      ...sanitizedObj,
      [field]: sanitizedValue,
    };
  }, {});
}


module.exports = {
  sanitizeTestObject,
};
