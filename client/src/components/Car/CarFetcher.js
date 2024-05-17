import { useCallback } from "react";
import { getCarList, getCarsByEmail } from "../../api/api";

export const useCarFetcher = () => {
  const fetchAllCars = useCallback(async () => {
    try {
      const cars = await getCarList();
      const sortedCars = cars.sort((a, b) => b.yearOfMade - a.yearOfMade);
      console.log("Fetched all cars:", sortedCars);
      return sortedCars || [];
    } catch (error) {
      console.error("Error fetching all cars:", error);
      return [];
    }
  }, []);

  const fetchCarsByEmail = useCallback(async (email) => {
    try {
      const cars = await getCarsByEmail(email);
      console.log("Fetched cars by email in fetchCarsByEmail:", cars);
      if (!cars) {
        console.error("Cars is undefined in fetchCarsByEmail");
        throw new Error("Received undefined response from getCarsByEmail");
      }
      if (!Array.isArray(cars)) {
        console.error("Cars is not an array in fetchCarsByEmail:", cars);
        throw new Error("Unexpected response format, expected an array");
      }
      return cars;
    } catch (error) {
      console.error("Error fetching cars by email:", error);
      throw error;
    }
  }, []);

  return { fetchAllCars, fetchCarsByEmail };
};
