import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.hostinger.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: parseInt(process.env.SMTP_PORT || "465") === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || "johnmedicalcente@johnmedicalcenter.com";

// Setup upload directory safely
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (e) {
  console.warn("Notice: could not create uploads folder in cwd, using fallback", e);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // sanitize file name
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, uniqueSuffix + '-' + safeName)
  }
})
const upload = multer({ storage: storage })

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(UPLOADS_DIR));

// Simple file-based database for demonstration
const DB_FILE = path.join(process.cwd(), 'database.json');

// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ contacts: [], internships: [], gallery: [] }, null, 2));
}

function getDatabase() {
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  const parsed = JSON.parse(data);
  if (!parsed.gallery) parsed.gallery = [];
  if (!parsed.contacts) parsed.contacts = [];
  if (!parsed.internships) parsed.internships = [];
  return parsed;
}

function saveDatabase(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

async function startServer() {
  
  // --- API Routes ---

  // Gallery Routes
  app.get("/api/gallery", (req, res) => {
    try {
      const db = getDatabase();
      res.json({ success: true, images: db.gallery || [] });
    } catch (error) {
      console.error("Error fetching gallery:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  });

  app.post("/api/gallery/upload", upload.array('images', 25), (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ success: false, error: "No files uploaded" });
      }

      const db = getDatabase();
      const newItems = files.map((file, idx) => {
        const cleanName = file.originalname.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        return {
          id: `server-${Date.now()}-${idx}-${Math.round(Math.random() * 1000)}`,
          src: `/uploads/${file.filename}`,
          alt: cleanName || 'Photo Galerie JMC',
          title: cleanName ? cleanName.charAt(0).toUpperCase() + cleanName.slice(1) : `Photo Galerie JMC`,
          description: 'Image ajoutée à la galerie du John Medical Center.',
          isCustom: true,
          date: new Date().toISOString()
        };
      });

      db.gallery.unshift(...newItems);
      saveDatabase(db);

      res.json({ success: true, newImages: newItems, gallery: db.gallery });
    } catch (error) {
      console.error("Error uploading gallery images:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  });

  app.delete("/api/gallery/:id", (req, res) => {
    try {
      const { id } = req.params;
      const db = getDatabase();
      const target = db.gallery.find((item: any) => item.id === id);
      
      if (target && target.src && target.src.startsWith('/uploads/')) {
        const filename = path.basename(target.src);
        const filePath = path.join(UPLOADS_DIR, filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      db.gallery = db.gallery.filter((item: any) => item.id !== id);
      saveDatabase(db);

      res.json({ success: true, gallery: db.gallery });
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  });

  // 1. Submit Contact Form
  app.post("/api/contact", async (req, res) => {
    try {
      const { nom, telephone, email, sujet, message } = req.body;
      const db = getDatabase();
      const newContact = {
        id: Date.now().toString(),
        nom, telephone, email, sujet, message,
        date: new Date().toISOString()
      };
      db.contacts.push(newContact);
      saveDatabase(db);

      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"Site Web JMC" <${process.env.SMTP_USER}>`,
          to: RECEIVER_EMAIL,
          subject: `Nouveau Message (Contact): ${sujet}`,
          html: `
            <h2>Nouveau message depuis le site web (Formulaire de contact)</h2>
            <p><strong>Nom:</strong> ${nom}</p>
            <p><strong>Téléphone:</strong> ${telephone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Sujet:</strong> ${sujet}</p>
            <hr>
            <h3>Message:</h3>
            <p>${(message || '').replace(/\n/g, '<br>')}</p>
          `
        });
      }

      res.json({ success: true, message: "Contact saved successfully" });
    } catch (error) {
      console.error("Error submitting contact:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  });

  // 2. Submit Internship Form
  app.post("/api/internship", upload.single('fichiers_joints'), async (req, res) => {
    try {
      const formData = req.body;
      const file = req.file;
      const db = getDatabase();
      const newInternship = {
        id: Date.now().toString(),
        ...formData,
        fichiers_joints: file ? `/uploads/${file.filename}` : null,
        original_filename: file ? file.originalname : null,
        date: new Date().toISOString()
      };
      db.internships.push(newInternship);
      saveDatabase(db);

      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const mailOptions: any = {
          from: `"Site Web JMC" <${process.env.SMTP_USER}>`,
          to: RECEIVER_EMAIL,
          subject: `Nouvelle Demande de Stage: ${formData.nom} ${formData.prenom}`,
          html: `
            <h2>Nouvelle Demande de Stage depuis le site web</h2>
            <p><strong>Nom:</strong> ${formData.nom}</p>
            <p><strong>Prénom:</strong> ${formData.prenom}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Téléphone:</strong> ${formData.telephone}</p>
            <p><strong>Sexe:</strong> ${formData.sexe}</p>
            <p><strong>Université/Institution:</strong> ${formData.universite}</p>
            <p><strong>Niveau d'études:</strong> ${formData.niveau}</p>
            <p><strong>Domaine/Service souhaité:</strong> ${formData.domaine}</p>
            <p><strong>Date de début souhaitée:</strong> ${formData.date_debut}</p>
            <p><strong>Durée du stage:</strong> ${formData.duree}</p>
            <hr>
            <h3>Lettre de motivation:</h3>
            <p>${(formData.motivation || '').replace(/\n/g, '<br>')}</p>
          `
        };

        if (file) {
          mailOptions.attachments = [
            {
              filename: file.originalname,
              path: file.path
            }
          ];
        }

        await transporter.sendMail(mailOptions);
      }

      res.json({ success: true, message: "Internship application saved successfully" });
    } catch (error) {
      console.error("Error submitting internship:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  });

  // 3. Get all data for Admin Dashboard
  app.get("/api/admin/data", (req, res) => {
    try {
      const rawCode = (req.query.code || req.headers.authorization || '').toString();
      const cleanCode = rawCode.replace(/^Bearer\s+/i, '').trim().toLowerCase();

      if (!cleanCode || cleanCode !== 'jmc1960') {
        return res.status(401).json({ success: false, error: "Code d'accès administrateur incorrect." });
      }

      const db = getDatabase();
      res.json({ success: true, data: db });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  });

  // --- Vite Middleware for Development or Static Files for Production ---
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
