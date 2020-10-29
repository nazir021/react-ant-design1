import request from 'umi-request';
import { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  console.log("Qurey Get");
  return request('/api/product_list', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/product_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/product_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/product_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
