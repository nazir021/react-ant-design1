import { relativeTimeRounding } from 'moment';
import request from 'umi-request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}
// http://localhost:3000/api/auth/login
export async function fakeAccountLogin(params: LoginParamsType) {
  const res = await request('http://localhost:4000/api/auth/login', {
    method: 'POST',
    data: {
      username:params.userName,
      password:params.password
    },
  });

  if(res){
    return ({
      status: 'ok',
      currentAuthority: 'admin',
    })
  }
  console.log(res);
  
  return res
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
