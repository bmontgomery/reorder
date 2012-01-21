all : app.js routes/index.js public/javascripts/reorder.js

app.js : app.coffee
	coffee -c app.coffee

routes/index.js : routes/index.coffee
	coffee -c routes/index.coffee

public/javascripts/reorder.js : assets/js/reorder.coffee
	coffee -c assets/js/reorder.coffee -o public/javascripts/

clean :
	rm -f app.js
	rm -f routes/index.js
	rm -f public/javascripts/reorder.js
