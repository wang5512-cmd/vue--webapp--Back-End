import { get, post, put, del } from '@/utils/request'

export const loadProductsAPI = (page = 1) =>
  get('/api/v1/admin/products', { page })

export const saveProductAPI = model => post('/api/v1/admin/products', model)

/**
 * 获取单条记录
 * @param {*} id
 */
export const getOneAPI = id => get('/api/v1/admin/products/' + id)

/**
 * 根据id修改
 * @param {*} id    id
 * @param {*} data  修改的数据
 */
export const updateOneAPI = (id, data) =>
  put('/api/v1/admin/products/' + id, data)

/**
 * 根据id删除记录
 * @param {*} id
 */
export const delOneAPI = id => del('/api/v1/admin/products/' + id)
