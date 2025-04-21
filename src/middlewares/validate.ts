import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const handleValidation = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      error: 'Validation Error',
      details: errors.array()
    });
    return;
  }

  next();
};
