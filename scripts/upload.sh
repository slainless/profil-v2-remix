#!/usr/bin/env sh
export $(grep -v '^#' ${1:-".env.local"} | xargs -d '\n')
ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_PROJECT_ROOT_PATH/.dist"
scp .dist/standalone.tar.gz $REMOTE_USER@$REMOTE_HOST:$REMOTE_PROJECT_ROOT_PATH/.dist
ssh $REMOTE_USER@$REMOTE_HOST sudo systemctl stop profil-v2-frontend
ssh $REMOTE_USER@$REMOTE_HOST "cd $REMOTE_PROJECT_ROOT_PATH; ./scripts/extract.sh"
ssh $REMOTE_USER@$REMOTE_HOST sudo systemctl start profil-v2-frontend
