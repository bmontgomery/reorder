all : app.js helpers.js listprovider-mongodb.js listprovider-memory.js routes/index.js public/javascripts/reorder.js

app.js : app.coffee
	coffee -c app.coffee

helpers.js : helpers.coffee
	coffee -c helpers.coffee

listprovider-memory.js : listprovider-memory.coffee
	coffee -c listprovider-memory.coffee

listprovider-mongodb.js : listprovider-mongodb.coffee
	coffee -c listprovider-mongodb.coffee

routes/index.js : routes/index.coffee
	coffee -c routes/index.coffee

public/javascripts/reorder.js : assets/js/reorder.coffee
	coffee -c assets/js/reorder.coffee -o public/javascripts/

clean :
	rm -f app.js
	rm -f listprovider-mongodb.js
	rm -f listprovider-memory.js
	rm -f routes/index.js
	rm -f public/javascripts/reorder.js
