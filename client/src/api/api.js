// REGISTER USER
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

// LOGIN USER
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

// REGISTER CAR
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

// GET ALL CARS
export async function getCarList() {
  const response = await fetch("http://localhost:8000/car/list", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  // zobrazení chybové zprávy z backendu
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch list");
  }
  return await response.json();
}

// GET CARS BY E-MAIl
export async function getCarsByEmail(email) {
  const response = await fetch("http://localhost:8000/car/cars-by-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch cars by email");
  }
  const data = await response.json();
  console.log("API response data:", data); // Log the API response

  // Přidání kontroly pro vrácení prázdného pole, pokud data není pole
  if (!Array.isArray(data)) {
    console.error("API response is not an array:", data);
    return []; // Vrať prázdné pole, pokud není data pole
  }

  return data;
}





// DELETE CAR BY SPZ
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

