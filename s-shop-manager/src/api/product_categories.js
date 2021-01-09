import { get, post, put, del } from '@/utils/request'

export const loadModelsAPI = (page = 1) =>
  get('/api/v1/admin/product_categories', { page })

export const saveModelAPI = model =>
  post('/api/v1/admin/product_categories', model)

/**
 * 获取单条记录
 * @param {*} id
 */
export const getOneAPI = id => get('/api/v1/admin/product_categories/' + id)

/**
 * 根据id修改
 * @param {*} id    id
 * @param {*} data  修改的数据
 */
export const updateOneAPI = (id, data) =>
  put('/api/v1/admin/product_categories/' + id, data)

/**
 * 根据id删除记录
 * @param {*} id
 */
export const delOneAPI = id => del('/api/v1/admin/product_categories/' + id)
