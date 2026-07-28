import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, ShieldCheck, Upload, Image as ImageIcon, Plus, Trash2, Lock, KeyRound, CheckCircle2 } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getDb } from '../lib/firebase';

export interface GalleryItem {
  id: string | number;
  src: string;
  alt: string;
  title: string;
  description: string;
  isCustom?: boolean;
  isUploading?: boolean;
  progress?: number;
}

const defaultImages: GalleryItem[] = Array.from({ length: 23 }, (_, i) => {
  const num = i + 1;
  return {
    id: `gallerie-${num}`,
    src: `/gallerie_${num}.jpg`,
    alt: `John Medical Center - Galerie Photo ${num}`,
    title: `Infrastructures & Équipements JMC - Photo ${num}`,
    description: `Découvrez nos installations médicales modernes au John Medical Center et Maternité.`
  };
});

const getImageSources = (img: GalleryItem): string[] => {
  if (img.src.startsWith('/gallerie_')) {
    const match = img.src.match(/\/gallerie_(\d+)\.jpg/);
    if (match) {
      const num = match[1];
      return [
        `/gallerie_${num}.jpg`,
        `/gallerie_${num}.jpeg`,
        `/gallérie.jpg  (${num}).jpeg`,
        img.src,
        // Fallback Unsplash medical images if local files are corrupted
        `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80`,
        `https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80`,
        `https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80`
      ];
    }
  }
  if (img.src.startsWith('/')) {
    return [img.src, "/jmc_facade.jpg", "/jmc_façade.jpg.jpeg"];
  }
  return [img.src];
};

