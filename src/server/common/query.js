import { merge, pick } from "lodash"
import { ServerError } from "express-server-error"

export const controllers = {
  createOne (model, body) {
    return model.create(body)
  },

  deleteOne (docToDelete) {
    return docToDelete.remove()
  },

  findByParam (model, id) {
    return model.findById(id)
  },

  findByQuery (model, query = {}) {
    return model.find(query)
  },

  getOne (docToGet) {
    return Promise.resolve(docToGet)
  },

  getAll (model) {
    return model.find({})
  },

  async textSearch (model, searchValue, searchFilter = {}, searchOptions = { limit: 10, skip: 0 }) {
    let query = { ...searchFilter }
    if (searchValue) {
      query["$text"] = { $search: searchValue }
    }
    else {
      searchOptions.sort = { updated_at: -1 }
    }
    await model.init()
    return model.find(query, null, searchOptions)
  },

  async textSearchCount (model, searchValue, searchFilter = {}) {
    let query = { ...searchFilter }
    if (searchValue) {
      query["$text"] = { $search: searchValue }
    }
    await model.init()
    return model.countDocuments(query)
  },

  updateOne (docToUpdate, update) {
    merge(docToUpdate, update)
    return docToUpdate.save()
  },

  updateOneById (model, findQuery, updateQuery) {
    return model.updateOne(findQuery, updateQuery)
  }
}

export const createOne = (model) => (req, res, next) => {
  return controllers.createOne(model, req.body)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const deleteOne = (model) => (req, res, next) => {
  return controllers.deleteOne(req.docFromId)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const findByParam = (model) => (req, res, next, id) => {
  return controllers.findByParam(model, id)
    .then(doc => {
      if (!doc) {
        next(new Error("Not Found Error"))
      }
      else {
        req.docFromId = doc
        next()
      }
    })
    .catch(error => {
      next(error)
    })
}

export const findByQuery = (model) => (req, res, next) => {
  const query = req.body.query
  return controllers.findByQuery(model, query)
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(error => {
      next(error)
    })
}

export const getOne = (model) => (req, res, next) => {
  return controllers.getOne(req.docFromId)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error))
}

export const getAll = (model) => (req, res, next) => {
  return controllers.getAll(model)
    .then(docs => res.json(docs))
    .catch(error => next(error))
}

export const textSearch = (model) => async (req, res, next) => {
  const searchValue = req.body.search
  const searchFilter = req.body.filter
  const searchOptions = req.body.options

  return controllers.textSearch(model, searchValue, searchFilter, searchOptions)
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(error => {
      next(error)
    })
}

export const textSearchCount = (model) => async (req, res, next) => {
  const searchValue = req.body.search
  const searchFilter = req.body.filter

  return controllers.textSearchCount(model, searchValue, searchFilter)
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(error => {
      next(error)
    })
}

export const updateOne = (model) => async (req, res, next) => {
  const docToUpdate = req.docFromId
  const update = req.body

  return controllers.updateOne(docToUpdate, update)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const updateOneById = (model, allowedSchema) => async (req, res, next) => {
  if (!req.params.id) throw new ServerError("Id not found.", { status: 400 })
  const dataToBeUpdated = pick(req.body, allowedSchema)
  const findQuery = { _id: req.params.id }
  const updateQuery = { $set: { ...dataToBeUpdated } }

  return controllers.updateOneById(model, findQuery, updateQuery)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const generateControllers = (model, allowedSchema = [], overrides = {}) => {
  const defaults = {
    createOne: createOne(model),
    deleteOne: deleteOne(model),
    findByParam: findByParam(model),
    findByQuery: findByQuery(model),
    getAll: getAll(model),
    getOne: getOne(model),
    textSearch: textSearch(model),
    textSearchCount: textSearchCount(model),
    updateOne: updateOne(model),
    updateOneById: updateOneById(model, allowedSchema)
  }

  return { ...defaults, ...overrides }
}
