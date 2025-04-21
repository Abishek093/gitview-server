import { query, param, body } from 'express-validator';

export const sortUsersValidator = [
  query('sort')
    .optional()
    .isIn(['login', 'name', 'company', 'location', 'public_repos', 'public_gists', 'followers', 'following', 'created_at', 'updated_at'])
    .withMessage('Invalid sort field'),

  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Order must be "asc" or "desc"'),
];

export const searchUsersValidator = [
  query('login').optional().isString(),
  query('username').optional().isString(),
  query('location').optional().isString(),
  query('company').optional().isString(),
];

export const saveUserValidator = [
  param('username').isString().withMessage('Username is required'),
];

export const updateUserValidator = [
  param('username').isString().withMessage('Username param is required'),
  body().isObject().withMessage('Update data must be a valid object'),
];

export const deleteUserValidator = [
  param('username').isString().withMessage('Username param is required'),
];