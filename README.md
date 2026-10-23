# Slednecks – treningslogg

Nettapp for å føre og følge opp treningsøkter med hundene frem mot løpet. Ren HTML/JS uten byggesteg, med Supabase som database og innlogging.

## Oppsett

1. **Database:** Supabase → SQL Editor → lim inn [supabase/schema.sql](supabase/schema.sql) → Run.
2. **Nøkler:** Supabase → Project Settings → API. Kopier *Project URL* og *anon public*-nøkkelen inn i [config.js](config.js).
3. **Innlogging:** Supabase → Authentication → URL Configuration. Sett *Site URL* til adressen appen ligger på (f.eks. `https://<brukernavn>.github.io/slednecks/`) og legg den til under *Redirect URLs*. Legg også til `http://127.0.0.1:5173/` for lokal testing.

## Kjøre lokalt

```bash
python3 -m http.server 5173 --bind 127.0.0.1
```

Åpne http://127.0.0.1:5173/.

## Flytte over gamle økter

Under **Hunder → Backup → Importer fil** velger du en backup-fil. Øktene fra Claude-artifacten ligger i `backup/artifact-eksport.json` (holdes utenfor git).

## Publisere på GitHub Pages

Legg mappa i et GitHub-repo, og slå på Settings → Pages → *Deploy from a branch* → `main` / root.
