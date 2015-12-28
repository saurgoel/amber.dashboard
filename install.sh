# Install NPM Deps
# npm install

# Fix materialize-css
# (won't be needed in future)
# jquery fix
sed -i -e "s/require('jQuery')/require('jquery')/g" node_modules/materialize-css/js/initial.js

# package.json fix
MC_PATH=materialize-css/package.json
echo "Fixing $MC_PATH"
echo "" \
	"var j = require('$MC_PATH');" \
	"var p = require.resolve('$MC_PATH');" \
	"j.main = 'dist/js/materialize.js';" \
	"require('fs').writeFileSync(p, JSON.stringify(j), 'utf-8') ;" | node