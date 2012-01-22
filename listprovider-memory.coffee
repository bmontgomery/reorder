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
		list.id = listCounter++
		list.created_at = new Date()

		this.dummyData[this.dummyData.length] = list
	
	callback null, lists

# bootstrap with dummy data
new ListProvider().save [{
	name: 'list 1'
	textID: 'YSNKM'
	items: [{
		name: 'item 1'
	},
	{
		name: 'item 2'
	}]
}], ( error, lists) ->

exports.ListProvider = ListProvider
