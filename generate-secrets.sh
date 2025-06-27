#!/bin/bash

# Function to generate a random string
generate_random_string() {
    openssl rand -base64 32
}

# Generate required secrets
JWT_SECRET=$(generate_random_string)
POSTGRES_PASSWORD=$(generate_random_string)
ANON_KEY=$(generate_random_string)
SERVICE_ROLE_KEY=$(generate_random_string)

# Create .env file
cat > .env << EOL
# PostgreSQL
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_USER=postgres
POSTGRES_DB=postgres
POSTGRES_PORT=5432

# JWT Configuration
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRY=3600

# Supabase API Configuration
ANON_KEY=${ANON_KEY}
SERVICE_ROLE_KEY=${SERVICE_ROLE_KEY}

# Site URLs
SITE_URL=http://localhost:3000
API_EXTERNAL_URL=http://localhost:8000

# Auth Configuration
ENABLE_EMAIL_SIGNUP=false
ENABLE_EMAIL_AUTOCONFIRM=true
ENABLE_PHONE_SIGNUP=false
ENABLE_PHONE_AUTOCONFIRM=false
ENABLE_ANONYMOUS_USERS=false
DISABLE_SIGNUP=false

# Storage Settings
STORAGE_BACKEND=file
FILE_SIZE_LIMIT=52428800

# Studio Configuration
STUDIO_DEFAULT_ORGANIZATION=Default
STUDIO_DEFAULT_PROJECT="RSS Feed Generator"
EOL

echo "Environment file created with secure random values."
echo "You can find the configuration in .env"