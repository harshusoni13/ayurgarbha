/* =====================================================================
 * AyurGarbha — db-service.js
 * Local-only Data Store (localStorage) — DPDP Act 2023 aligned.
 * ===================================================================== */
(function (global) {
  "use strict";

  const NS = "ayurgarbha:v1:";
  const K = {
    selfProfile: NS + "selfProfile",
    consent: NS + "consent",
    actsAck: NS + "actsAck",
    waPhone: NS + "waPhone"
  };

  const getStorage = () => {
    try {
      if (global && global.localStorage) return global.localStorage;
      if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
      if (typeof localStorage !== "undefined") return localStorage;
    } catch (e) {
      /* ignore */
    }
    return null;
  };

  const read = (k, d) => {
    try {
      const s = getStorage();
      if (!s) return d;
      const v = s.getItem(k);
      return v ? JSON.parse(v) : d;
    } catch (e) {
      return d;
    }
  };

  const write = (k, v) => {
    try {
      const s = getStorage();
      if (s) s.setItem(k, JSON.stringify(v));
    } catch (e) {
      console.warn("Storage write error:", e);
    }
  };

  const listeners = new Set();
  const emit = () =>
    listeners.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        /* ignore */
      }
    });

  global.addEventListener("storage", (e) => {
    if (e.key && e.key.indexOf(NS) === 0) emit();
  });

  const DB = {
    mode: "localStorage",

    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },

    /* ---------- DPDP Act 2023: Consent & Data Privacy ---------- */
    hasConsent() {
      return Boolean(read(K.consent, false));
    },

    setConsent(val) {
      write(K.consent, Boolean(val));
      emit();
    },

    hasActsAck() {
      return Boolean(read(K.actsAck, false));
    },

    setActsAck(val) {
      write(K.actsAck, Boolean(val));
      emit();
    },

    deleteMyData() {
      try {
        const s = getStorage();
        if (s) {
          const keys = [];
          for (let i = 0; i < s.length; i++) {
            const k = s.key(i);
            if (k && k.indexOf(NS) === 0) keys.push(k);
          }
          keys.forEach((k) => s.removeItem(k));
        }
      } catch (e) {
        console.warn("Delete data notice:", e);
      }
      emit();
    },

    /* ---------- Self Profile (Stays on Device) ---------- */
    getSelfProfile() {
      return read(K.selfProfile, null);
    },

    saveSelfProfile(p) {
      return this.setSelfProfile(p);
    },

    setSelfProfile(p) {
      write(K.selfProfile, p);
      emit();
    },

    getWaPhone() {
      return read(K.waPhone, "");
    },

    setWaPhone(phone) {
      write(K.waPhone, String(phone || "").replace(/\D/g, "").slice(0, 10));
      emit();
    },

    getWaterCount(dateStr) {
      const key = NS + "water:" + (dateStr || new Date().toISOString().slice(0, 10));
      return Math.max(0, Number(read(key, 0)) || 0);
    },

    setWaterCount(dateStr, count) {
      const key = NS + "water:" + (dateStr || new Date().toISOString().slice(0, 10));
      write(key, Math.max(0, Math.min(20, Number(count) || 0)));
      emit();
    },

    async resetAll() {
      this.deleteMyData();
    },

    /* ---------- Verified Samhita Records Loader (Tier A & text_verified only) ---------- */
    _records: [],
    _recordsLoaded: false,
    setRecords(list) {
      this._records = Array.isArray(list) ? list : [];
      this._recordsLoaded = true;
    },
    async loadRecords() {
      if (this._recordsLoaded && this._records.length) return this._records;
      const urls = ["data/records.json", "../data/records.json"];
      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            this.setRecords(data);
            emit();
            return this._records;
          }
        } catch (e) {
          /* try next */
        }
      }
      return this._records;
    },
    getVerifiedRecords(tag, month) {
      return this._records.filter((r) => {
        if (!r || r.text_verified !== true || r.tier !== "A") return false;
        if (tag && (!Array.isArray(r.section_tag) || !r.section_tag.includes(tag))) return false;
        if (month != null && r.month != null && Number(r.month) !== Number(month)) return false;
        return true;
      });
    },

    /* ---------- Institutional Suprajaa Diet Table Loader ---------- */
    _suprajaa: [],
    _suprajaaLoaded: false,
    setSuprajaaRecords(list) {
      this._suprajaa = Array.isArray(list) ? list : [];
      this._suprajaaLoaded = true;
    },
    async loadSuprajaaRecords() {
      if (this._suprajaaLoaded && this._suprajaa.length) return this._suprajaa;
      const urls = ["data/records_suprajaa.json", "../data/records_suprajaa.json"];
      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            this.setSuprajaaRecords(data);
            emit();
            return this._suprajaa;
          }
        } catch (e) {
          /* try next */
        }
      }
      return this._suprajaa;
    },
    getSuprajaaByMonth(month) {
      return this._suprajaa.filter(
        (r) =>
          r &&
          r.source_type === "institutional" &&
          r.text_verified === true &&
          r.permission_obtained === true &&
          Number(r.month) === Number(month)
      );
    },

    /* ---------- Concerns ("तुरंत समाधान") Loader ---------- */
    _concerns: { sources: [], items: [] },
    _concernsLoaded: false,
    setConcerns(data) {
      if (data && Array.isArray(data.items)) {
        this._concerns = { sources: data.sources || [], items: data.items };
      }
      this._concernsLoaded = true;
    },
    async loadConcerns() {
      if (this._concernsLoaded && this._concerns.items.length) return this._concerns;
      const urls = ["data/concerns.json", "../data/concerns.json"];
      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            this.setConcerns(data);
            emit();
            return this._concerns;
          }
        } catch (e) {
          /* try next */
        }
      }
      return this._concerns;
    },
    getConcerns() {
      return this._concerns.items || [];
    },
    getConcernSources() {
      return this._concerns.sources || [];
    }
  };

  global.DB = DB;
})(window);
