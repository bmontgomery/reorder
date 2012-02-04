Db = require('mongodb').Db
Connection = require('mongodb').Connection
Server = require('mongodb').Server
BSON = require('mongodb').BSON
ObjectID = require('mongodb').ObjectID

ListProvider = ( host, port ) ->
	this.db = new Db 'app2570362', new Server( host, port, { auto_reconnect: true }, {} )
	that = this
	this.db.open () ->
		db.authenticate 'heroku', 'CherryBrown42', ( error ) ->
			console.log error if error
			that.getCollection ( error, list_collection) ->
				if not error
					list_collection.ensureIndex { textID: 1 }, {unique: true}

ListProvider.prototype.getCollection = ( callback ) ->
	this.db.collection 'lists', ( error, list_collection ) ->
		if error 
			callback error 
		else 
			callback null, list_collection

ListProvider.prototype.findAll = ( callback ) ->
	this.getCollection( ( error, list_collection ) ->
		if error 
			callback error
		else
			list_collection.find().toArray( ( error, results ) ->
				if error
					callback error
				else
					callback null, results
			)
	)

ListProvider.prototype.findById = ( id, callback ) ->
	this.getCollection ( error, list_collection ) ->
		if error
			callback error
		else
			list_collection.findOne( { id: list_collection.db.bson_serializer.ObjectID.createFromHexString(id) }, ( error, results) ->
				if error
					callback error
				else
					callback null, results
			)

ListProvider.prototype.findByTextID = ( textID, callback ) ->
	this.getCollection ( error, list_collection ) ->
		if error
			callback error
		else
			list_collection.findOne( { textID: textID }, ( error, results ) ->
				if error
					callback error
				else
					callback null, results
			)

ListProvider.prototype.save = ( lists, callback ) ->
	that = this
	this.getCollection ( error, list_collection ) ->
		if error
			callback error
		else
			if typeof lists.length == 'undefined'
				lists = [lists]

			for i in [0..lists.length - 1]
				list = lists[i]

				if list.textID and list.textID.match "^[A-Z]+$" 
					that.findByTextID list.textID, ( x, result ) ->
						result.items = list.items
						list_collection.update { _id: result._id }, result, () ->
						callback null, lists
				else
					list.textID = that.getRandomString 5
					that.getUniqueRandomString 5, () ->
						list.created_at = new Date()
						list_collection.insert list, () ->
							callback null, lists

ListProvider.prototype.getRandomString = ( len ) ->
	id = ''
	for i in [1..len]
		id += String.fromCharCode (Math.random() * 25) + 65
	id

ListProvider.prototype.getUniqueRandomString = ( len, callback ) ->
	that = this
	result = this.getRandomString len
	this.findByTextID result, ( error, results ) ->
		if not results or results.length is 0
			callback()
		else
			that.getUniqueRandomString len, callback

exports.ListProvider = ListProvider
