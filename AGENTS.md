# AGENTS.md

## Uppdrag

Bygg en Node.js-backend för en decentraliserad logistikliggare för Fair Trade-kaffe.
Applikationen ska använda Express, Vitest och Node.js `crypto` för SHA-256-baserad Proof of Work.
Arbeta strikt testdrivet: skriv ett misslyckat test, implementera minsta möjliga kod, kör testet grönt och committa varje tydligt steg.

Deadline: **23 augusti 2026**
Betygsskala: **IG/G/VG**

## Mål som ska visas

- API-utveckling med Node.js.
- Proof-of-work-baserade system.
- En backendserver i Node.js med Express-API och TDD.

## Arbetsregler

1. Kontrollera alltid aktuell status med `git status` innan ändringar.
2. Skriv tester före produktionskod för hashning, mining och API-beteende.
3. Kör relevanta tester efter varje ändring.
4. Håll commits små och beskrivande.
5. Lägg aldrig `node_modules` eller hemligheter i Git.
6. Uppdatera `README.md` när ett krav eller ett verifierat arbetsflöde är färdigt.
7. Avsluta inte ett steg förrän dess kontrollpunkt är godkänd.

## Steg-för-steg-plan

### 1. Skapa projektet

- [ ] Öppna terminalen i repoets rot.
- [ ] Kör `npm init -y`.
- [ ] Installera produktionsberoende med `npm install express`.
- [ ] Installera utvecklingsberoenden med `npm install --save-dev vitest supertest nodemon`.
- [ ] Lägg till npm-scripten `test`, `test:watch`, `start` och `dev`.
- [ ] Använd ES modules konsekvent, eller välj CommonJS och håll dig till det överallt.
- [ ] Skapa `.gitignore` med minst `node_modules/`, `.env` och test-/buildutdata.
- [ ] Skapa en minimal `README.md` med syfte, installation och hur tester körs.
- [ ] Kontrollpunkt: `npm install` fungerar och `npm test` kan köras utan konfigurationsfel.
- [ ] Commit: `chore: initialize node project`.

### 2. Bestäm filstruktur

Använd en enkel struktur som håller domänlogik och HTTP-lager separerade:

```text
src/
  app.js
  server.js
  blockchain/
    blockchain.js
    blockchain.test.js
  middleware/
    validateTransaction.js
  routes/
    blockchain.routes.js
    transaction.routes.js
    mine.routes.js
README.md
package.json
.gitignore
```

- [ ] Exportera Express-appen från `src/app.js` så Supertest kan importera den utan att starta en port.
- [ ] Starta `app.listen(...)` endast från `src/server.js`.
- [ ] Kontrollpunkt: import av appen startar inga långlivade serverprocesser.
- [ ] Commit: `chore: create application structure`.

### 3. Skriv hash-testet först

Skriv tester i `src/blockchain/blockchain.test.js` innan hashlogiken finns.

- [ ] Testa att samma blockinnehåll alltid ger samma SHA-256-hash.
- [ ] Testa att en ändring av exempelvis `nonce` ändrar hashen.
- [ ] Testa att resultatet är en hexadecimal SHA-256-sträng med 64 tecken.
- [ ] Kör `npm test` och kontrollera att testet först är rött på grund av saknad implementation.
- [ ] Commit: `test: specify block hash behavior`.
- [ ] Implementera hashning med Node.js inbyggda `crypto`-modul och `createHash('sha256')`.
- [ ] Kör samma test igen och kontrollera att det blir grönt.
- [ ] Commit: `feat: implement block hashing`.

### 4. Skriv mining-testet först

- [ ] Testa att mining använder en ökande `nonce` i en `while`-loop.
- [ ] Testa att den färdiga hashen börjar med exakt den valda mängden nollor.
- [ ] Testa att `difficulty` styr antalet inledande nollor.
- [ ] Sätt testets svårighetsgrad till `1` så testet är snabbt och deterministiskt.
- [ ] Kör testet och verifiera rött resultat innan mining implementeras.
- [ ] Commit: `test: specify proof of work mining`.
- [ ] Implementera mining med `crypto`, nonce och kontrollen `hash.startsWith('0'.repeat(difficulty))`.
- [ ] Kör samma test tills det är grönt.
- [ ] Commit: `feat: implement proof of work mining`.

