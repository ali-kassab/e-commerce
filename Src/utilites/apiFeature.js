
export class ApiFeature {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery
        this.searchQuery = searchQuery
    }

    pagenation() {
        let pageNumber = Math.abs(this.searchQuery.page * 1) || 1
        this.pageNumber = pageNumber
        let pageLimit = 8
        let skip = (pageNumber - 1) * pageLimit
        this.mongooseQuery.skip(skip).limit(pageLimit)
        return this
    }
    filter() {
        let filterObject = { ...this.searchQuery }
        let excludedFildes = ['page', 'sort', 'fields', 'keyword']
        excludedFildes.forEach((e) => delete filterObject[e])
        filterObject = JSON.stringify(filterObject)
        filterObject = filterObject.replace(/(gt|gte|lt|lte|eq)/g, match => '$' + match)
        filterObject = JSON.parse(filterObject)
        this.mongooseQuery = this.mongooseQuery.find(filterObject);

        return this
    }

    sort() {
        if (this.searchQuery.sort) {
            let sortBy = this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortBy)
        }
        return this
    }
    fields() {
        if (this.searchQuery.fields) {
            let fields = this.searchQuery.fields.split(',').join(' ')
            this.mongooseQuery.select(fields)
        }
        return this
    }
    search() {
        if (this.searchQuery.keyword) {
            this.mongooseQuery.find({
                $or: [
                    { title: { $regex: this.searchQuery.keyword } }, 
                    { text: { $regex: this.searchQuery.keyword } },
                    { description: { $regex: this.searchQuery.keyword } },
                    { name: { $regex: this.searchQuery.keyword } },
                ]
            })
        }
        return this
    }
}