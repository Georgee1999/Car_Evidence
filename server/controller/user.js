const express = require("express");
const router = express.Router(); // umožňuje definovat cesty (routes) a jejich obsluhu (handlers). Každá cesta je asociována s HTTP metodou (GET, POST, DELETE, atd.)

// Tady načítáte další modul do vaší aplikace, tentokrát se jedná o modul createAbl, který je uložený v adresáři abl/user/.
// Modul abl (který pravděpodobně znamená "Application Business Logic") obsahuje logiku, která se spustí, když uživatel pošle požadavek na vytvoření nového uživatele. Místo .. znamená, že cesta k souboru začíná
// v nadřazeném adresáři aktuálního umístění souboru controlleru.
const CreateAbl = require("../abl/user/createAbl");

// Jako druhý argument přijímá funkci, která má být zavolána, když server obdrží POST požadavek na tuto URL. 
// CreateAbl je tedy funkce, která obsahuje logiku pro zpracování tohoto požadavku.
// například vytvoření nového uživatele v systému.
router.post("/create", CreateAbl);
