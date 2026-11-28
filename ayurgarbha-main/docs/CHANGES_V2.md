# AyurGarbha — V2 Changes (`docs/CHANGES_V2.md`)

1. **Collapsible Sanskrit Shloka:** By default, the Sanskrit shloka text on every card is hidden. A toggle button (**"श्लोक देखें" / "View Shloka"**) opens it and toggles to **"श्लोक छिपाएँ" / "Hide Shloka"** to close it again.
2. **Primary Language + Collapsible Commentary:** Main card text renders in the active language (default Hindi: `hindi_summary`; English: `english_summary`). Below it, a collapsible section shows **"English commentary"** (when Hindi is active) or **"हिंदी टिप्पणी"** (when English is active).
3. **Full HI/EN Interface Toggle:** Switching HI/EN translates the entire interface (excluding the Sanskrit shloka itself) into the selected language.
4. **Tier A `english_summary`:** Every Tier A record in `data/records.json` (and `frontend/data/records.json`) includes a simple, shloka-faithful `english_summary` without dosages.
5. **Clean Ask UI (P2 Ready):** The Ask Settings / endpoint URL panel is removed from the Ask screen.
