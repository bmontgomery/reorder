all : clean app.js reorder.js index.js

reorder.js : public/javascripts/reorder.coffee
	coffee -c public/javascripts/reorder.coffee

app.js : app.coffee
	coffee -c app.coffee

index.js : routes/index.coffee
	coffee -c routes/index.coffee

clean :
	rm -f app.js
	rm -f public/javascripts/reorder.js
	rm -f routes/index.js