### 5. Implementera blockkedjan

Block ska innehålla:

- `index`
- `timestamp`
- `transactions`
- `previousHash`
- `nonce`
- `hash`

- [ ] Skapa en `Blockchain`-klass med `chain` och `pendingTransactions`.
- [ ] Skapa genesisblocket i konstruktorn.
- [ ] Kontrollera att genesisblocket har `previousHash` enligt vald konvention, exempelvis `'0'`.
- [ ] Lägg till metoder för att lägga till transaktioner, mine:a ett block och returnera hela kedjan.
- [ ] Testa att ett nytt block länkas med föregående blocks hash.
- [ ] Testa att mining tömmer väntande transaktioner efter att blocket skapats.
- [ ] Testa att en transaktion innehåller `sender`, `recipient`, `batchId` och `weightKg`.
- [ ] Kontrollpunkt: enhetenesterna täcker genesisblock, kedjelänkning, pending-transaktioner, hash och mining.
- [ ] Commit: `feat: implement blockchain ledger`.

### 6. Konfigurera miljöberoende difficulty

- [ ] Läs `process.env.NODE_ENV`.
- [ ] Använd `difficulty = 1` när `NODE_ENV === 'test'`.
- [ ] Använd difficulty `2` eller `3` i produktion, exempelvis via `POW_DIFFICULTY`.
- [ ] Validera och konvertera miljövariabeln till ett positivt heltal.
- [ ] Lägg inte difficulty-logik utspridd i flera moduler.
- [ ] Skriv ett test som bekräftar att testmiljön använder difficulty `1`.
- [ ] Kontrollpunkt: hela testsviten körs utan onödiga timeouts.
- [ ] Commit: `feat: configure environment specific mining difficulty`.

### 7. Skriv integrationstester före API-implementation

Använd Supertest och importera Express-appen utan att lyssna på en port.

- [ ] Testa `GET /blockchain` och förvänta HTTP 200 samt en komplett kedja.
- [ ] Testa `POST /transactions` med en giltig kropp och förvänta HTTP 201 eller 200 enligt dokumenterad design.
- [ ] Kontrollera att den giltiga transaktionen hamnar i `pendingTransactions`.
- [ ] Testa `POST /transactions` utan `batchId` och förvänta HTTP 400.
- [ ] Testa ogiltig eller negativ `weightKg` och förvänta HTTP 400.
- [ ] Testa `POST /mine` och verifiera att ett nytt block returneras.
- [ ] Kontrollera att blocket innehåller transaktionerna och att pending-poolen töms.
- [ ] Kör integrationstesterna och bekräfta rött resultat innan routes skrivs.
- [ ] Commit: `test: specify blockchain api endpoints`.

### 8. Implementera Express-API:t

- [ ] Lägg in JSON-middleware med `express.json()`.
- [ ] Implementera `GET /blockchain`.
- [ ] Implementera `POST /transactions`.
- [ ] Implementera `POST /mine`.
- [ ] Använd ett valideringsmiddleware för POST-endpoints.
- [ ] Avvisa saknade fält med tydliga 400-svar.
- [ ] Kontrollera att `sender`, `recipient` och `batchId` är icke-tomma strängar.
- [ ] Kontrollera att `weightKg` är ett positivt tal.
- [ ] Returnera konsekvent JSON vid både lyckade svar och fel.
- [ ] Kör samma integrationstester tills de blir gröna.
- [ ] Commit: `feat: implement express blockchain api`.

### 9. Lägg till server och felhantering

- [ ] Skapa `src/server.js` som startar servern på `process.env.PORT || 3000`.
- [ ] Lägg till en 404-hanterare för okända routes.
- [ ] Lägg till central felhantering utan att exponera onödiga interna detaljer.
- [ ] Testa att servern kan startas med `npm start`.
- [ ] Kontrollpunkt: API:t svarar på alla tre primära endpoints.
- [ ] Commit: `feat: add production server entrypoint`.

### 10. Dokumentera TDD och användning

