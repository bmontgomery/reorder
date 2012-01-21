all : clean app.js index.js

app.js : app.coffee
	coffee -c app.coffee

index.js : routes/index.coffee
	coffee -c routes/index.coffee

clean :
	rm -f app.js
	rm -f public/javascripts/reorder.js
	rm -f routes/index.js
