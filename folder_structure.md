media-rss-saas/
├── README.md
├── .gitignore
├── package.json
├── docker-compose.yml
├── .env.example
├── goose-instructions.md
│
├── backend/
│   ├── package.json
│   ├── .env
│   ├── server.js
│   ├── app.js
│   │
│   ├── config/
│   │   ├── database.js
│   │   ├── supabase.js
│   │   ├── storage.js
│   │   └── ai-services.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── rateLimiting.js
│   │   ├── fileUpload.js
│   │   └── errorHandler.js
│   │
│   ├── routes/
│   │   ├── index.js
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── media.js
│   │   ├── rss.js
│   │   ├── ai.js
│   │   ├── googledrive.js
│   │   ├── approval.js
│   │   ├── webhooks.js
│   │   └── api/
│   │       ├── v1/
│   │       │   ├── index.js
│   │       │   ├── media.js
│   │       │   ├── sync.js
│   │       │   └── feeds.js
│   │       └── external.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── mediaController.js
│   │   ├── rssController.js
│   │   ├── aiController.js
│   │   ├── googleDriveController.js
│   │   ├── approvalController.js
│   │   └── webhookController.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── mediaService.js
│   │   ├── rssService.js
│   │   ├── aiService.js
│   │   ├── googleDriveService.js
│   │   ├── approvalService.js
│   │   ├── storageService.js
│   │   ├── schedulerService.js
│   │   └── notificationService.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── MediaItem.js
│   │   ├── RSSFeed.js
│   │   ├── ApprovalQueue.js
│   │   ├── ApiKey.js
│   │   └── SyncLog.js
│   │
│   ├── utils/
│   │   ├── logger.js
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   ├── fileProcessor.js
│   │   ├── rssGenerator.js
│   │   └── encryption.js
│   │
│   ├── jobs/
│   │   ├── scheduler.js
│   │   ├── googleDriveSync.js
│   │   ├── rssUpdate.js
│   │   └── cleanup.js
│   │
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 001_create_users.sql
│   │   │   ├── 002_create_media_items.sql
│   │   │   ├── 003_create_rss_feeds.sql
│   │   │   ├── 004_create_approval_queue.sql
│   │   │   ├── 005_create_api_keys.sql
│   │   │   └── 006_create_sync_logs.sql
│   │   │
│   │   ├── seeds/
│   │   │   ├── users.sql
│   │   │   └── default_settings.sql
│   │   │
│   │   └── policies/
│   │       ├── rls_users.sql
│   │       ├── rls_media_items.sql
│   │       └── rls_rss_feeds.sql
│   │
│   └── tests/
│       ├── unit/
│       │   ├── services/
│       │   ├── controllers/
│       │   └── utils/
│       ├── integration/
│       │   ├── auth.test.js
│       │   ├── media.test.js
│       │   └── api.test.js
│       └── fixtures/
│           ├── users.json
│           └── media.json
│
├── frontend/
│   ├── package.json
│   ├── angular.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   │
│   ├── src/
│   │   ├── main.ts
│   │   ├── index.html
│   │   ├── styles.css
│   │   │
│   │   ├── app/
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   ├── app.component.scss
│   │   │   ├── app.module.ts
│   │   │   ├── app-routing.module.ts
│   │   │   │
│   │   │   ├── core/
│   │   │   │   ├── guards/
│   │   │   │   │   ├── auth.guard.ts
│   │   │   │   │   └── premium.guard.ts
│   │   │   │   ├── interceptors/
│   │   │   │   │   ├── auth.interceptor.ts
│   │   │   │   │   └── error.interceptor.ts
│   │   │   │   ├── services/
│   │   │   │   │   ├── auth.service.ts
│   │   │   │   │   ├── api.service.ts
│   │   │   │   │   ├── supabase.service.ts
│   │   │   │   │   └── storage.service.ts
│   │   │   │   └── models/
│   │   │   │       ├── user.model.ts
│   │   │   │       ├── media.model.ts
│   │   │   │       ├── rss-feed.model.ts
│   │   │   │       └── approval.model.ts
│   │   │   │
│   │   │   ├── shared/
│   │   │   │   ├── components/
│   │   │   │   │   ├── header/
│   │   │   │   │   ├── sidebar/
│   │   │   │   │   ├── loader/
│   │   │   │   │   ├── modal/
│   │   │   │   │   ├── file-upload/
│   │   │   │   │   ├── media-grid/
│   │   │   │   │   └── confirmation-dialog/
│   │   │   │   ├── pipes/
│   │   │   │   │   ├── file-size.pipe.ts
│   │   │   │   │   └── time-ago.pipe.ts
│   │   │   │   ├── directives/
│   │   │   │   │   └── drag-drop.directive.ts
│   │   │   │   └── utils/
│   │   │   │       ├── validators.ts
│   │   │   │       └── helpers.ts
│   │   │   │
│   │   │   ├── features/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── auth.module.ts
│   │   │   │   │   ├── login/
│   │   │   │   │   │   ├── login.component.ts
│   │   │   │   │   │   ├── login.component.html
│   │   │   │   │   │   └── login.component.scss
│   │   │   │   │   ├── register/
│   │   │   │   │   └── callback/
│   │   │   │   │
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── dashboard.module.ts
│   │   │   │   │   ├── dashboard.component.ts
│   │   │   │   │   ├── dashboard.component.html
│   │   │   │   │   ├── dashboard.component.scss
│   │   │   │   │   └── services/
│   │   │   │   │       └── dashboard.service.ts
│   │   │   │   │
│   │   │   │   ├── media/
│   │   │   │   │   ├── media.module.ts
│   │   │   │   │   ├── media-list/
│   │   │   │   │   ├── media-upload/
│   │   │   │   │   ├── media-detail/
│   │   │   │   │   ├── media-approval/
│   │   │   │   │   └── services/
│   │   │   │   │       └── media.service.ts
│   │   │   │   │
│   │   │   │   ├── rss-feeds/
│   │   │   │   │   ├── rss-feeds.module.ts
│   │   │   │   │   ├── feed-list/
│   │   │   │   │   ├── feed-create/
│   │   │   │   │   ├── feed-manage/
│   │   │   │   │   └── services/
│   │   │   │   │       └── rss.service.ts
│   │   │   │   │
│   │   │   │   ├── ai-generation/
│   │   │   │   │   ├── ai.module.ts
│   │   │   │   │   ├── image-generation/
│   │   │   │   │   ├── caption-generation/
│   │   │   │   │   ├── ai-settings/
│   │   │   │   │   └── services/
│   │   │   │   │       └── ai.service.ts
│   │   │   │   │
│   │   │   │   ├── integrations/
│   │   │   │   │   ├── integrations.module.ts
│   │   │   │   │   ├── google-drive/
│   │   │   │   │   ├── api-keys/
│   │   │   │   │   ├── webhooks/
│   │   │   │   │   └── services/
│   │   │   │   │       └── integrations.service.ts
│   │   │   │   │
│   │   │   │   ├── profile/
│   │   │   │   │   ├── profile.module.ts
│   │   │   │   │   ├── profile-view/
│   │   │   │   │   ├── profile-edit/
│   │   │   │   │   ├── subscription/
│   │   │   │   │   └── services/
│   │   │   │   │       └── profile.service.ts
│   │   │   │   │
│   │   │   │   └── approval/
│   │   │   │       ├── approval.module.ts
│   │   │   │       ├── approval-queue/
│   │   │   │       ├── approval-review/
│   │   │   │       ├── batch-approval/
│   │   │   │       └── services/
│   │   │   │           └── approval.service.ts
│   │   │   │
│   │   │   └── layouts/
│   │   │       ├── main-layout/
│   │   │       ├── auth-layout/
│   │   │       └── minimal-layout/
│   │   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   ├── fonts/
│   │   │   └── styles/
│   │   │       ├── components/
│   │   │       ├── utilities/
│   │   │       └── themes/
│   │   │
│   │   └── environments/
│   │       ├── environment.ts
│   │       ├── environment.prod.ts
│   │       └── environment.staging.ts
│   │
│   └── e2e/
│       ├── src/
│       └── protractor.conf.js
│
├── shared/
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── media.types.ts
│   │   ├── rss.types.ts
│   │   └── api.types.ts
│   ├── constants/
│   │   ├── api-endpoints.ts
│   │   ├── file-types.ts
│   │   └── user-tiers.ts
│   └── utils/
│       ├── validation.ts
│       └── formatting.ts
│
├── docs/
│   ├── api/
│   │   ├── endpoints.md
│   │   ├── authentication.md
│   │   └── webhooks.md
│   ├── deployment/
│   │   ├── docker.md
│   │   ├── production.md
│   │   └── environment-setup.md
│   ├── development/
│   │   ├── getting-started.md
│   │   ├── coding-standards.md
│   │   └── testing.md
│   └── user-guide/
│       ├── integration-guide.md
│       ├── api-usage.md
│       └── troubleshooting.md
│
├── scripts/
│   ├── setup.sh
│   ├── deploy.sh
│   ├── backup.sh
│   ├── migrate.js
│   └── seed.js
│
├── infrastructure/
│   ├── docker/
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.frontend
│   │   └── nginx.conf
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── monitoring/
│       ├── prometheus.yml
│       └── grafana-dashboard.json
│
└── .github/
    ├── workflows/
    │   ├── ci.yml
    │   ├── cd.yml
    │   └── test.yml
    ├── ISSUE_TEMPLATE/
    └── PULL_REQUEST_TEMPLATE.md