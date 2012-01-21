$ = jQuery
methods = {
  init : ( opts ) ->
    return this.each( () ->
    )
}

$.fn.reorder = ( method ) ->
  if methods[method]
    return methods[method].apply this, Array.prototype.slice.call( arguments, 1 )
  else if typeof method is 'object' or not method
    return methods.init.apply this, arguments
  else
    $.error 'Method ' + method + ' is not defined.'