- [ ] Dokumentera installation: `npm install`.
- [ ] Dokumentera tester: `npm test` och `npm run test:watch`.
- [ ] Dokumentera start: `npm start`.
- [ ] Dokumentera alla endpoints med exempel på request och response.
- [ ] Förklara hur Proof of Work och difficulty fungerar.
- [ ] Lägg in en sektion med minst tre klickbara länkar till red-green-commits.
- [ ] Länka committen där hash-testet skrevs före implementation.
- [ ] Länka committen där mining-testet skrevs före implementation.
- [ ] Länka committen där API-integrationstesterna skrevs före routes.
- [ ] Beskriv testmiljöns difficulty `1` och produktionsmiljöns difficulty `2` eller `3`.
- [ ] Commit: `docs: document api and tdd progression`.

### 11. Kontrollera VG-kraven

- [ ] Kör coverage med `npx vitest run --coverage`.
- [ ] Säkerställ minst 80% code coverage, och kontrollera relevanta filer i rapporten.
- [ ] Kontrollera att middleware validerar POST-input.
- [ ] Kontrollera att environment variables styr PoW-svårighetsgrad.
- [ ] Kontrollera att mining inte orsakar timeout i testmiljö.
- [ ] Kontrollera att README är komplett och begriplig.
- [ ] Rätta eventuella brister och committa dem separat, exempelvis `test: improve coverage`.

### 12. Slutlig teknisk verifiering

- [ ] Kör `npm test` från en ren terminal.
- [ ] Kör `npx vitest run --coverage`.
- [ ] Kör `npm start` och prova alla endpoints manuellt med exempel från README.
- [ ] Kontrollera att en giltig transaktion kan följas från gård till rosteri eller kafé.
- [ ] Kontrollera att en modifierad blockdata inte längre matchar blockets hash.
- [ ] Kontrollera att alla tester passerar efter att testprocessen startats om.
- [ ] Kontrollera `git diff` och `git status`.
- [ ] Kontrollera att inga hemligheter, `node_modules` eller onödiga stora filer finns i committen.

### 13. Publicera på GitHub

- [ ] Skapa ett GitHub-repo med ett tydligt namn.
- [ ] Lägg till remote med `git remote add origin <GITHUB_URL>`.
- [ ] Kontrollera remote med `git remote -v`.
- [ ] Lägg till filer med `git add .`.
- [ ] Commita med `git commit -m "feat: complete coffee blockchain api"`.
- [ ] Pusha med `git push -u origin main`.
- [ ] Öppna repoet på GitHub och kontrollera att den senaste committen, README och testfilerna syns.
- [ ] Kontrollera att commit-historiken visar test-före-kod för minst tre delar.
- [ ] Gör repoet publikt, eller bjud in GitHub-användaren `postmodernistx` som collaborator.
- [ ] Kontrollpunkt: det som syns lokalt är samma version som finns på GitHub.

### 14. Lämna in på itslearning

- [ ] Kopiera GitHub-länken.
- [ ] Klistra in länken i itslearnings inlämningsbox.
- [ ] Skapa en zip av projektet.
- [ ] Exkludera `node_modules` från zippen.
- [ ] Kontrollera att zippen innehåller `package.json`, källkod, tester, `README.md` och `.gitignore`.
- [ ] Ladda upp zippen på itslearning.
- [ ] Öppna den uppladdade zippen och kontrollera att den går att packa upp.
- [ ] Kontrollera att deadline **23 augusti 2026** är uppfylld.

## Definition of done

Arbetet är klart först när alla följande påståenden är sanna:

- `npm test` passerar.
- Coverage är minst 80% för VG-målet.
- `GET /blockchain`, `POST /transactions` och `POST /mine` fungerar.
- Ogiltig POST-input avvisas av middleware med HTTP 400.
- PoW använder Node.js `crypto` och rätt difficulty.
- Testmiljön använder difficulty `1`; produktion använder `2` eller `3`.
- README innehåller endpoint-dokumentation och länkar till minst tre red-green-commits.
- GitHub-repoet är publikt eller `postmodernistx` är collaborator.
- Samma kod finns på datorn och på GitHub.
- GitHub-länk och zip utan `node_modules` är uppladdade på itslearning.
