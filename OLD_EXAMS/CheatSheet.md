# 🚀 ZI Express + EJS Ultimativni Šalabahter (MVC Ready)

Ovaj šalabahter sadrži točnu strukturu potrebnu za ispit (odvojene rute, više viewova) i pokriva sve scenarije (Globalno, Session, Edit, Dropdown).

**Sadržaj:**
- [1. `server.js` (Kostur aplikacije)](#1-serverjs-kostur-aplikacije)
- [2. Rute (MVC Router obrazac)](#2-rute-mvc-router-obrazac)
- [3. Scenariji podataka (Globalno vs Session)](#3-scenariji-podataka-globalno-vs-session)
- [4. Dodatne rute (Edit/Update logika)](#4-dodatne-rute-editupdate-logika)
- [5. EJS View predlošci (HTML)](#5-ejs-view-predlošci-html)
- [6. Checklist za predaju](#6-checklist-za-predaju)

---

## 1. `server.js` (Kostur aplikacije)
Ovo je osnova. Kopiraj ovako, samo pazi koje rutere uključuješ s `app.use()`.

```javascript
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Statika i Forme (OBAVEZNO urlencoded!)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); 

// Sjednice (Sessions / Cookies)
app.use(session({
  secret: "tajna",
  resave: false,
  saveUninitialized: true
}));

// RUTE - Pazi na prefikse!
app.use("/", require("./routes/home.routes")); 
app.use("/movies", require("./routes/movie.routes")); // Sve u movie.routes.js kreće s /movies

// Pokretanje
app.listen(8080, () => console.log("Slušam na http://localhost:8080"));
```

---

## 2. Rute (MVC Router obrazac)

### `routes/home.routes.js` (Jednostavna ruta)
```javascript
const express = require("express");
const router = express.Router();

// GET "/" 
router.get("/", (req, res) => {
  res.render("home"); // Prikazuje views/home.ejs
});

module.exports = router;
```

### `routes/movie.routes.js` (Glavna logika)
Ovdje koristimo globalnu varijablu `movies`. Ako zadatak traži Session, pogledaj Scenarij B ispod.

```javascript
const express = require("express");
const router = express.Router();

let movies = []; // Globalna baza
let nextId = 1;

// GET "/movies" - Prikaz liste
router.get("/", (req, res) => {
  res.render("movieList", { movies });
});

// GET "/movies/add" - Prikaz forme
router.get("/add", (req, res) => {
  res.render("addMovie");
});

// POST "/movies/add" - Spremanje iz forme
router.post("/add", (req, res) => {
  movies.push({ 
    id: nextId++, 
    naziv: req.body.naziv, 
    opis: req.body.opis 
  });
  res.redirect("/movies");
});

// POST "/movies/delete/:id" - Brisanje
router.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  movies = movies.filter(m => m.id !== id);
  res.redirect("/movies");
});

module.exports = router;
```

---

## 3. Scenariji podataka (Globalno vs Session)

Ako zadatak traži **"Svatko vidi samo svoje"** (Košarica/Session), zamijeni `POST /add` i `GET /` ovim kodom:

```javascript
// Umjesto globalne varijable, koristimo req.session!

// GET "/movies" - Prikaz samo vlastitih filmova
router.get("/", (req, res) => {
  if (!req.session.movies) req.session.movies = []; // Inicijalizacija
  res.render("movieList", { movies: req.session.movies });
});

// POST "/movies/add" - Spremanje u Session
router.post("/add", (req, res) => {
  if (!req.session.movies) req.session.movies = [];
  req.session.movies.push({ 
    id: Date.now(), // Drugi način generiranja ID-a
    naziv: req.body.naziv, 
    opis: req.body.opis 
  });
  res.redirect("/movies");
});

// BRISANJE iz Sessiona
router.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  req.session.movies = req.session.movies.filter(m => m.id !== id);
  res.redirect("/movies");
});
```

---

## 4. Dodatne rute (Edit/Update logika)
Ako zadatak traži uređivanje postojećeg unosa, dodaj ove rute u `movie.routes.js`:

```javascript
// GET "/movies/edit/:id" - Prikaz forme za uređivanje
router.get("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = movies.find(m => m.id === id);
  if (!film) return res.redirect("/movies"); // Ako ne postoji, nazad
  res.render("editMovie", { film }); // Šaljemo film u view da popunimo formu
});

// POST "/movies/edit/:id" - Spremanje izmjena
router.post("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = movies.find(m => m.id === id);
  if (film) {
    film.naziv = req.body.naziv; // Prepiši novo ime
    film.opis = req.body.opis;   // Prepiši novi opis
  }
  res.redirect("/movies");
});
```

---

## 5. EJS View predlošci (HTML)

### `views/home.ejs`
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <h1>Dobrodošli!</h1>
  <a href="/movies"><button>Pogledaj listu</button></a>
</body>
</html>
```

### `views/addMovie.ejs` (Sadrži i primjer Dropdowna!)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <h1>Dodaj novi film</h1>
  <form action="/movies/add" method="POST">
    
    <label>Naziv:</label>
    <input type="text" name="naziv" required>
    <br><br>

    <label>Opis:</label>
    <textarea name="opis" required></textarea>
    <br><br>

    <!-- PRIMJER DROPDOWNA (ako zadatak traži kategoriju) -->
    <label>Žanr:</label>
    <select name="zanr">
      <option value="akcija">Akcija</option>
      <option value="komedija">Komedija</option>
    </select>
    <br><br>

    <button type="submit">Spremi</button>
  </form>
  <br>
  <a href="/movies"><button>Natrag</button></a>
</body>
</html>
```

### `views/movieList.ejs` (Ispis i brisanje)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <h1>Lista filmova</h1>
  <a href="/movies/add"><button>Dodaj novi</button></a>
  <br><br>

  <% if (movies.length === 0) { %>
    <p>Nema unesenih filmova.</p>
  <% } %>

  <% movies.forEach(movie => { %>
    <div class="kartica">
      <h2><%= movie.naziv %></h2>
      <p><%= movie.opis %></p>
      
      <!-- Ako postoji dropdown podatak, ispišeš ga ovako: -->
      <!-- <p>Žanr: <%= movie.zanr %></p> -->

      <form action="/movies/delete/<%= movie.id %>" method="POST" style="display:inline;">
        <button type="submit" class="delete-btn">Obriši</button>
      </form>

      <!-- Link za edit (ako postoji ta funkcionalnost) -->
      <a href="/movies/edit/<%= movie.id %>"><button>Uredi</button></a>
    </div>
  <% }); %>
</body>
</html>
```

### `views/editMovie.ejs` (Forma s popunjenim podacima)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <h1>Uredi film</h1>
  <!-- Pazi na akciju forme i metodu! -->
  <form action="/movies/edit/<%= film.id %>" method="POST">
    
    <label>Naziv:</label>
    <!-- Value polje puni formu postojećim podacima! -->
    <input type="text" name="naziv" value="<%= film.naziv %>" required>
    <br><br>

    <label>Opis:</label>
    <textarea name="opis" required><%= film.opis %></textarea>
    <br><br>

    <button type="submit">Spremi izmjene</button>
  </form>
  <br>
  <a href="/movies"><button>Natrag</button></a>
</body>
</html>
```

---

## 6. Checklist za predaju
- [ ] `server.js` sluša na portu 8080.
- [ ] Uključio sam `express.urlencoded({ extended: true })` u server.js (bez ovoga forme ne rade).
- [ ] Sve rute su odvojene u `/routes` mapu prema zahtjevu.
- [ ] Promijenio sam varijable iz primjera (npr. `items`) u one koje zadatak traži (npr. `movies`).
- [ ] Ako je korišten Session, provjerio sam pristupa li svatko samo svojim podacima.
- [ ] **OBRISAO SAM `node_modules` MAPU prije zipanja!**
- [ ] U Edgar komentar napisao što od traženog nije napravljeno (ako sve radi, napiši da je sve implementirano).
