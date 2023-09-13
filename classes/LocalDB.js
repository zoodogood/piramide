class LocalDB {
	constructor(prefix) {
		this.storageKey = `${ prefix }-localDB`
		this.data = JSON.parse(localStorage.getItem(this.storageKey) ?? "{}");
	}

	saveData() {
		const serializedData = JSON.stringify(this.data);
		localStorage.setItem(this.storageKey, serializedData);
	}

	getItem(key, options = {}) {
		const { parent, lastSegment } = this.getParentAndlastSegmentByNotatedKey(key);
		return parent[lastSegment] ?? options.default ?? null;
	}

	setItem(key, value, options = {}) {
		if (typeof value === "function") {
			value = value(this.getItem(key, options));
		}

		const { parent, lastSegment } = this.getParentAndlastSegmentByNotatedKey(key);
		parent[lastSegment] = value;

		options.forceSave && this.saveData();
		return parent[lastSegment];
	}

	hasItem(key, options = {}){
		const {parent, lastSegment} = this.getParentAndlastSegmentByNotatedKey(key);
		return lastSegment in parent;
	}

	removeItem(key, options = {}){
		const {parent, lastSegment} = this.getParentAndlastSegmentByNotatedKey(key);
		
		delete parent[lastSegment];
		options.forceSave && this.saveData();
	}

	getParentAndlastSegmentByNotatedKey(key) {
		const pathSegments = key.split(".");
		let parent = this.data;

		for (let segment of pathSegments.slice(0, -1)) {
			segment = this.handleOptionalProtocol({parent, segment});

			if (!parent[segment]) {
				return { parent: null, lastSegment: segment };
			}
			parent = parent[segment];
		}

		return { parent, lastSegment: pathSegments.at(-1) ?? null };
	}

	handleOptionalProtocol({parent, segment}){
		if (segment.endsWith("?")) {
			segment = segment.slice(0, -1);
			if (!parent[segment]) {
				parent[segment] = {};
			}
		}

		return segment;
	}
}

const localDB = new LocalDB("piramide");