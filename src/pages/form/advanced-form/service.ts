import request from 'umi-request';

export async function fakeSubmitForm(params: any) {
  console.log(params);
  
  return request('/api/forms', {
    method: 'POST',
    data: params,
  }).then(res => {
    console.log(res);
  });
 
}

// http://localhost:4000/api/contact
// /api/forms