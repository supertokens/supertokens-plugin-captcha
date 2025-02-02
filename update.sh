set -e

npm install
npm run build
git add .
git commit -m "Update supertokens-plugin-captcha"
git push -u origin main
