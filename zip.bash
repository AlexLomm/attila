rm -r ./dist/atilla.zip
mkdir dist
zip -r ./dist/atilla.zip . -x ./node_modules/\* src/\* dist/\* .git/\* .idea/\* package.json package-lock.json README.md .gitignore
