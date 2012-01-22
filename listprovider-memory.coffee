listCounter = 1

ListProvider = () ->

ListProvider.prototype.dummyData = []

ListProvider.prototype.findAll = ( callback ) ->
	callback null, this.dummyData

ListProvider.prototype.findById = ( id, callback ) ->
	result = null
	for i in [0..this.dummyData.length - 1]
		if this.dummyData[i].id == id
			result = this.dummyData[i]
			break
	callback null, result

ListProvider.prototype.save = ( lists, callback ) ->
	if typeof lists.length is 'undefined'
		lists = [lists]

	for i in [0..lists.length - 1]
		list = lists[i]

		if list.id > 0
			this.dummyData[list.id] = list
		else
			list.id = listCounter++
			list.textID = this.getRandomString 5
			list.created_at = new Date()
			this.dummyData[this.dummyData.length] = list
	
	callback null, lists

ListProvider.prototype.getRandomString = ( len ) ->
	id = ''
	for i in [1..len]
		id += String.fromCharCode (Math.random() * 25) + 65
	id

# bootstrap with dummy data
new ListProvider().save [{
	name: 'list 1'
	items: [{
		name: 'item 1'
	},
	{
		name: 'item 2'
	}]
}], ( error, lists) ->

exports.ListProvider = ListProvider
