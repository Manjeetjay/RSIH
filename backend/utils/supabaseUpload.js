import { supabase } from '../config/supabase.js';

/**
 * Upload a file to Supabase Storage
 * @param {Buffer} fileBuffer - The file buffer from multer
 * @param {string} fileName - Original filename
 * @param {string} bucketName - Supabase bucket name ('spoc-documents' or 'team-presentations')
 * @returns {Promise<string>} - Public URL of the uploaded file
 */
export const uploadToSupabase = async (fileBuffer, fileName, bucketName) => {
    try {
        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileExtension = fileName.split('.').pop();
        const uniqueFileName = `${timestamp}-${randomString}.${fileExtension}`;

        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(uniqueFileName, fileBuffer, {
                contentType: getContentType(fileExtension),
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);
            throw new Error(`Failed to upload file: ${error.message}`);
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(uniqueFileName);

        return publicUrlData.publicUrl;
    } catch (error) {
        console.error('Upload to Supabase failed:', error);
        throw error;
    }
};

/**
 * Get content type based on file extension
 * @param {string} extension - File extension
 * @returns {string} - MIME type
 */
const getContentType = (extension) => {
    const contentTypes = {
        'pdf': 'application/pdf',
        'ppt': 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    return contentTypes[extension.toLowerCase()] || 'application/octet-stream';
};

/**
 * Ensure bucket exists, create if it doesn't
 * @param {string} bucketName - Name of the bucket
 */
export const ensureBucketExists = async (bucketName) => {
    try {
        const { data: buckets, error } = await supabase.storage.listBuckets();

        if (error) {
            console.error('Error listing buckets:', error);
            return;
        }

        const bucketExists = buckets.some(bucket => bucket.name === bucketName);

        if (!bucketExists) {
            const { error: createError } = await supabase.storage.createBucket(bucketName, {
                public: true,
                fileSizeLimit: 52428800 // 50MB
            });

            if (createError) {
                console.error(`Error creating bucket ${bucketName}:`, createError);
            } else {
                console.log(`✅ Created bucket: ${bucketName}`);
            }
        }
    } catch (error) {
        console.error('Error ensuring bucket exists:', error);
    }
};
