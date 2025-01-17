export const formatErrors = (errors) => {
  if (errors instanceof Array)
    return errors.reduce((acc, obj) => {
      const key = obj.loc[1] ?? "server_errors";
      // Initialize object attribute if not present
      if (!acc[key]) acc[key] = [];
      acc[key].push(obj.msg);
      return acc;
    }, {});
  else
    return {
      server_errors: [errors],
    };
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

export function wait(seconds = 1.5) {
  // default wait for 1.5 seconds
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
