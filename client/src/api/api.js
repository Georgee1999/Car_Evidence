export async function createUser(userData) {
  const response = await fetch("http://localhost:8000/user/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  // zobrazení chybové zprávy z backendu
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to create car");
  }
  return await response.json();
}

export async function createCar(carData) {
  const response = await fetch("http://localhost:8000/car/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carData),
  });
  console.log(carData);

  // zobrazení chybové zprávy z backendu
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to create car");
  }
  return await response.json();
}


export async function getUserCars(userId) {
  console.log("Calling getUserCars with userId:", userId);
  const response = await fetch(`http://localhost:8000/user/cars?id=${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("Error response from API:", errorResponse);
    throw new Error(errorResponse.message || "Failed to find car");
  }
  const cars = await response.json();
  console.log("Received cars:", cars);
  return cars;
}

// api.js
export async function deleteCarBySpz(spz) {
  const response = await fetch("http://localhost:8000/car/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ SPZ: spz }),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to delete car");
  }
  return response.json();
};

export async function loginUser(email) {
  const response = await fetch('http://localhost:8000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }), // wrap email in an object
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Failed to login user');
  }
  return response.json();
}