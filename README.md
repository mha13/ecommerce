# 🍫 Cocoa Luxe — E-commerce Cioccolato

Un sito e-commerce per cioccolato artigianale premium, costruito con HTML, TailwindCSS e JavaScript vanilla.

## ⚠️ Prima di iniziare

Questo progetto utilizza **json-server** come backend API. È necessario avviarlo prima di aprire il sito.

```bash
npx json-server db.json
```

Il server sarà disponibile su `http://localhost:3000`.

## 🚀 Come avviare il progetto

1. **Clona il repository**
2. **Installa le dipendenze**
   ```bash
   npm install
   ```
3. **Avvia json-server**
   ```bash
   npx json-server db.json
   ```
4. **Apri `index.html`** nel browser (o usa Live Server)

## 📁 Struttura del progetto

```
ecommerce/
├── index.html          # Landing page principale
├── cart.html            # Pagina carrello
├── checkout.html        # Pagina checkout (finta)
├── db.json              # Database JSON (prodotti + carrello)
├── css/
│   └── style.css        # Stili personalizzati e animazioni
├── js/
│   ├── script.js        # Logica landing page e carrello
│   └── cart.js          # Logica pagina carrello
└── img/                 # Immagini prodotti e banner
```

## ✨ Funzionalità

- **Landing page** con hero banner, sezione prodotti, chi siamo e contatti
- **Carrello** — aggiungi prodotti, modifica quantità (+/−), elimina
- **Checkout** — form di spedizione e pagamento (simulato)
- **Notifiche** con SweetAlert2 (aggiunta al carrello, prodotto già presente, ecc.)
- **Newsletter** con salvataggio in localStorage
- **Responsive** — funziona su mobile, tablet e desktop
- **Menu hamburger** per dispositivi mobili

## 🛠️ Tecnologie utilizzate

- HTML5
- TailwindCSS v4 (CDN browser)
- JavaScript vanilla (ES6+)
- json-server (API REST fake)
- SweetAlert2 (notifiche toast)
- Google Fonts (Playfair Display, Inter)

## 📡 API Endpoints

| Metodo | Endpoint    | Descrizione                   |
| ------ | ----------- | ----------------------------- |
| GET    | `/products` | Lista tutti i prodotti        |
| GET    | `/cart`     | Lista elementi nel carrello   |
| POST   | `/cart`     | Aggiungi prodotto al carrello |
| PATCH  | `/cart/:id` | Aggiorna quantità             |
| DELETE | `/cart/:id` | Rimuovi dal carrello          |
