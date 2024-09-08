const todoKey = "reactTodo";

// Retrieve todo data from local storage
export const getLocalStorageTodoData = () => {
  const rawTodos = localStorage.getItem(todoKey);
  if (!rawTodos) return [];  // Return an empty array if no todos are found
  
  try {
    return JSON.parse(rawTodos);  // Parse and return the todos from local storage
  } catch (error) {
    console.error("Error parsing local storage data:", error);
    return [];  // Return an empty array if parsing fails
  }
};

// Save todo data to local storage
export const setLocalStorageTodoData = (todos) => {
  localStorage.setItem(todoKey, JSON.stringify(todos));  // Convert the todos array to a string and save it
};
