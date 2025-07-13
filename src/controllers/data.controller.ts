import { Request, Response } from 'express';
import { saveData } from '../services/data.service';

export async function getData(req: Request, res: Response) {
  const value = req.body?.value;
  if (value) {
    await saveData(value);
    res.status(201).json({ message: 'Valor salvo', value });
  } else {
    res.status(400).json({ message: 'Valor não fornecido' });
  }

  //  await dataService.saveData(value);
}

export async function postData(req: Request, res: Response) {
  const { value } = req.body;
  //  await dataService.saveData(value);
  res.status(201).json({ message: 'Valor salvo' });
}
