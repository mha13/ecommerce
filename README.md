# 🎪 EventX — Piattaforma Eventi

Un sito web per la scoperta e prenotazione di eventi musicali e culturali, costruito con HTML, TailwindCSS e JavaScript vanilla.

## ⚠️ Prima di iniziare

Questo progetto utilizza **json-server** come backend API. È necessario avviarlo prima di aprire il sito.

```bash
npx json-server db/db.json
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
   npx json-server db/db.json
   ```
4. **Apri `index.html`** nel browser (o usa Live Server)

## 📁 Struttura del progetto

```
essame/
├── index.html          # Landing page principale (hero, eventi in evidenza, contatti)
├── eventi.html         # Catalogo completo degli eventi
├── cart.html            # Pagina carrello
├── checkout.html        # Pagina checkout (simulata)
├── aboutus.html         # Pagina "Chi Siamo"
├── contactus.html       # Pagina contatti con form
├── dovesiamo.html       # Pagina "Dove Siamo" con mappa
├── db/
│   └── db.json          # Database JSON (eventi + carrello)
├── css/
│   └── style.css        # Stili personalizzati e animazioni
├── js/
│   ├── general.js       # Funzioni globali (carrello badge, newsletter, menu mobile)
│   ├── script.js        # Logica landing page e aggiunta al carrello
│   ├── eventi.js        # Logica pagina catalogo eventi
│   ├── cart.js          # Logica pagina carrello (quantità, rimozione, riepilogo)
│   └── checkout.js      # Logica checkout (validazione form e pagamento)
└── img/                 # Immagini (slider, eventi, logo, background)
```

## ✨ Funzionalità

- **Landing page** con hero banner a schermo intero, barra caratteristiche, anteprima eventi, sezione "Chi Siamo" e form contatti
- **Catalogo eventi** — visualizzazione completa di tutti gli eventi disponibili con data, location e prezzo
- **Carrello** — aggiungi eventi, modifica quantità (+/−), elimina, riepilogo con subtotale e tasse
- **Checkout** — form di spedizione con selezione metodo di pagamento (carta di credito o contrassegno), validazione campi
- **Chi Siamo** — storia aziendale, missione, statistiche e punti di forza
- **Contattaci** — form di contatto completo con informazioni di contatto
- **Dove Siamo** — pagina dedicata alla localizzazione
- **Notifiche** con SweetAlert2 (aggiunta al carrello, evento già presente, errori, ecc.)
- **Newsletter** con salvataggio in localStorage
- **Carousel** immagini con Flowbite nella landing page
- **Responsive** — funziona su mobile, tablet e desktop
- **Menu hamburger** animato per dispositivi mobili

## 🛠️ Tecnologie utilizzate

- HTML5
- TailwindCSS v4 (CDN browser)
- JavaScript vanilla (ES6+)
- json-server (API REST fake)
- SweetAlert2 (notifiche toast)
- Flowbite (componente carousel)
- Google Fonts (Playfair Display, Inter)

## 📡 API Endpoints

| Metodo | Endpoint       | Descrizione                     |
| ------ | -------------- | ------------------------------- |
| GET    | `/eventi`      | Lista tutti gli eventi          |
| GET    | `/cart`        | Lista elementi nel carrello     |
| POST   | `/cart`        | Aggiungi evento al carrello     |
| PATCH  | `/cart/:id`    | Aggiorna quantità              |
| DELETE | `/cart/:id`    | Rimuovi dal carrello            |

## 📄 Pagine del sito

| Pagina             | File              | Descrizione                                    |
| ------------------ | ----------------- | ---------------------------------------------- |
| Home               | `index.html`      | Landing page con hero, eventi in evidenza, contatti |
| Eventi             | `eventi.html`     | Catalogo completo con tutti gli eventi         |
| Carrello           | `cart.html`       | Gestione carrello con quantità e riepilogo     |
| Checkout           | `checkout.html`   | Finalizzazione ordine con form di pagamento    |
| Chi Siamo          | `aboutus.html`    | Storia, missione e statistiche aziendali       |
| Contattaci         | `contactus.html`  | Form di contatto e informazioni                |
| Dove Siamo         | `dovesiamo.html`  | Localizzazione e indicazioni                   |
