# Connecter Supabase

## 1. Configurer les variables locales

Copier `.env.example` vers `.env.local`, puis renseigner l'URL du projet et la clé
publique **anon** depuis `Project Settings > API` dans Supabase.

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<publishable-or-anon-key>
```

La clé `service_role` ne doit jamais être utilisée dans le navigateur ni ajoutée
au dépôt.

## 2. Créer la table et le stockage

Exécuter [`supabase/schema.sql`](./supabase/schema.sql) dans le SQL Editor du
projet Supabase. Ce script crée la table `publications`, le bucket public des
miniatures et les politiques RLS.

## 3. Créer l'administrateur

Dans `Authentication > Users`, créer un utilisateur avec email et mot de passe.
Puis ajouter `{"role":"admin"}` dans son `app_metadata` depuis la page de
l'utilisateur (ou via un outil serveur Supabase). `app_metadata` est utilisé
intentionnellement car il ne peut pas être modifié par l'utilisateur depuis le
client.

Après redémarrage de Vite, le bouton **Espace administrateur** permet de se
connecter et de publier un article avec une miniature optionnelle.