const compressImageFile = (file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.8): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve((e.target?.result as string) || '');
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        resolve((e.target?.result as string) || '');
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      resolve('');
    };
    reader.readAsDataURL(file);
  });
};

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [customImages, setCustomImages] = useState<GalleryItem[]>([]);
  const [removedDefaultIds, setRemovedDefaultIds] = useState<(string | number)[]>(() => {
    try {
      const saved = localStorage.getItem('jmc_removed_default_images');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [uploadPreset, setUploadPreset] = useState<string>(() => localStorage.getItem('cloudinary_upload_preset') || 'ml_default');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const SESSION_DURATION_SEC = 300; // 5 minutes session timeout

  const lockAdminSession = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('jmc_admin_unlocked');
    sessionStorage.removeItem('jmc_admin_unlock_expiry');
    setTimeLeft(0);
  };

  const activateAdminSession = (durationSeconds = SESSION_DURATION_SEC) => {
    const expiry = Date.now() + durationSeconds * 1000;
    setIsUnlocked(true);
    sessionStorage.setItem('jmc_admin_unlocked', 'true');
    sessionStorage.setItem('jmc_admin_unlock_expiry', expiry.toString());
    setTimeLeft(durationSeconds);
  };

  // Check if hash is #admin or unlocked previously with expiry check
  useEffect(() => {
    const storedUnlocked = sessionStorage.getItem('jmc_admin_unlocked') === 'true';
    const storedExpiry = sessionStorage.getItem('jmc_admin_unlock_expiry');

    if (storedUnlocked) {
      if (storedExpiry) {
        const remainingMs = parseInt(storedExpiry, 10) - Date.now();
        if (remainingMs > 0) {
          setIsUnlocked(true);
          setTimeLeft(Math.ceil(remainingMs / 1000));
        } else {
          lockAdminSession();
        }
      } else {
        activateAdminSession(SESSION_DURATION_SEC);
      }
    } else if (window.location.hash === '#admin') {
      activateAdminSession(SESSION_DURATION_SEC);
    }
  }, []);

  // Timer interval for auto-locking session when time expires
  useEffect(() => {
    if (!isUnlocked) return;

    const timer = setInterval(() => {
      const storedExpiry = sessionStorage.getItem('jmc_admin_unlock_expiry');
      if (!storedExpiry) {
        lockAdminSession();
        return;
      }

      const remainingMs = parseInt(storedExpiry, 10) - Date.now();
      if (remainingMs <= 0) {
        lockAdminSession();
      } else {
        setTimeLeft(Math.ceil(remainingMs / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isUnlocked]);

  // Real-time Firestore synchronization for custom images and removed defaults
  useEffect(() => {
    let unsubscribeCustom: (() => void) | undefined;
    let unsubscribeRemoved: (() => void) | undefined;

    try {
      const db = getDb();

      // Listen to custom images real-time collection
      const customCol = collection(db, 'gallery_custom_images');
      unsubscribeCustom = onSnapshot(customCol, (snapshot) => {
        const firestoreItems: GalleryItem[] = snapshot.docs.map(d => {
          const data = d.data();
          const rawTitle = data.title || '';
          const isNum = !rawTitle || /^\d+$/.test(rawTitle) || /^img[-_\d]+/i.test(rawTitle) || /^pxl[-_\d]+/i.test(rawTitle);
          const cleanTitle = isNum ? 'Photo Galerie JMC' : rawTitle;

          return {
            id: d.id,
            src: data.src,
            alt: data.alt || cleanTitle,
            title: cleanTitle,
            description: data.description || 'Photo Galerie JMC',
            isCustom: true
          };
        });

        setCustomImages(firestoreItems);
        try {
          localStorage.setItem('jmc_custom_gallery', JSON.stringify(firestoreItems));
        } catch (e) {
          console.error(e);
        }
      }, (err) => {
        console.warn("Firestore listener custom images:", err);
        try {
          const saved = localStorage.getItem('jmc_custom_gallery');
          if (saved) setCustomImages(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      });

      // Listen to removed default images real-time collection
      const removedCol = collection(db, 'gallery_removed_defaults');
      unsubscribeRemoved = onSnapshot(removedCol, (snapshot) => {
        const removedIds = snapshot.docs.map(d => d.id);
        setRemovedDefaultIds(removedIds);
        try {
          localStorage.setItem('jmc_removed_default_images', JSON.stringify(removedIds));
        } catch (e) {
          console.error(e);
        }
      }, (err) => {
        console.warn("Firestore listener removed defaults:", err);
      });
    } catch (err) {
      console.warn("Firestore non initialisé, fallback local:", err);
      try {
        const saved = localStorage.getItem('jmc_custom_gallery');
        if (saved) setCustomImages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      if (unsubscribeCustom) unsubscribeCustom();
      if (unsubscribeRemoved) unsubscribeRemoved();
    };
  }, []);

  const saveCustomImages = (newList: GalleryItem[]) => {
    setCustomImages(newList);
    try {
      localStorage.setItem('jmc_custom_gallery', JSON.stringify(newList));
    } catch (e) {
      console.error("Erreur de sauvegarde des images locales", e);
    }
  };

  const handleUploadClick = () => {
    if (isUnlocked) {
      fileInputRef.current?.click();
    } else {
      setPinError('');
      setPinInput('');
      setShowPinModal(true);
    }
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim().toLowerCase() === 'jmc1960') {
      activateAdminSession(SESSION_DURATION_SEC);
      setShowPinModal(false);
      setPinError('');
      
      fileInputRef.current?.click();
    } else {
      setPinError('Code PIN incorrect. Veuillez réessayer.');
    }
  };

  const handleToggleAdminMode = () => {
    if (isUnlocked) {
      lockAdminSession();
    } else {
      setPinError('');
      setPinInput('');
      setShowPinModal(true);
    }
  };

  const handleMultipleFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files) as File[];

    // Clean initial names
    const placeholders: GalleryItem[] = fileArray.map((file, index) => {
      const rawName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").trim();
      const isNum = !rawName || /^\d+$/.test(rawName) || /^img[-_\d]+/i.test(rawName) || /^pxl[-_\d]+/i.test(rawName);
      const displayTitle = isNum ? 'Photo Galerie JMC' : (rawName.charAt(0).toUpperCase() + rawName.slice(1));

      return {
        id: `temp-${Date.now()}-${index}-${Math.random()}`,
        src: URL.createObjectURL(file),
        alt: displayTitle,
        title: displayTitle,
        description: 'Optimisation et sauvegarde...',
        isCustom: true,
        isUploading: true,
        progress: 10
      };
    });

    setCustomImages(prev => [...placeholders, ...prev]);

    // Progress animation
    let currentProgress = 10;
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      if (currentProgress > 85) currentProgress = 85;
      setCustomImages(prev => prev.map(img => 
        img.isUploading ? { ...img, progress: currentProgress } : img
      ));
    }, 200);

    const cloudName = 'wo6uahrp';
    const presetsToTry = Array.from(new Set([uploadPreset, 'ml_default', 'jmc_gallery', 'unsigned', 'preset_jmc'].filter(Boolean)));
    const savedPreset = localStorage.getItem('cloudinary_upload_preset');
    if (savedPreset && !presetsToTry.includes(savedPreset)) presetsToTry.unshift(savedPreset);

    const uploadedItems: GalleryItem[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      let uploadedUrl: string | null = null;

      // Try Cloudinary direct unsigned upload first
      for (const preset of presetsToTry) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', preset);

          const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
          });

          if (res.ok) {
            const data = await res.json();
            if (data.secure_url) {
              uploadedUrl = data.secure_url;
              localStorage.setItem('cloudinary_upload_preset', preset);
              break;
            }
          }
        } catch (err) {
          console.warn(`Tentative Cloudinary avec preset ${preset} échouée:`, err);
        }
      }

      // If Cloudinary wasn't configured, compress to Base64 (1200px JPEG)
      if (!uploadedUrl) {
        try {
          uploadedUrl = await compressImageFile(file, 1200, 1200, 0.8);
        } catch (err) {
          console.error("Erreur de compression d'image:", err);
        }
      }

      const rawName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").trim();
      const isNum = !rawName || /^\d+$/.test(rawName) || /^img[-_\d]+/i.test(rawName) || /^pxl[-_\d]+/i.test(rawName);
      const displayTitle = isNum ? 'Photo Galerie JMC' : (rawName.charAt(0).toUpperCase() + rawName.slice(1));

      const finalSrc = uploadedUrl || placeholders[i].src;

      const newId = `cloud-${Date.now()}-${i}-${Math.round(Math.random() * 1000)}`;
      const newItem: GalleryItem = {
        id: newId,
        src: finalSrc,
        alt: displayTitle,
        title: displayTitle,
        description: uploadedUrl && uploadedUrl.startsWith('http') ? 'Photo sauvegardée sur Cloud' : 'Photo sauvegardée en haute qualité',
        isCustom: true
      };

      uploadedItems.push(newItem);

      // Save to Firestore so it syncs immediately to all devices
      try {
        const db = getDb();
        await setDoc(doc(db, 'gallery_custom_images', newId), {
          src: newItem.src,
          alt: newItem.alt,
          title: newItem.title,
          description: newItem.description,
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        console.error("Erreur de sauvegarde Firestore photo:", err);
      }
    }

    clearInterval(progressInterval);

    // Filter out placeholders
    setCustomImages(prev => {
      const withoutPlaceholders = prev.filter(img => !img.isUploading);
      const updated = [...uploadedItems, ...withoutPlaceholders];
      saveCustomImages(updated);
      return updated;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = async (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isUnlocked) {
      setShowPinModal(true);
      return;
    }

    const idStr = id.toString();
    const isCustom = customImages.some(img => img.id === id);

    if (isCustom) {
      // Delete from Firestore real-time database
      try {
        const db = getDb();
        await deleteDoc(doc(db, 'gallery_custom_images', idStr));
      } catch (err) {
        console.error("Erreur de suppression Firestore custom image:", err);
      }
      const updated = customImages.filter(img => img.id !== id);
      saveCustomImages(updated);
    } else {
      // Add default image ID to Firestore gallery_removed_defaults so it hides across all devices
      try {
        const db = getDb();
        await setDoc(doc(db, 'gallery_removed_defaults', idStr), {
          imageId: idStr,
          removedAt: new Date().toISOString()
        });
      } catch (err) {
        console.error("Erreur de suppression Firestore default image:", err);
      }
      const newRemoved = [...removedDefaultIds, id];
      setRemovedDefaultIds(newRemoved);
      try {
        localStorage.setItem('jmc_removed_default_images', JSON.stringify(newRemoved));
      } catch (err) {
        console.error("Erreur de sauvegarde des images supprimées", err);
      }
    }

    if (selectedImage && selectedImage.id === id) {
      setSelectedImage(null);
    }
  };

  const filteredDefaultImages = defaultImages.filter(img => !removedDefaultIds.includes(img.id));
  const allImages = [...customImages, ...filteredDefaultImages];

  return (
    <section id="galerie" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-[#0b3b60]"
          >
            Notre Galerie Visuelle
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium"
          >
            Plongez au cœur du John Medical Center à travers une immersion visuelle raffinée. Nous sommes animés par une passion inébranlable et un engagement quotidien d’excellence pour vous offrir un environnement médical d’exception, où modernité architecturale et sérénité se rencontrent pour le confort absolu de chaque patient.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-600 leading-relaxed"
          >
            Chaque détail présent dans notre centre reflète notre vocation : allier la rigueur technologique des équipements de pointe à l’humanité bienveillante de notre accueil. Laissez-vous guider par ces images qui témoignent de notre univers dédié à la santé, à l’espoir et à la renaissance de votre bien-être.
          </motion.p>

          {/* Single Upload button protected by secret PIN modal with session timer */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-4 flex flex-col items-center justify-center gap-3"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleMultipleFilesUpload} 
              multiple 
              accept="image/*" 
              className="hidden" 
              id="gallery-file-upload"
            />
            
            {isUnlocked ? (
              <label
                htmlFor="gallery-file-upload"
                className="inline-flex items-center gap-2 bg-medical-green hover:bg-medical-green-dark text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all hover:shadow-lg active:scale-95 text-sm cursor-pointer m-0"
              >
                <Upload className="w-4 h-4" />
                <span>Ajouter des photos</span>
              </label>
            ) : (
              <button
                onClick={handleUploadClick}
                className="inline-flex items-center gap-2 bg-medical-green hover:bg-medical-green-dark text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all hover:shadow-lg active:scale-95 text-sm"
              >
                <Upload className="w-4 h-4" />
                <span>Ajouter des photos</span>
              </button>
            )}

            {isUnlocked && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl shadow-xs w-full max-w-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>
                    Session Admin active ({Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')})
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md border border-emerald-300">
                  <span className="text-[10px] text-slate-500 font-medium">Preset Cloudinary:</span>
                  <input
                    type="text"
                    value={uploadPreset}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      setUploadPreset(val);
                      localStorage.setItem('cloudinary_upload_preset', val);
                    }}
                    placeholder="ex: ml_default"
                    className="w-28 text-xs font-mono font-bold text-emerald-950 focus:outline-none bg-transparent"
                    title="Nom du preset d'envoi Cloudinary (Unsigned Upload Preset)"
                  />
                </div>

                <button
                  onClick={lockAdminSession}
                  className="text-xs text-red-600 hover:text-red-800 font-bold underline flex items-center gap-1 transition-colors"
                  title="Verrouiller la session immédiatement"
                >
                  <Lock className="w-3.5 h-3.5 text-red-500" />
                  <span>Verrouiller</span>
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {allImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group rounded-2xl overflow-hidden shadow-sm transition-all aspect-video select-none bg-slate-200 ${img.isUploading ? 'opacity-80' : 'hover:shadow-xl cursor-pointer'}`}
              onClick={() => { if (!img.isUploading) setSelectedImage(img); }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <SmartImage 
                sources={getImageSources(img)} 
                alt={img.alt} 
                className={`w-full h-full object-cover transition-transform duration-700 pointer-events-none ${!img.isUploading && 'group-hover:scale-105'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-dark/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  {img.title}
                </h3>
                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                  {!img.isUploading && (
                    <button
                      onClick={(e) => removeImage(img.id, e)}
                      title="Supprimer la photo"
                      className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all shadow-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  {!img.isUploading && (
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
              
              {img.isUploading && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-200/50 backdrop-blur-sm z-20">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${img.progress || 0}%` }}
                    transition={{ ease: "linear", duration: 0.2 }}
                    className="h-full bg-medical-blue relative"
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 select-none"
            onClick={() => setSelectedImage(null)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="absolute top-4 right-4 flex items-center gap-3 z-20">
              <button 
                onClick={(e) => removeImage(selectedImage.id, e)}
                className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-colors backdrop-blur-md flex items-center gap-1.5 px-3 text-xs font-semibold"
                title="Supprimer cette photo"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Supprimer</span>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                aria-label="Fermer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <SmartImage 
                  sources={getImageSources(selectedImage)} 
                  alt={selectedImage.alt}
                  className="max-h-[75vh] w-auto object-contain pointer-events-none"
                />
              </div>
              
              <div className="mt-6 flex flex-col items-center gap-3 w-full max-w-lg text-center">
                <h3 className="text-white font-bold text-2xl">{selectedImage.title}</h3>
                <p className="text-white/70 text-sm md:text-base">{selectedImage.description}</p>
                
                <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-xs font-medium border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-medical-green" />
                  <span>Consultation en ligne protégée • John Medical Center</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        {/* Admin PIN Protection Modal */}
        {showPinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowPinModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative overflow-hidden text-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPinModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Accès Administrateur</h3>
                  <p className="text-xs text-slate-500">Gestion sécurisée de la galerie JMC</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Veuillez entrer le code administrateur pour déverrouiller l’ajout et la suppression de photos.
              </p>

              <form onSubmit={handleVerifyPin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Code PIN d'accès
                  </label>
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="••••••••"
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-medical-green focus:border-medical-green outline-none text-slate-900 text-center font-mono text-xl tracking-widest transition-all"
                  />
                  {pinError && (
                    <p className="text-xs text-red-600 font-medium mt-2 flex items-center justify-center gap-1">
                      <span>•</span> {pinError}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPinModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-sm transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-full bg-medical-green hover:bg-medical-green-dark text-white font-semibold text-sm transition-colors shadow-sm"
                  >
                    Valider
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

