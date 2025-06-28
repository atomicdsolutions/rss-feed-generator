const { supabaseAdmin, STORAGE_BUCKETS } = require('../config/supabase');

async function initializeSupabase() {
  try {
    console.log('Starting Supabase initialization...');

    // Create storage buckets if they don't exist
    for (const [key, bucketName] of Object.entries(STORAGE_BUCKETS)) {
      console.log(`Creating storage bucket: ${bucketName}`);
      const { data: existingBucket, error: getBucketError } = await supabaseAdmin
        .storage
        .getBucket(bucketName);

      if (!existingBucket && !getBucketError) {
        const { data, error } = await supabaseAdmin
          .storage
          .createBucket(bucketName, {
            public: false,
            fileSizeLimit: 104857600, // 100MB
            allowedMimeTypes: ['image/*', 'video/*']
          });

        if (error) {
          throw new Error(`Error creating bucket ${bucketName}: ${error.message}`);
        }
        console.log(`Created bucket: ${bucketName}`);
      } else {
        console.log(`Bucket ${bucketName} already exists`);
      }
    }

    // Set up storage bucket policies
    for (const bucketName of Object.values(STORAGE_BUCKETS)) {
      const { data, error } = await supabaseAdmin
        .storage
        .from(bucketName)
        .createSignedUrl('dummy.txt', 5); // Test signed URL generation

      if (error && error.message.includes('dummy.txt')) {
        console.log(`Bucket ${bucketName} is properly configured`);
      } else if (error) {
        throw new Error(`Error testing bucket ${bucketName}: ${error.message}`);
      }
    }

    console.log('Supabase initialization completed successfully');
  } catch (error) {
    console.error('Error initializing Supabase:', error);
    throw error;
  }
}

// Run initialization if called directly
if (require.main === module) {
  initializeSupabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Initialization failed:', error);
      process.exit(1);
    });
}

module.exports = { initializeSupabase };