import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Bold,
  ImagePlus,
  Italic,
  Lightbulb,
  LockKeyhole,
  MessageCircle,
  Newspaper,
  Plus,
  Save,
  Trash2,
  Underline,
  X,
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const demoPublications = [
  {
    id: 'demo-1',
    category: 'Veille technologique',
    title: 'Les évolutions qui transforment le développement web',
    excerpt: 'Observer les nouveaux outils, leurs usages réels et leur impact sur la façon de concevoir des interfaces modernes.',
    content: 'Cette publication sera bientôt remplacée par les articles publiés depuis l’espace administrateur.',
    published_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    category: 'Réflexion personnelle',
    title: 'Pourquoi comprendre les fondamentaux reste essentiel',
    excerpt: 'Les frameworks accélèrent le travail, mais l’algorithmique, les structures de données et la logique construisent la solidité.',
    content: 'Cette publication sera bientôt remplacée par les articles publiés depuis l’espace administrateur.',
    published_at: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    category: 'Problème & solution',
    title: 'Transformer un problème complexe en solution simple',
    excerpt: 'Décomposer un besoin, choisir la bonne architecture et expliquer clairement les décisions qui rendent un projet fiable.',
    content: 'Cette publication sera bientôt remplacée par les articles publiés depuis l’espace administrateur.',
    published_at: new Date().toISOString(),
  },
];

const categoryIcons = {
  'Veille technologique': Newspaper,
  'Réflexion personnelle': Lightbulb,
  'Problème & solution': MessageCircle,
};

const emptyForm = {
  title: '',
  excerpt: '',
  content: '',
  category: 'Veille technologique',
  publishedAt: new Date().toISOString().slice(0, 16),
};

const formatDateTime = (date) => new Intl.DateTimeFormat('fr-FR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}).format(new Date(date));

const sanitizeContent = (content) => {
  const template = document.createElement('template');
  template.innerHTML = content;
  template.content.querySelectorAll('script, style, iframe, object, embed').forEach((node) => node.remove());
  template.content.querySelectorAll('*').forEach((node) => {
    [...node.attributes].forEach((attribute) => {
      if (attribute.name.startsWith('on') || (attribute.name === 'href' && !attribute.value.startsWith('https://'))) {
        node.removeAttribute(attribute.name);
      }
    });
  });
  return template.innerHTML;
};

const formatContent = (content) => content.includes('<')
  ? sanitizeContent(content)
  : content.split(/\n\s*\n/).map((paragraph) => `<p>${paragraph.trim()}</p>`).filter(Boolean).join('');

function RichTextEditor({ value, onChange, onImageUpload }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const runCommand = (command, argument = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, argument);
    onChange(editorRef.current?.innerHTML || '');
  };

  const handleImage = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const url = await onImageUpload(file);
    if (url) runCommand('insertImage', url);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 focus-within:border-[#D4AF37]">
      <div className="flex flex-wrap items-center gap-1 overflow-hidden border-b border-zinc-700 p-2">
        <button type="button" onClick={() => runCommand('bold')} className="rounded-md p-2.5 text-white hover:bg-zinc-700" aria-label="Gras"><Bold size={17} /></button>
        <button type="button" onClick={() => runCommand('italic')} className="rounded-md p-2.5 text-white hover:bg-zinc-700" aria-label="Italique"><Italic size={17} /></button>
        <button type="button" onClick={() => runCommand('underline')} className="rounded-md p-2.5 text-white hover:bg-zinc-700" aria-label="Souligné"><Underline size={17} /></button>
        <button type="button" onClick={() => runCommand('formatBlock', 'h2')} className="rounded-md px-2.5 py-2 text-sm font-bold text-white hover:bg-zinc-700">Titre</button>
        <button type="button" onClick={() => runCommand('insertUnorderedList')} className="rounded-md px-2.5 py-2 text-sm text-white hover:bg-zinc-700">Liste</button>
        <label className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-2 text-sm text-white hover:bg-zinc-700">
          <ImagePlus size={17} /> Image
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      </div>
      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        aria-multiline="true"
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        className="publication-editor min-h-48 px-4 py-3 text-sm leading-7 text-white outline-none empty:before:text-zinc-500 empty:before:content-['Écrivez_votre_publication...']"
      />
    </div>
  );
}

