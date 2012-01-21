all : app.js routes/index.js

app.js : app.coffee
	coffee -c app.coffee

routes/index.js : routes/index.coffee
	coffee -c routes/index.coffee

clean :
	rm -f app.js
	rm -f routes/index.js
