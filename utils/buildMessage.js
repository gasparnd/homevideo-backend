const buildMessage = (entity, action) => {
	if(action === 'list') {
		return `${entity}s ${action}ed`	
	}
	if(action === 'find') {
		return `${entity}s ${action}`	
	}
	if(action === 'create') {
		return `${entity} ${action}d`
	}
	if(action === 'update') {
		return `${entity} ${action}d`
	}
	if(action === 'delete') {
		return `${entity} ${action}d`
	}
}

module.exports = buildMessage