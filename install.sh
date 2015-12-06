# Install NPM Deps
npm install 

# Fix materialize-css
# (won't be needed in future)
MC_PATH=materialize-css/package.json
echo "Fixing $MC_PATH"
echo "" \
	"var j = require('$MC_PATH');" \
	"var p = require.resolve('$MC_PATH');" \
	"j.main = 'bin/materialize.js';" \
	"require('fs').writeFileSync(p, JSON.stringify(j), 'utf-8') ;" | node