import { Request, Response } from 'express';

export async function getData(req: Request, res: Response) {
  const { value } = req.body;
  //  await dataService.saveData(value);
  res.status(201).json({ message: 'Valor salvo' });
}

export async function postData(req: Request, res: Response) {
  const { value } = req.body;
  //  await dataService.saveData(value);
  res.status(201).json({ message: 'Valor salvo' });
}
