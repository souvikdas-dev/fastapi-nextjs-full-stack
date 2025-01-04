export const formatFieldErrors = (errors) => {
  return errors.reduce((acc, obj) => {
    const key = obj.loc[1]; // Grouping by the field property eg: "name", "email", or "age"
    if (!acc[key]) acc[key] = []; // Initialize the array for each name if not already present
    acc[key].push(obj.msg); // Push the age to the corresponding name's array
    return acc;
  }, {});
};

export const extractFormFields = (formData, fields = []) => {
  // Input validation
  if (typeof formData !== "object" || formData === null) {
    throw new TypeError("formData must be an object");
  }

  // Use reduce to build the result object
  return fields.reduce((acc, field) => {
    if (formData.has(field)) {
      acc[field] = formData.get(field);
    }
    return acc;
  }, {});
};
