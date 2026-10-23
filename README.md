# Spåtind – trening for deg og hunden

(Arbeidsnavn. Tidligere «Slednecks». Navnet settes i `index.html` som `window.APP_NAME`.)

Nettapp for å føre og følge opp treningsøkter med hundene frem mot løpet. Ren HTML/JS uten byggesteg, med Supabase som database og innlogging.

## Oppsett

1. **Database:** Supabase → SQL Editor → lim inn [supabase/schema.sql](supabase/schema.sql) → Run.
2. **Nøkler:** Supabase → Project Settings → API. Kopier *Project URL* og *anon public*-nøkkelen inn i [config.js](config.js).
3. **Innlogging:** Supabase → Authentication → URL Configuration. Sett *Site URL* til adressen appen ligger på (https://slednecks.eilinbergum.com/) og legg den til under *Redirect URLs*. Legg også til `http://127.0.0.1:5173/` for lokal testing.

## Kjøre lokalt

```bash
python3 -m http.server 5173 --bind 127.0.0.1
```

Åpne http://127.0.0.1:5173/.

## Flytte over gamle økter

Under **Hunder → Backup → Importer fil** velger du en backup-fil. Øktene fra Claude-artifacten ligger i `backup/artifact-eksport.json` (holdes utenfor git).

## Publisere på GitHub Pages

Legg mappa i et GitHub-repo, og slå på Settings → Pages → *Deploy from a branch* → `main` / root.

## Tilgang

Registrering er stengt (Supabase → Authentication → Sign In / Providers → *Allow new users to sign up* er av). Nye brukere legges til under Authentication → Users → *Add user* → *Send invitation*. Hver bruker har sin egen logg.

Hver bruker setter sitt eget løp (navn, dato, distanse, høydemeter) og sine hunder under **Profil**. Løp kan velges fra kalenderen i [races.js](races.js) (hentet fra liverace.app og sleddog.no – oppdater før hver sesong). Treningsplanen på 11 uker velges etter distanse (sprint < 25 km, langdistanse > 100 km, ellers mellomdistanse; malene ligger i `TEMPLATES` i `app.js`) og skaleres etter løpet. Hver dag i planen kan endres under Plan; endringene lagres i `plan_custom`.

## Grener og regler

[disciplines.js](disciplines.js) har grener, NM/GP-klasser, regler, tips og pulkvektfaktorer fra NHFs konkurranseregler (25.08.2026) og ID- og vaksinasjonsreglement (18.11.2022). Oppdater når NHF endrer reglene.

## Kløvplan

[pack.js](pack.js) er kløvtreningsplanen etter OMTK-modellen (Eilin Bergum, 2025): vekt i prosent av hundens kroppsvekt, ukedistanse og merkene bronse, sølv og gull.

## Vær og belastning

Vær hentes fra MET Norway (api.met.no, CC BY 4.0) for posisjonen til nettleseren. Varmerisikoen bygger på NHFs barmarksgrenser (16/18 °C) og «150-regelen» (°F + luftfuktighet %). Belastning sammenligner siste 7 dager med snittet av de 4 ukene før; toleransen kan settes per hund.

## Testversjon og utgivelser

- Versjonsnummeret står i `index.html` (`window.APP_VERSION` og `?v=` på alle filer). **Øk det ved hver utgivelse**, så telefonene henter de nye filene i stedet for gamle fra hurtigbufferen.
- Tilbakemeldinger fra testbrukere havner i tabellen `tilbakemeldinger` (Supabase → Table Editor).
- Brukere kan slette egen konto under Profil → Konto (funksjonen `delete_my_account`).
- Nye testbrukere: Supabase → Authentication → Users → Add user → Send invitation. Krever egen e-posttjeneste (SMTP), se under.

## E-post (SMTP)

Supabase sender bare til medlemmer av prosjektteamet uten egen SMTP. Oppsett med Resend: lag konto på resend.com, legg til og bekreft domenet (DNS-poster hos domeneleverandøren), og koble til Supabase (Resend → Integrations → Supabase, eller Supabase → Authentication → Emails → SMTP Settings med host `smtp.resend.com`, port 465, bruker `resend`, passord = API-nøkkel).

## Føre og løyper

- Føremeldinger (`foremeldinger`) deles med alle innloggede brukere i 14 dager. Moderering: slett rader i Supabase → Table Editor.
- Skiløyper hentes direkte fra Kartverkets Turrutebase (WFS `wfs.geonorge.no/skwms1/wfs.turogfriluftsruter`, typen `app:Skiløype`, bbox i lat,lon) når man zoomer inn.
- Løypestatus fra Sporet (Skiforeningen/Swix) og Løyper.net/Hundesporet (FMS Nordic) har ikke åpne API-er og krever avtale.

Ikoner: [Lucide](https://lucide.dev) (ISC-lisens), samlet i `icons.js`.
