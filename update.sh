set -e

npm install
npm run build-pretty
git add .
git commit -m "Update supertokens-plugin-captcha"
git push -u origin main
