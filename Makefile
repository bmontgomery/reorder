all : clean app.js reorder.js

reorder.js : public/javascripts/reorder.coffee
	coffee -c public/javascripts/reorder.coffee

app.js : app.coffee
	coffee -c app.coffee

clean :
	rm app.js
	rm public/javascripts/reorder.js
