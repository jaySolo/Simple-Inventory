/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NbAuthJWTToken, NbPasswordAuthStrategy } from '@nebular/auth';
import { environment } from '../../environments/environment';

export const socialLinks = [
  // {
  //   url: 'https://github.com/akveo/nebular',
  //   target: '_blank',
  //   icon: 'github',
  // },
  // {
  //   url: 'https://www.facebook.com/akveo/',
  //   target: '_blank',
  //   icon: 'facebook',
  // },
  // {
  //   url: 'https://twitter.com/akveo_inc',
  //   target: '_blank',
  //   icon: 'twitter',
  // },
];

export const authOptions = {
  strategies: [
    NbPasswordAuthStrategy.setup({
      name: 'email',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
      },
      baseEndpoint: environment.API_BASE_URL,
      token: {
        class: NbAuthJWTToken,
        key: 'jwt',
      },
      login: {
        endpoint: '/auth/local',
        method: 'post',
      },
      register: {
        endpoint: null,
        // method: 'post',
      },
      logout: {
        endpoint: null,
      //   method: 'post',
      },
      requestPass: {
        endpoint: '/auth/request-password',
        method: 'post',
      },
      resetPass: {
        endpoint: '/auth/reset-password',
        method: 'post',
      },
      refreshToken: {
        endpoint: '/auth/refresh-token',
        method: 'post',
      },
    }),
  ],
  forms: {
    login: {
      // socialLinks: socialLinks,
    },
    // register: {
    //   socialLinks: socialLinks,
    // },
    validation: {
      fullName: {
        required: true,
        minLength: 6,
        maxLength: 20,
      },
    },
  },
};
