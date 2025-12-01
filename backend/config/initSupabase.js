import { ensureBucketExists } from '../utils/supabaseUpload.js';

// Initialize Supabase buckets on server start
const initializeSupabaseBuckets = async () => {
    console.log('🔧 Initializing Supabase storage buckets...');
    await ensureBucketExists('spoc-documents');
    await ensureBucketExists('team-presentations');
    console.log('✅ Supabase buckets initialized');
};

// Call this function when server starts
initializeSupabaseBuckets().catch(console.error);

export { initializeSupabaseBuckets };
