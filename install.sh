# Install NPM Deps
npm install

echo "" \
  "var fixes = {};" \
  "fixes['font-awesome'] = 'css/font-awesome.min.css';"\
  "fixes['animate.css'] = 'animate.min.css';"\
  "Object.keys(fixes).forEach(function(dep){"\
  "  var j = require(dep + '/package.json');"\
  "  j.main = fixes[dep];"\
  "  require('fs').writeFileSync('./node_modules/'+dep+'/package.json', JSON.stringify(j), 'utf-8');"\
  "  console.log('Fixed: ' + dep );"\
  "});" | node
