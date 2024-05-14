export async function createUser(userData) {
    const response = await fetch('http://localhost:8000/user/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
  
    // zobrazení chybové zprávy z backendu
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Failed to create car');
    }
    return await response.json();
  }

  export async function createCar(carData){
    const response = await fetch('http://localhost:8000/car/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData)
    });
    console.log(carData);

   // zobrazení chybové zprávy z backendu
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Failed to create car');
    }
    return await response.json();
  }