export default function PublicationsSection() {
  const [publications, setPublications] = useState(isSupabaseConfigured ? [] : demoPublications);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [form, setForm] = useState(emptyForm);
  const [thumbnail, setThumbnail] = useState(null);
  const [editingPublication, setEditingPublication] = useState(null);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [isMobile, setIsMobile] = useState(false);
  const isAdmin = session?.user?.app_metadata?.role === 'admin';

  const loadPublications = async () => {
    if (!supabase) return;
    setIsLoading(true);
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });
    if (error) {
      setMessage(`Impossible de charger les publications : ${error.message}`);
    } else {
      setPublications(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!supabase) return undefined;
    loadPublications();
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateViewport = () => setIsMobile(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage('');
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({
      email: login.email.trim(),
      password: login.password,
    });
    setMessage(error ? 'Identifiants incorrects ou compte non configuré.' : 'Connexion réussie.');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdminOpen(false);
  };

  const uploadPublicationImage = async (file) => {
    if (!supabase || !isAdmin) return null;
    const filePath = `content-${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`;
    const { error } = await supabase.storage.from('publication-thumbnails').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      setMessage(`Impossible d'envoyer l'image : ${error.message}`);
      return null;
    }
    return supabase.storage.from('publication-thumbnails').getPublicUrl(filePath).data.publicUrl;
  };

  const startEditing = (publication) => {
    setEditingPublication(publication);
    setForm({
      title: publication.title,
      excerpt: publication.excerpt,
      content: publication.content,
      category: publication.category,
      publishedAt: new Date(publication.published_at).toISOString().slice(0, 16),
    });
    setThumbnail(null);
    window.scrollTo({ top: document.getElementById('publications')?.offsetTop || 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setEditingPublication(null);
    setForm(emptyForm);
    setThumbnail(null);
  };

  const handlePublish = async (event) => {
    event.preventDefault();
    if (!supabase || !isAdmin) return;
    const contentText = new DOMParser().parseFromString(form.content, 'text/html').body.textContent.trim();
    if (!contentText && !form.content.includes('<img')) {
      setMessage('Le contenu de la publication est obligatoire.');
      return;
    }
    setIsSaving(true);
    setMessage('');
    let thumbnailUrl = null;
    let thumbnailPath = null;

    try {
      if (thumbnail) {
        thumbnailPath = `${crypto.randomUUID()}-${thumbnail.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`;
        const { error: uploadError } = await supabase.storage
          .from('publication-thumbnails')
          .upload(thumbnailPath, thumbnail, { cacheControl: '3600', upsert: false });
        if (uploadError) {
          setMessage(`Impossible d'envoyer la miniature : ${uploadError.message}`);
          return;
        }
        thumbnailUrl = supabase.storage.from('publication-thumbnails').getPublicUrl(thumbnailPath).data.publicUrl;
      }

      const payload = {
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        content: sanitizeContent(form.content),
        category: form.category,
        published_at: form.publishedAt ? new Date(form.publishedAt).toISOString() : new Date().toISOString(),
      };
      const request = editingPublication
        ? supabase.from('publications').update(thumbnailUrl ? { ...payload, thumbnail_url: thumbnailUrl } : payload).eq('id', editingPublication.id)
        : supabase.from('publications').insert({ ...payload, thumbnail_url: thumbnailUrl });
      const { error } = await request;

      if (error) {
        if (thumbnailPath) {
          await supabase.storage.from('publication-thumbnails').remove([thumbnailPath]);
        }
        setMessage(`Impossible de publier : ${error.message}`);
        return;
      }

      setMessage(editingPublication ? 'Publication modifiée.' : 'Publication mise en ligne.');
      cancelEditing();
      await loadPublications();
    } catch (error) {
      setMessage(`Une erreur inattendue est survenue : ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (publication) => {
    if (!supabase || !isAdmin || !window.confirm(`Supprimer « ${publication.title} » ?`)) return;
    const { error } = await supabase.from('publications').delete().eq('id', publication.id);
    if (error) {
      setMessage(`Impossible de supprimer : ${error.message}`);
      return;
    }
    if (editingPublication?.id === publication.id) cancelEditing();
    setMessage('Publication supprimée.');
    await loadPublications();
  };

  const featuredPublications = showAll
    ? publications
    : publications.slice(0, isMobile ? 1 : 3);
  const additionalPublications = publications.slice(3);

  const renderPublicationCard = (publication) => {
    const Icon = categoryIcons[publication.category] || BookOpen;
    return (
      <article key={publication.id} className="publication-card overflow-hidden">
        {publication.thumbnail_url && (
          <div className="-mx-5 -mt-5 mb-5 aspect-video overflow-hidden bg-zinc-900">
            <img src={publication.thumbnail_url} alt="" className="h-full w-full object-cover object-center" />
          </div>
        )}
        <span className="publication-icon"><Icon size={20} /></span>
        <span className="publication-meta">{publication.category}</span>
        <h3 className="text-white text-lg font-bold mt-2 mb-3">{publication.title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed font-light">{publication.excerpt}</p>
        <button type="button" onClick={() => setSelectedPublication(publication)} className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:text-white transition-colors w-fit">
          Lire la publication <ArrowRight size={16} />
        </button>
      </article>
    );
  };

  return (
    <section id="publications">
      <div className="flex flex-col items-center text-center md:items-start md:text-left">
        <h2 className="font-serif text-3xl md:text-4xl text-white italic mb-2">
          Publications <span className="text-[#D4AF37] font-sans not-italic font-bold">& Idées</span>
        </h2>
        <div className="h-0.5 w-12 bg-[#D4AF37] mb-4 rounded-full" />
        <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl font-light">
          Les dernières réflexions sur l’actualité technologique, le développement logiciel et les problèmes que j’explore.
        </p>
      </div>

      {!isSupabaseConfigured && (
        <p className="mt-5 text-xs text-[#D4AF37]/80">Mode aperçu : connecte Supabase pour activer les publications réelles.</p>
      )}

      {isLoading ? (
        <p className="mt-8 text-sm text-zinc-400">Chargement des publications...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {featuredPublications.map(renderPublicationCard)}
        </div>
      )}

      {!isMobile && !showAll && additionalPublications.length > 0 && (
        <div className="publication-marquee mt-4" aria-label="Autres publications">
          <div className="publication-marquee-track">
            {additionalPublications.map(renderPublicationCard)}
            {additionalPublications.map((publication) => renderPublicationCard({ ...publication, id: `${publication.id}-duplicate` }))}
          </div>
        </div>
      )}

      {isMobile && publications.length > 1 && (
        <button type="button" onClick={() => setShowAll(!showAll)} className="publication-more-button mt-8 mx-auto flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
          {showAll ? 'Réduire les publications' : 'Voir plus de publications'} <ArrowRight size={16} />
        </button>
      )}

      <button type="button" onClick={() => setIsAdminOpen(!isAdminOpen)} className="mt-8 mx-auto flex items-center gap-2 text-xs text-zinc-600 hover:text-[#D4AF37] transition-colors">
        <LockKeyhole size={14} /> Espace administrateur
      </button>

      {isAdminOpen && (
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-[#121214] p-5 md:p-7">
          {!isSupabaseConfigured ? (
            <p className="text-sm text-zinc-400">Configure les variables Supabase pour ouvrir l’espace administrateur.</p>
          ) : !session ? (
            <form onSubmit={handleLogin} className="mx-auto max-w-md space-y-3">
              <h3 className="text-white font-bold text-lg">Connexion administrateur</h3>
              <input required type="email" placeholder="Email administrateur" value={login.email} onChange={(event) => setLogin({ ...login, email: event.target.value })} className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37]" />
              <input required type="password" placeholder="Mot de passe" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37]" />
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-3 text-sm font-bold text-black hover:bg-[#e3c45b]">Se connecter <LockKeyhole size={16} /></button>
            </form>
          ) : !isAdmin ? (
            <p className="text-sm text-zinc-400">Ce compte n’a pas les droits administrateur.</p>
          ) : (
            <div className="space-y-8">
            <form onSubmit={handlePublish} className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-white font-bold text-lg">{editingPublication ? 'Modifier la publication' : 'Nouvelle publication'}</h3>
                <button type="button" onClick={handleLogout} className="text-xs text-zinc-400 hover:text-white">Se déconnecter</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input required placeholder="Titre" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37]" />
                <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37]"><option>Veille technologique</option><option>Réflexion personnelle</option><option>Problème & solution</option></select>
              </div>
              <input required placeholder="Résumé court" value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37]" />
              <RichTextEditor value={form.content} onChange={(content) => setForm({ ...form, content })} onImageUpload={uploadPublicationImage} />
              <label className="block text-sm text-zinc-400">Date et heure de publication<input required type="datetime-local" value={form.publishedAt} onChange={(event) => setForm({ ...form, publishedAt: event.target.value })} className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37]" /></label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-zinc-700 px-4 py-3 text-sm text-zinc-400 hover:border-[#D4AF37]"><ImagePlus size={18} className="text-[#D4AF37]" /> {thumbnail ? thumbnail.name : 'Ajouter une miniature'}<input type="file" accept="image/*" onChange={(event) => setThumbnail(event.target.files?.[0] || null)} className="hidden" /></label>
              <div className="flex flex-wrap gap-3">
                <button disabled={isSaving} type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 text-sm font-bold text-black disabled:opacity-50">{editingPublication ? <Save size={17} /> : <Plus size={17} />} {isSaving ? 'Enregistrement...' : editingPublication ? 'Enregistrer les modifications' : 'Publier maintenant'}</button>
                {editingPublication && <button type="button" onClick={cancelEditing} className="rounded-lg border border-zinc-700 px-5 py-3 text-sm text-zinc-300">Annuler</button>}
              </div>
            </form>
            <div className="border-t border-zinc-800 pt-6">
              <h3 className="text-white font-bold">Mes publications</h3>
              <div className="mt-4 space-y-3">
                {publications.map((publication) => (
                  <div key={publication.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{publication.title}</p>
                      <p className="text-xs text-zinc-500">{formatDateTime(publication.published_at)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => startEditing(publication)} className="rounded-md border border-[#D4AF37] px-3 py-2 text-xs font-semibold text-[#D4AF37]">Modifier</button>
                      <button type="button" onClick={() => handleDelete(publication)} className="rounded-md border border-red-900 px-3 py-2 text-xs text-red-400" aria-label={`Supprimer ${publication.title}`}><Trash2 size={15} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          )}
          {message && <p className="mt-4 text-sm text-[#D4AF37]">{message}</p>}
        </div>
      )}

      {selectedPublication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true" onClick={() => setSelectedPublication(null)}>
          <article className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-700 bg-[#121214] p-6 md:p-8" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setSelectedPublication(null)} aria-label="Fermer" className="absolute right-4 top-4 text-zinc-400 hover:text-white"><X size={20} /></button>
            {selectedPublication.thumbnail_url && (
              <div className="mb-6 overflow-hidden rounded-xl bg-zinc-900">
                <img src={selectedPublication.thumbnail_url} alt="" className="max-h-[20rem] w-full object-contain object-center" />
              </div>
            )}
            <span className="publication-meta">{selectedPublication.category} · Publié le {formatDateTime(selectedPublication.published_at)}</span>
            <h3 className="mt-3 text-2xl font-bold text-white">{selectedPublication.title}</h3>
            <div className="publication-content mt-6 text-[0.98rem] leading-8 text-zinc-300" dangerouslySetInnerHTML={{ __html: formatContent(selectedPublication.content) }} />
          </article>
        </div>
      )}
    </section>
  );
}
