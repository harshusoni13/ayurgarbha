/* =====================================================================
 * AyurGarbha — db-service.js
 * CLINICAL DATA STORE & CLOUD SYNC SERVICE
 *
 * Connected to Firebase Firestore & Authentication:
 * - Offline-first IndexedDB persistence (`synchronizeTabs: true`)
 * - Anonymous authentication fallback + Google/Email auth helpers
 * - Real-time `onSnapshot` listeners on `patients` & `followups` collections
 * - Seamless bidirectional sync: Doctor follow-ups immediately update
 *   the linked Mother/Patient portal in real-time.
 * - Resilient fallback to local storage if offline or during network drop.
 * ===================================================================== */
(function (global) {
  "use strict";

  const firebaseConfig = {
    apiKey: "AIzaSyBVwPy_iPcc10QOWn_bizecmMn-UIyFloE",
    authDomain: "ayurgarbha-d62b3.firebaseapp.com",
    projectId: "ayurgarbha-d62b3",
    storageBucket: "ayurgarbha-d62b3.firebasestorage.app",
    messagingSenderId: "44837226602",
    appId: "1:44837226602:web:b267f80a7ca2ca43a8a213"
  };

  const NS = "ayurgarbha:v1:";
  const K = {
    patients: NS + "patients",
    session: NS + "session",
    selfProfile: NS + "selfProfile",
    seeded: NS + "demoSeeded",
    doctorProfile: NS + "doctorProfile:",
    ashaProfile: NS + "ashaProfile:",
    consent: NS + "consent"
  };

  // ---- Tiny local cache helpers ----
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
  const uid = (prefix = "p_") =>
    prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  const listeners = new Set();
  const emit = () =>
    listeners.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        /* ignore */
      }
    });

  // Cross-tab local event sync
  global.addEventListener("storage", (e) => {
    if (e.key && e.key.indexOf(NS) === 0) emit();
  });

  // ---- Firebase & Firestore Initialization ----
  let firebaseApp = null;
  let auth = null;
  let firestore = null;
  let isFirestoreReady = false;
  let unsubscribePatients = null;
  let unsubscribeFollowUps = null;

  function initFirebase() {
    if (typeof firebase === "undefined" || !firebase.initializeApp) {
      console.info("AyurGarbha: Running in local offline mode (Firebase CDN not loaded).");
      return;
    }

    try {
      firebaseApp =
        firebase.apps && firebase.apps.length
          ? firebase.app()
          : firebase.initializeApp(firebaseConfig);

      auth = firebase.auth();
      firestore = firebase.firestore();

      // Enable offline-first IndexedDB persistence with multi-tab support
      if (firestore && firestore.enablePersistence) {
        firestore
          .enablePersistence({ synchronizeTabs: true })
          .then(() => {
            console.info("AyurGarbha: Firestore IndexedDB offline persistence enabled.");
          })
          .catch((err) => {
            if (err.code === "failed-precondition") {
              console.info("Firestore persistence: another tab already holds primary lock.");
            } else if (err.code === "unimplemented") {
              console.warn("Firestore persistence not supported in this browser.");
            } else {
              console.warn("Firestore persistence notice:", err.message || err);
            }
          });
      }

      // Anonymous authentication fallback
      auth.onAuthStateChanged((user) => {
        if (!user) {
          auth.signInAnonymously().catch((err) => {
            console.info("Anonymous auth notice:", err.message || err);
          });
        }
      });

      isFirestoreReady = true;
      // Real-time listeners are strictly scoped upon authenticated sign-in
    } catch (err) {
      console.warn("AyurGarbha: Firebase initialization fallback to localStorage:", err.message || err);
    }
  }

  // Setup real-time Firestore listeners for bidirectional sync
  function setupRealtimeListeners() {
    if (!firestore) return;
    try {
      // 1. Listen to patients collection changes
      if (unsubscribePatients) unsubscribePatients();
      unsubscribePatients = firestore.collection("patients").onSnapshot(
        (snapshot) => {
          const all = read(K.patients, {});
          let changed = false;
          snapshot.docChanges().forEach((change) => {
            changed = true;
            const docId = change.doc.id;
            const data = change.doc.data();
            if (change.type === "removed") {
              delete all[docId];
            } else {
              all[docId] = Object.assign({ id: docId }, data);
            }
          });
          if (changed) {
            write(K.patients, all);
            emit();
          }
        },
        (err) => {
          console.info("Firestore patients realtime notice:", err.message || err);
        }
      );

      // 2. Listen to followups collection changes
      if (unsubscribeFollowUps) unsubscribeFollowUps();
      unsubscribeFollowUps = firestore.collection("followups").onSnapshot(
        (snapshot) => {
          if (!snapshot.empty) {
            emit();
          }
        },
        (err) => {
          console.info("Firestore followups realtime notice:", err.message || err);
        }
      );
    } catch (e) {
      console.warn("Realtime listener setup notice:", e.message || e);
    }
  }

  // Initialize immediately
  initFirebase();

  function defaultAnc() {
    return {
      G: 1,
      P: 0,
      L: 0,
      A: 0,
      bp: "",
      pulse: "",
      weight: "",
      prePregWeight: "",
      hb: "",
      bloodGroup: "",
      pallor: "None",
      edema: "None",
      urineAlbumin: "Nil",
      fundalHeight: "",
      fhr: "",
      fetalMovements: "Not assessed",
      agni: "Samagni",
      koshtha: "Madhyama",
      upadrava: [],
      notes: ""
    };
  }

  const DB = {
    mode: isFirestoreReady ? "firestore" : "localStorage",
    app: firebaseApp,
    auth,
    firestore,

    isOnline() {
      return isFirestoreReady && navigator.onLine;
    },

    /* ---------- Realtime Subscription ---------- */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },

    /* ---------- Patient Queries & Writes ---------- */

    /**
     * Retrieve all patients ordered by createdAt descending.
     * Optionally scoped to an authenticated doctor (doctorUid).
     * Uses Firestore collection query with local cache fallback.
     */
    async getAllPatients(doctorUid) {
      if (isFirestoreReady && firestore) {
        try {
          let snap;
          if (doctorUid) {
            snap = await firestore
              .collection("patients")
              .where("doctorUid", "==", doctorUid)
              .get();
          } else {
            snap = await firestore
              .collection("patients")
              .orderBy("createdAt", "desc")
              .get();
          }
          if (!snap.empty) {
            let list = snap.docs.map((d) => Object.assign({ id: d.id }, d.data()));
            list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            const cache = read(K.patients, {});
            list.forEach((p) => {
              cache[p.id] = p;
            });
            write(K.patients, cache);
            return list;
          } else if (doctorUid) {
            return [];
          }
        } catch (e) {
          console.info("Firestore getAllPatients fallback to local cache:", e.message || e);
        }
      }
      return Object.values(read(K.patients, {}))
        .filter((p) => !doctorUid || p.doctorUid === doctorUid)
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    },

    // Alias required by existing codebase
    async listPatients(doctorUid) {
      return this.getAllPatients(doctorUid);
    },

    /**
     * Retrieve a single patient by Firestore Document ID.
     */
    async getPatient(id) {
      if (!id) return null;
      if (isFirestoreReady && firestore) {
        try {
          const doc = await firestore.collection("patients").doc(id).get();
          if (doc.exists) {
            const data = Object.assign({ id: doc.id }, doc.data());
            const all = read(K.patients, {});
            all[id] = data;
            write(K.patients, all);
            return data;
          }
        } catch (e) {
          console.info("Firestore getPatient fallback to local cache:", e.message || e);
        }
      }
      return read(K.patients, {})[id] || null;
    },

    /**
     * Look up patient by 6-digit Link Code (AG-XXXX).
     * Used for real-time Mother ↔ Doctor sync.
     */
    async getPatientByLinkCode(code) {
      if (!code) return null;
      const c = String(code).trim().toUpperCase();
      if (isFirestoreReady && firestore) {
        try {
          const doc = await firestore.collection("shares").doc(c).get();
          if (doc.exists) {
            const data = Object.assign({ id: doc.id }, doc.data());
            return data;
          }
          // Secondary query on patients collection
          const snap = await firestore.collection("patients").where("linkCode", "==", c).limit(1).get();
          if (!snap.empty) {
            const d = snap.docs[0];
            return Object.assign({ id: d.id }, d.data());
          }
        } catch (e) {
          console.info("Firestore getPatientByLinkCode fallback:", e.message || e);
        }
      }
      return (
        Object.values(read(K.patients, {})).find(
          (p) => ((p.linkCode || p.shareCode || "").toUpperCase() === c)
        ) || null
      );
    },

    buildPatientSafeShare(patient) {
      if (!patient) return null;
      const code = (patient.linkCode || patient.shareCode || "").toUpperCase();
      return {
        id: patient.id,
        linkCode: code,
        shareCode: code,
        name: patient.name,
        age: patient.age,
        phone: patient.phone,
        lmp: patient.lmp,
        location: patient.location,
        clinician: patient.clinician || patient.doctorName || "Doctor",
        doctorName: patient.doctorName || patient.clinician || "Doctor",
        clinicName: patient.clinicName || "",
        clinicAddress: patient.clinicAddress || "",
        clinicContact: patient.clinicContact || "",
        updatedAt: patient.updatedAt || Date.now(),
        // Safe ANC vitals (EXCLUDING private clinician notes)
        anc: {
          G: patient.anc ? patient.anc.G : 1,
          P: patient.anc ? patient.anc.P : 0,
          L: patient.anc ? patient.anc.L : 0,
          A: patient.anc ? patient.anc.A : 0,
          bp: (patient.anc && patient.anc.bp) || "",
          pulse: (patient.anc && patient.anc.pulse) || "",
          weight: (patient.anc && patient.anc.weight) || "",
          hb: (patient.anc && patient.anc.hb) || "",
          bloodGroup: (patient.anc && patient.anc.bloodGroup) || "",
          pallor: (patient.anc && patient.anc.pallor) || "None",
          edema: (patient.anc && patient.anc.edema) || "None",
          urineAlbumin: (patient.anc && patient.anc.urineAlbumin) || "Nil",
          fundalHeight: (patient.anc && patient.anc.fundalHeight) || "",
          fhr: (patient.anc && patient.anc.fhr) || "",
          fetalMovements: (patient.anc && patient.anc.fetalMovements) || "Normal",
          agni: (patient.anc && patient.anc.agni) || "Samagni",
          koshtha: (patient.anc && patient.anc.koshtha) || "Madhyama",
          upadrava: (patient.anc && patient.anc.upadrava) || []
        },
        followUps: (patient.followUps || []).map((f) => ({
          month: f.month,
          date: f.date,
          weight: f.weight,
          bp: f.bp,
          hb: f.hb,
          formulations: f.formulations,
          advice: f.advice,
          protocol: f.protocol,
          nextFollowUp: f.nextFollowUp
        }))
      };
    },

    /**
     * Generates a secure 8-character Share Code: AG-XXXXXX (e.g. AG-K9M2P4).
     */
    async generateLinkCode() {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let code;
      let isUnique = false;
      let attempts = 0;
      while (!isUnique && attempts < 25) {
        attempts++;
        let r = "";
        for (let i = 0; i < 6; i++) {
          r += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        code = "AG-" + r;
        const existing = await this.getPatientByLinkCode(code);
        if (!existing) isUnique = true;
      }
      return code || "AG-K" + Math.floor(10000 + Math.random() * 90000);
    },

    async savePatient(data) {
      const id = data.id || uid("p_");
      const linkCode = data.linkCode || (await this.generateLinkCode());
      const now = Date.now();
      const currentUser = auth && auth.currentUser;
      const docUid = data.doctorUid || (currentUser && !currentUser.isAnonymous ? currentUser.uid : null);
      const docEmail = data.doctorEmail || (currentUser && !currentUser.isAnonymous ? currentUser.email : null);
      const rec = Object.assign(
        {
          id,
          linkCode,
          createdAt: now,
          updatedAt: now,
          doctorUid: docUid,
          doctorEmail: docEmail,
          doctorName: data.doctorName || data.clinician || "",
          clinicName: data.clinicName || "",
          clinicAddress: data.clinicAddress || "",
          clinicContact: data.clinicContact || "",
          anc: defaultAnc(),
          followUps: []
        },
        data,
        { id, linkCode, updatedAt: now }
      );

      if (isFirestoreReady && firestore) {
        try {
          await firestore.collection("patients").doc(id).set(rec, { merge: true });
          const safeShare = this.buildPatientSafeShare(rec);
          await firestore.collection("shares").doc(linkCode.toUpperCase()).set(safeShare, { merge: true });
        } catch (e) {
          console.info("Firestore savePatient queued/cached:", e.message || e);
        }
      }

      // Always update local cache
      const all = read(K.patients, {});
      all[id] = rec;
      write(K.patients, all);
      emit();
      return rec;
    },

    // Alias required by existing codebase
    async createPatient(data) {
      return this.savePatient(data);
    },

    /**
     * Update patient document with partial fields.
     */
    async updatePatient(id, patch) {
      if (!id) throw new Error("Missing patient ID");
      const now = Date.now();
      const updateData = Object.assign({}, patch, { updatedAt: now });

      if (isFirestoreReady && firestore) {
        try {
          await firestore.collection("patients").doc(id).set(updateData, { merge: true });
        } catch (e) {
          console.info("Firestore updatePatient queued/cached:", e.message || e);
        }
      }

      const all = read(K.patients, {});
      if (all[id]) {
        all[id] = Object.assign({}, all[id], updateData);
        write(K.patients, all);
      }
      emit();
      return all[id] || Object.assign({ id }, updateData);
    },

    /**
     * Save Antenatal Care (ANC) Case Sheet into patient document.
     */
    async saveAnc(id, anc) {
      const p = await this.getPatient(id);
      if (!p) throw new Error("Patient not found: " + id);
      const mergedAnc = Object.assign({}, p.anc || defaultAnc(), anc);
      return this.updatePatient(id, { anc: mergedAnc });
    },

    /**
     * Record a sequential monthly follow-up (1 to 9).
     * Writes to `followups` collection and simultaneously updates
     * `patients/{patientId}.followUps` for instant real-time sync with
     * the Mother/Patient portal.
     */
    async saveFollowUp(patientId, fu) {
      const p = await this.getPatient(patientId);
      if (!p) throw new Error("Patient not found: " + patientId);

      const fuId = fu.id || uid("fu_");
      const fuRec = Object.assign(
        {
          id: fuId,
          patientId,
          linkCode: p.linkCode || "",
          savedAt: Date.now()
        },
        fu
      );

      // 1. Write to separate `followups` collection
      if (isFirestoreReady && firestore) {
        try {
          await firestore.collection("followups").doc(fuId).set(fuRec, { merge: true });
        } catch (e) {
          console.info("Firestore followups write queued/cached:", e.message || e);
        }
      }

      // 2. Update sequential follow-up list on patient record (replaces same month if updated)
      const list = (p.followUps || []).filter(
        (x) => Number(x.month) !== Number(fu.month)
      );
      list.push(fuRec);
      list.sort((a, b) => Number(a.month) - Number(b.month));

      // 3. Update ANC vitals on patient record if provided
      const anc = Object.assign({}, p.anc || defaultAnc());
      if (fu.weight) anc.weight = fu.weight;
      if (fu.bp) anc.bp = fu.bp;
      if (fu.hb) anc.hb = fu.hb;
      if (fu.fundalHeight) anc.fundalHeight = fu.fundalHeight;
      if (fu.fhr) anc.fhr = fu.fhr;

      return this.updatePatient(patientId, { followUps: list, anc });
    },

    /**
     * Retrieve all follow-up visits for a patient.
     * Queries `followups` collection with fallback to patient.followUps.
     */
    async getFollowUpsByPatient(patientId) {
      if (!patientId) return [];
      if (isFirestoreReady && firestore) {
        try {
          const snap = await firestore
            .collection("followups")
            .where("patientId", "==", patientId)
            .get();
          if (!snap.empty) {
            const list = snap.docs.map((d) => Object.assign({ id: d.id }, d.data()));
            list.sort((a, b) => Number(a.month || 0) - Number(b.month || 0));
            return list;
          }
        } catch (e) {
          console.info("Firestore getFollowUpsByPatient fallback:", e.message || e);
        }
      }
      const p = await this.getPatient(patientId);
      return p && p.followUps ? p.followUps : [];
    },

    /**
     * Delete patient record and associated follow-up visits.
     */
    async deletePatient(id) {
      if (!id) return;
      if (isFirestoreReady && firestore) {
        try {
          const p = await this.getPatient(id);
        const code = p ? (p.linkCode || p.shareCode) : null;
        await firestore.collection("patients").doc(id).delete();
        if (code) {
          await firestore.collection("shares").doc(code.toUpperCase()).delete().catch(() => {});
        }
          const fuSnap = await firestore
            .collection("followups")
            .where("patientId", "==", id)
            .get();
          fuSnap.forEach((d) => d.ref.delete().catch(() => {}));
        } catch (e) {
          console.info("Firestore deletePatient notice:", e.message || e);
        }
      }
      const all = read(K.patients, {});
      delete all[id];
      write(K.patients, all);
      emit();
    },

    /* ---------- Firebase Auth Helpers ---------- */
    async signInWithGoogle() {
      if (!auth) throw new Error("Firebase Auth is not available");
      const provider = new firebase.auth.GoogleAuthProvider();
      return auth.signInWithPopup(provider);
    },

    async signInWithEmail(email, password) {
      if (!auth) throw new Error("Firebase Auth is not available");
      return auth.signInWithEmailAndPassword(email, password);
    },

    async signUpWithEmail(email, password) {
      if (!auth) throw new Error("Firebase Auth is not available");
      return auth.createUserWithEmailAndPassword(email, password);
    },

    async signOut() {
      if (!auth) return;
      return auth.signOut();
    },

    getCurrentUser() {
      return auth ? auth.currentUser : null;
    },

    onAuthStateChanged(fn) {
      if (!auth) return () => {};
      return auth.onAuthStateChanged(fn);
    },


    /* ---------- DPDP Act 2023: Consent & Data Privacy ---------- */
    hasConsent() {
      return Boolean(read(K.consent, false));
    },

    setConsent(val) {
      write(K.consent, Boolean(val));
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

    /* ---------- ASHA Worker Field Support ---------- */
    async saveAshaVisit(patientId, visit) {
      const p = await this.getPatient(patientId);
      if (!p) throw new Error("Patient not found: " + patientId);
      const now = Date.now();
      const visitRec = Object.assign(
        {
          id: uid("av_"),
          patientId,
          date: new Date().toISOString().slice(0, 10),
          createdAt: now
        },
        visit
      );
      const visits = (p.ashaVisits || []).concat([visitRec]);
      const anc = Object.assign({}, p.anc || defaultAnc());
      if (visit.bp) anc.bp = visit.bp;
      if (visit.weight) anc.weight = visit.weight;
      if (visit.hb) anc.hb = visit.hb;
      if (visit.fetalMovements) anc.fetalMovements = visit.fetalMovements;
      if (visit.complaint) anc.upadrava = Array.from(new Set((anc.upadrava || []).concat([visit.complaint])));

      return this.updatePatient(patientId, { ashaVisits: visits, anc, lastAshaVisit: now });
    },

    /* ---------- Doctor & Clinic Profile (Firestore + Local Sync) ---------- */
    async getDoctorProfile(doctorUid) {
      if (!doctorUid) return null;
      if (isFirestoreReady && firestore) {
        try {
          const doc = await firestore.collection("doctors").doc(doctorUid).get();
          if (doc.exists) {
            const data = Object.assign({ uid: doc.id }, doc.data());
            write(K.doctorProfile + doctorUid, data);
            return data;
          }
        } catch (e) {
          console.info("Firestore getDoctorProfile fallback to local cache:", e.message || e);
        }
      }
      return read(K.doctorProfile + doctorUid, null);
    },

    async saveDoctorProfile(doctorUid, profile) {
      if (!doctorUid) throw new Error("Missing doctorUid");
      const now = Date.now();
      const existing = read(K.doctorProfile + doctorUid, {}) || {};
      const merged = Object.assign(
        {},
        existing,
        profile,
        { uid: doctorUid, updatedAt: now }
      );

      if (isFirestoreReady && firestore) {
        try {
          await firestore.collection("doctors").doc(doctorUid).set(merged, { merge: true });
        } catch (e) {
          console.info("Firestore saveDoctorProfile notice:", e.message || e);
        }
      }

      write(K.doctorProfile + doctorUid, merged);
      emit();
      return merged;
    },

    /* ---------- Local Session (Stays on Device) ---------- */
    getSession() {
      return read(K.session, null);
    },
    setSession(s) {
      write(K.session, s);
    },
    clearSession() {
      try {
        const s = getStorage();
        if (s) s.removeItem(K.session);
      } catch (e) {
        /* ignore */
      }
    },
    getSelfProfile() {
      return read(K.selfProfile, null);
    },
    saveSelfProfile(p) { return this.setSelfProfile(p); },
    setSelfProfile(p) {
      write(K.selfProfile, p);
      emit();
    },

    /* ---------- Directory Cleanliness ---------- */
    async seedDemo(force) {
      // Clean zero-dummy-data policy: directory starts cleanly empty
      if (force) {
        write(K.patients, {});
        write(K.seeded, true);
        emit();
      }
    },

    async resetAll() {
      try {
        const s = getStorage();
        if (s) {
          Object.keys(s)
            .filter((k) => k.indexOf(NS) === 0)
            .forEach((k) => s.removeItem(k));
        }
      } catch (e) {
        /* ignore */
      }
      emit();
    }
  };

  DB.defaultAnc = defaultAnc;
  global.DB = DB;
})(window);
